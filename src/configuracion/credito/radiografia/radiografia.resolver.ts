import { existsSync, mkdirSync, createWriteStream } from 'fs';
import { join } from 'path';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import { RadiografiaService } from './radiografia.service';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { BooleanResponse } from 'src/common/dto/boolean-response.object';
import { CreateRadiografiaCargaArgs } from './dto/args/create-radiografia-carga.arg';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { ExcelService } from 'src/common/excel/services/excel.service';
import { CreateRA01CreditoInput } from './dto/inputs/create-radiografia-credito.input';
import { ExcelUtils } from 'src/common/excel/utils/excel.utils';
import { AwsS3Service } from 'src/common/aws/services/aws-s3.service';

@Resolver()
@UseGuards(AuthGraphQLGuard)
export class RadiografiaResolver {

  constructor(
    private readonly radiografiaService: RadiografiaService,
    private readonly excelService: ExcelService,
    private readonly awsS3Service: AwsS3Service,
  ) { }

  /**
   * ✅ Carga de archivo Excel
   * Guarda el archivo temporalmente y envía metadata al config-ms por NATS
   */
  // @Mutation(() => BooleanResponse, { name: 'cargarRadiografiaCreditoDesdeExcel' })
  // async cargarRadiografiaDesdeExcel(
  //   @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  //   @Args('cooperativaCodigo') cooperativaCodigo: string,
  // ): Promise<BooleanResponse> {
  //   try {
  //     // 1️⃣ Resolver datos del archivo recibido
  //     const { createReadStream, filename } = await file;

  //     // 2️⃣ Definir ruta temporal
  //     const uploadDir = join(process.cwd(), 'uploads', 'radiografias');
  //     if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true });

  //     const filePath = join(uploadDir, filename);

  //     // 3️⃣ Guardar el archivo temporalmente
  //     await new Promise<void>((resolve, reject) => {
  //       const stream = createReadStream();
  //       const out = createWriteStream(filePath);
  //       stream.pipe(out);
  //       out.on('finish', resolve);
  //       out.on('error', reject);
  //     });

  //     console.log(`📁 Archivo guardado temporalmente en: ${filePath}`);

  //     // 4️⃣ Enviar solo metadata al microservicio (no el archivo)
  //     await lastValueFrom(
  //       this.radiografiaService.crearCargaMasivaRadiografiaCredito({
  //         cooperativaCodigo,
  //         archivo: filename,
  //         path: filePath, // 👈 aquí se envía la ruta al config-ms
  //       }),
  //     );

  //     return {
  //       success: true,
  //       message: `Archivo ${filename} enviado correctamente al microservicio.`,
  //     };
  //   } catch (error) {
  //     console.error('❌ Error al cargar radiografía desde Excel:', error);
  //     return {
  //       success: false,
  //       message: `Error al cargar el archivo: ${error.message}`,
  //     };
  //   }
  // }

  @Mutation(() => BooleanResponse, { name: 'cargarRadiografiaCreditoDesdeExcel' })
  async cargarRadiografiaDesdeExcel(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
    @Args('cooperativaCodigo') cooperativaCodigo: string,
  ) {
    try {
      // 🧠 1️⃣ Subir archivo a S3
      const { key } = await this.awsS3Service.uploadExcel(file, 'radiografias');

      console.log({cooperativaCodigo});
      
      // 🧠 2️⃣ Mandar al microservicio (solo la URL)
      // await lastValueFrom(
      //   this.radiografiaService.crearCargaMasivaRadiografiaCredito(key, cooperativaCodigo)
      // );

      this.radiografiaService.crearCargaMasivaRadiografiaCredito(key, cooperativaCodigo);

      return { success: true, message: 'Procesamiento iniciado' };
    } catch (error) {
      console.error('❌ Error al cargar radiografía desde Excel:', error);
      return { success: false, message: error.message };
    }
  }


}
