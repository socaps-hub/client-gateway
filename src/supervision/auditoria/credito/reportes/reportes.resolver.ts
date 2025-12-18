import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { ReportesService } from './reportes.service';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { ReporteFase1ResponseDTO } from './dto/output/fase1/acredito-reporte-fase1-response.output';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { GetUser } from 'src/auth/decorators/user.decorator';

@Resolver()
@UseGuards(AuthGraphQLGuard)
export class ReportesResolver {

  constructor(private readonly reportesService: ReportesService) {}

  // * FASE 1
  @Query(() => ReporteFase1ResponseDTO, { name: 'aCreditoReporteF1ByMuestra' })
  async reporteF1ByMuestra(
    @Args({ name: 'muestraId', type: () => Int }, ParseIntPipe) muestraId: number,
    @GetUser('graphql') user: Usuario
  ) {
    return this.reportesService.getReporteFase1ByMuestra(muestraId, user);
  }

  @Query(() => ReporteFase1ResponseDTO, { name: 'aCreditoReporteF1ByClasificacion' })
  async reporteF1ByClasificacion(
    @Args({ name: 'muestraId', type: () => Int }, ParseIntPipe) muestraId: number,
    @GetUser('graphql') user: Usuario
  ) {
    return this.reportesService.getReporteFase1ByClasificacion(muestraId, user);
  }

}
