import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';

import { MigracionService } from './migracion.service';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { AwsS3Service } from 'src/common/aws/services/aws-s3.service';
import { BooleanResponse } from 'src/common/dto/boolean-response.object';
import { M01ControlMigracion } from './dto/entities/control-migracion.entity';
import { MigracionRequestInput } from './dto/input/migracion-request.input';

@Resolver()
@UseGuards(AuthGraphQLGuard)
export class MigracionResolver {

  constructor(
    private readonly migracionService: MigracionService,
    private readonly awsS3Service: AwsS3Service,
  ) { }

  @Query(() => [M01ControlMigracion], { name: 'MgetAllControlMigrations' })
  public async getAllControlMigrations() {
    return this.migracionService.getAllControlMigrations()
  }

  @Query(() => M01ControlMigracion, { name: 'MgetControlMigrationById' })
  public async getControlMigrationById(
    @Args({ name: 'id', type: () => ID }, ParseIntPipe) id: number
  ) {
    return this.migracionService.getControlMigrationById( id )
  }

  // @Mutation(() => BooleanResponse, { name: 'MmigrateSisConCreF1' })
  // async migrateSisConCreF1(
  //   @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  //   @Args('cooperativaCodigo') cooperativaCodigo: string,
  // ) {
  //   try {
  //     // 🧠 1️⃣ Subir archivo a S3
  //     const { key } = await this.awsS3Service.uploadExcel(file, 'migraciones');
  //     this.migracionService.migrateSisConCreF1(key, cooperativaCodigo);

  //     return { success: true, message: 'Procesamiento iniciado' };
  //   } catch (error) {
  //     console.error('❌ Error al migrar Fase 1 de SisConCre:', error);
  //     return { success: false, message: error.message };
  //   }
  // }

  @Mutation(() => BooleanResponse, { name: 'MmigrarSistema' })
  async migrarSistema(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
    @Args('cooperativaId', { type: () => String }) cooperativaId: string,
    @Args('sistema', { type: () => String }) sistema: string,
    @Args('fase', { type: () => String }) fase: string,
  ) {
    try {
      // 🧠 1️⃣ Subir archivo a S3
      const { key } = await this.awsS3Service.uploadExcel(file, 'migraciones');
      this.migracionService.ejecutarMigracion({ cooperativaId, fase, sistema, key });

      return { success: true, message: 'Migración iniciada correctamente' };
    } catch (error) {
      console.error('❌ Error al migrar Fase 1 de SisConCre:', error);
      return { success: false, message: error.message };
    }    
  }



}
