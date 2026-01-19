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
import { ExcelService } from 'src/common/excel/services/excel.service';
import { ExcelUtils } from '../../common/excel/utils/excel.utils';

@Resolver()
@UseGuards(AuthGraphQLGuard)
export class AuditoriaSisconcreResolver {

  constructor(
    private readonly auditoriaSisconcreService: AuditoriaSisconcreService,
    private readonly excelService: ExcelService,
  ) {}

  @Mutation(() => [AuditoriaResponse], { name: 'sisconcreValidarPrestamosFromExcel' })
  async validarPrestamosFromExcel(
    @Args({ name: 'data', type: () => [AuditoriaInput] }) data: AuditoriaInput[],
    @GetUser({type: 'graphql'}) user: Usuario,
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
    @GetUser({type: 'graphql'}) user: Usuario,
  ) {
    const { createReadStream, filename, mimetype } = file;
    const fechaInicio = new Date(input.fechaInicio)
    const fechaFin = new Date(input.fechaFinal)
    
    // Generación  del json desde el archivo excel
    const json = await this.excelService.readExcelAsJson(file);

    // 3️⃣ Convertir a objetos AuditoriaInput
    const allRows: AuditoriaInput[] = json.map((row: any) => ({
      numeroCredito: row['Numero de Credito']?.toString() ?? '',
      tipo: row['Tipo'] ?? '',
      categoria: row['Categoria'] ?? '',
      fechaEntrega: ExcelUtils.parseExcelDate(row['F/Entrega']) || '',
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

}
