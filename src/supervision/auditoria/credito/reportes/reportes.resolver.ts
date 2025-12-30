import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ReportesService } from './reportes.service';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { ReporteFase1ResponseDTO } from './dto/output/fase1/acredito-reporte-fase1-response.output';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { ReporteHallazgosF1Response } from './dto/output/fase1/acredito-reporte-detalle-hallazgos-reponse.output';
import { ReporteHallazgosF1PorCategoriaResponse } from './dto/output/fase1/acredito-detalle-hallazgos-categoria-response.output';
import { BuildCedulaExcelResponse } from './dto/output/build-cedula-excel-response.output';
import { ReporteSeguimientoAnomaliasResponseDTO } from './dto/output/fase2/reporte-seguimiento-anomalias-response.output';

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

  @Query(() => ReporteHallazgosF1Response, { name: 'aCreditoDetalleHallazgosFase1ByMuestra' })
  async detalleHallazgosFase1ByMuestra(
    @Args({ name: 'muestraId', type: () => Int }, ParseIntPipe) muestraId: number,
    @GetUser('graphql') user: Usuario
  ) {
    return this.reportesService.getDetalleHallazgosFase1ByMuestra(muestraId, user);
  }

  @Query(() => ReporteHallazgosF1PorCategoriaResponse, { name: 'aCreditoDetalleHallazgosFase1ByMuestraPorCategoria' })
  async detalleHallazgosFase1ByMuestraPorCategoria(
    @Args({ name: 'muestraId', type: () => Int }, ParseIntPipe) muestraId: number,
    @GetUser('graphql') user: Usuario
  ) {
    return this.reportesService.getDetalleHallazgosFase1ByMuestraPorCategoria(muestraId, user);
  }

  @Mutation(() => BuildCedulaExcelResponse, { name: 'aCreditoBuildCedulaExcelF1' })
  async buildCedulaF1(
    @Args('muestraId', { type: () => Int }) muestraId: number,
    @GetUser('graphql') user: Usuario
  ) {
    return this.reportesService.buildCedulaF1(muestraId, user);
  }

  // * FASE 2
  @Query(() => ReporteSeguimientoAnomaliasResponseDTO, { name: 'aCreditoReporteSeguimientoAnomaliasByMuestra' })
  async reporteSeguimientoAnomaliasByMuestra(
    @Args({ name: 'muestraId', type: () => Int }, ParseIntPipe) muestraId: number,
    @GetUser('graphql') user: Usuario
  ) {
    return this.reportesService.getReporteSeguimientoAnomaliasByMuestra(muestraId, user);
  }

  @Mutation(() => BuildCedulaExcelResponse, { name: 'aCreditoBuildCedulaExcelF2' })
  async buildCedulaF2(
    @Args('muestraId', { type: () => Int }) muestraId: number,
    @GetUser('graphql') user: Usuario
  ) {
    return this.reportesService.buildCedulaF2(muestraId, user);
  }

}
