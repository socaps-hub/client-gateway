// src/common/excel/excel.service.ts
import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { FileUpload } from 'graphql-upload-ts';

@Injectable()
export class ExcelService {
  /**
   * Lee un archivo Excel (FileUpload) y lo convierte en un arreglo JSON
   */
  async readExcelAsJson(file: FileUpload): Promise<any[]> {
    if (!file) {
      throw new Error('Archivo no recibido. Verifica el frontend.');
    }

    const { createReadStream, mimetype } = file;

    if (!mimetype.includes('spreadsheetml')) {
      throw new Error(`Formato de archivo inválido (${mimetype}). Solo se permiten archivos Excel.`);
    }

    // Leer el stream en buffer
    const stream = createReadStream();
    const chunks: Buffer[] = [];
    for await (const chunk of stream) chunks.push(chunk);
    const buffer = Buffer.concat(chunks);

    // Parsear Excel → JSON
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json<any>(sheet, { defval: '' });

    if (!json || json.length === 0) {
      throw new Error('El archivo Excel no contiene datos.');
    }

    return json;
  }
}
