import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import * as XLSX from 'xlsx';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';

import { AuditoriaSisconcreService } from './auditoria-sisconcre.service';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { AuditoriaInput } from './dto/inputs/auditoria.input';
import { AuditoriaResponse } from './dto/outputs/auditoria-response.output';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { FiltroFechasInput } from 'src/common/dto/filtro-fechas.input';

@Resolver()
@UseGuards(AuthGraphQLGuard)
export class AuditoriaSisconcreResolver {

  constructor(private readonly auditoriaSisconcreService: AuditoriaSisconcreService) {}

  @Mutation(() => [AuditoriaResponse], { name: 'sisconcreValidarPrestamosFromExcel' })
  async validarPrestamosFromExcel(
    @Args({ name: 'data', type: () => [AuditoriaInput] }) data: AuditoriaInput[],
    @GetUser('graphql') user: Usuario,
  ) {
    return this.auditoriaSisconcreService.validarPrestamosNoExistentes(data, user);
  }

  /**
   * ✅ Nuevo endpoint: Carga de archivo Excel
   * Recibe archivo XLSX, lo convierte a JSON y lo valida
   */
  @Mutation(() => [AuditoriaResponse], { name: 'sisconcreValidarPrestamosFromFile' })
  async validarPrestamosFromFile(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
    @Args('input') input: FiltroFechasInput,
    @GetUser('graphql') user: Usuario,
  ) {
    const { createReadStream, filename, mimetype } = file;
    const fechaInicio = new Date(input.fechaInicio)
    const fechaFin = new Date(input.fechaFinal)
    
    if (!file) {
      throw new Error('Archivo no recibido. Verifica el frontend y el link de upload.');
    }

    if (!mimetype.includes('spreadsheetml')) {
      throw new Error(`Formato de archivo inválido (${mimetype}). Solo se permiten archivos Excel.`);
    }

    // 1️⃣ Leer el archivo completo como buffer
    const stream = createReadStream();
    const chunks: Buffer[] = [];
    for await (const chunk of stream) chunks.push(chunk);
    const buffer = Buffer.concat(chunks);

    // 2️⃣ Parsear Excel a JSON genérico
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json<any>(sheet, { defval: '' });

    if (!json || json.length === 0) {
      throw new Error('El archivo Excel no contiene datos.');
    }

    // 3️⃣ Convertir a objetos AuditoriaInput
    const allRows: AuditoriaInput[] = json.map((row: any) => ({
      numeroCredito: row['Numero de Credito']?.toString() ?? '',
      tipo: row['Tipo'] ?? '',
      categoria: row['Categoria'] ?? '',
      fechaEntrega: this.parseExcelDate(row['F/Entrega']) || '',
      cantidadEntregada: row['C.Entregada']?.toString() ?? '0',
      usrAutorizacion: row['Usr Autorizacion'] ?? '',
      usrSolicitud: row['Usr. Solicitud'] ?? '',
      sucursal: row['Sucursal']?.toString() ?? '',
      numeroCag: row['Numero CAG']?.toString() ?? '',
      nombre: row['Nombre'] ?? '',
    }));

    // 4️⃣ Filtrar por rango de fechas
    const filteredRows = allRows.filter(row => {
      if (!row.fechaEntrega) return false;
      const fecha = new Date(row.fechaEntrega);
      return fecha >= fechaInicio && fecha <= fechaFin;
    });

    if (filteredRows.length === 0) {
      throw new Error('No se encontraron registros dentro del rango de fechas seleccionado.');
    }

    console.log(filteredRows.length);
    

    // 5️⃣ Reusar lógica existente
    return this.auditoriaSisconcreService.validarPrestamosNoExistentes(filteredRows, user);
  }

  /**
   * 🧩 Convierte fechas del Excel (pueden venir como número serial, texto, o Date)
   */
  private parseExcelDate(value: any): string | null {
    if (!value) return null;

    // Excel puede entregar número serial (por ejemplo 45567)
    if (typeof value === 'number') {
      const baseDate = new Date(Date.UTC(1899, 11, 30)); // base Excel
      const fecha = new Date(baseDate.getTime() + value * 86400000);
      return fecha.toISOString();
    }

    // Si viene como texto (ej. "31/07/2025" o "2025-07-31")
    if (typeof value === 'string') {
      const parts = value.includes('/') ? value.split('/') : value.split('-');
      if (parts.length === 3) {
        // Detectar formato dd/mm/yyyy o yyyy-mm-dd
        if (parts[0].length === 2) {
          const [d, m, y] = parts;
          return new Date(+y, +m - 1, +d).toISOString();
        } else {
          const [y, m, d] = parts;
          return new Date(+y, +m - 1, +d).toISOString();
        }
      }
    }

    // Si ya es Date o ISO
    const fecha = new Date(value);
    return isNaN(fecha.getTime()) ? null : fecha.toISOString();
  }

}
