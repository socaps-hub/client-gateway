import { existsSync, mkdirSync, createWriteStream } from 'fs';
import { join } from 'path';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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
import { ControlCargaRadiografiasResponse } from './outputs/control-carga-radiografias-response.output';
import { RadioAreaEnum } from './enums/control-carga-radio-area.enum';

@Resolver()
@UseGuards(AuthGraphQLGuard)
export class RadiografiaResolver {

  constructor(
    private readonly radiografiaService: RadiografiaService,
    private readonly excelService: ExcelService,
    private readonly awsS3Service: AwsS3Service,
  ) { }

  @Query(() => ControlCargaRadiografiasResponse, { name: 'getAllControlCargasRadiografias' })
  controlCargaRadiografias() {
    return this.radiografiaService.getAllControlCargaRadiografias()
  }

  @Mutation(() => BooleanResponse, { name: 'cargarRadiografiaCreditoDesdeExcel' })
  async cargarRadiografiaDesdeExcel(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
    @Args('cooperativaCodigo') cooperativaCodigo: string,
  ) {
    try {
      // 🧠 1️⃣ Subir archivo a S3
      const { key } = await this.awsS3Service.uploadExcel(file, 'radiografias');
      this.radiografiaService.crearCargaMasivaRadiografiaCredito(key, cooperativaCodigo);

      return { success: true, message: 'Procesamiento iniciado' };
    } catch (error) {
      console.error('❌ Error al cargar radiografía desde Excel:', error);
      return { success: false, message: error.message };
    }
  }

  @Mutation(() => BooleanResponse, { name: 'cargarRadiografiaCreditoFromExcel' })
  async cargarRadiografiaFromExcel(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
    @Args('cooperativaCodigo') cooperativaCodigo: string,
    @Args({ name: 'area', type: () => RadioAreaEnum }) area: RadioAreaEnum,
  ) {
    try {
      // 🧠 1️⃣ Subir archivo a S3
      const { key } = await this.awsS3Service.uploadExcel(file, 'radiografias');
      this.radiografiaService.crearCargaMasivaRadiografia(key, cooperativaCodigo, area);

      return { success: true, message: 'Procesamiento iniciado' };
    } catch (error) {
      console.error('❌ Error al cargar radiografía desde Excel:', error);
      return { success: false, message: error.message };
    }
  }


}
