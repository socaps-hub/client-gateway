import { Args, Query, Resolver } from '@nestjs/graphql';
import { ReportesService } from './reportes.service';
import { UseGuards } from '@nestjs/common';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { FiltroFechasInput } from 'src/common/dto/filtro-fechas.input';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { ReporteFase1Response } from './dto/fase1/reporte-segmentado-response.output';
import { ResumenAnomaliasSucAndEjecutivosCategoriaResponse, ResumenAnomaliasSucAndEjecutivosEjecutivoResponse, ResumenAnomaliasSucAndEjecutivosResponseDto } from './dto/fase1/resumen-anomalias-suc-with-ejecutivos-response.output';
import { ResumenAnomaliasArgs } from './dto/fase1/arg/resumen-anomalias.args';
import { ResultadosSeguimientoResponse } from './dto/fase2/resultados-seguimiento-response.output';

@Resolver()
@UseGuards(AuthGraphQLGuard)
export class ReportesResolver {

  constructor(private readonly reportesService: ReportesService) { }

  // * FASE 1
  @Query(() => ReporteFase1Response, { name: 'sisconcapReporteSegmentadoFase1' })
  async reporteSegmentadoFase1(
    @Args('input') input: FiltroFechasInput,
    @GetUser('graphql') user: Usuario
  ) {
    return this.reportesService.getReporteSegmentadoF1(input, user);
  }

  @Query(() => ResumenAnomaliasSucAndEjecutivosResponseDto, { name: 'sisconcapResumenAnomaliasSucAndEjecutivosFase1' })
  async resumenAnomaliasSucAndEjecutivos(
    @Args('input') input: FiltroFechasInput,
    @GetUser('graphql') user: Usuario
  ) {
    return this.reportesService.getResumenAnomaliasSucAndEjecutivos(input, user);
  }

  @Query(() => [ResumenAnomaliasSucAndEjecutivosEjecutivoResponse], { name: 'sisconcapResumenAnomaliasEjecutivosBySucFase1' })
  async resumenAnomaliasEjecutivosPorSucursal(
    @Args() resumenAnomaliasArgs: ResumenAnomaliasArgs,
    @GetUser('graphql') user: Usuario
  ) {
    return this.reportesService.getResumenAnomaliasEjecutivosPorSucursal(resumenAnomaliasArgs, user);
  }

  @Query(() => ResumenAnomaliasSucAndEjecutivosCategoriaResponse, { name: 'sisconcapResumenAnomaliasEjecutivosGlobalFase1' })
  async resumenAnomaliasEjecutivosGlobal(
    @Args('input') input: FiltroFechasInput,
    @GetUser('graphql') user: Usuario
  ) {
    return this.reportesService.getResumenAnomaliasEjecutivosGlobal(input, user);
  }

  // * FASE 2

  @Query(() => ResultadosSeguimientoResponse, { name: 'sisconcapResultadosSeguimientoFase2' })
  async resultadosSeguimiento(
    @Args('input') input: FiltroFechasInput,
    @GetUser('graphql') user: Usuario
  ) {
    return this.reportesService.getResultadosSeguimiento(input, user);
  }

}
