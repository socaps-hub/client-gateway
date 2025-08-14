import { Args, Query, Resolver } from '@nestjs/graphql';
import { ReportesSisconcreService } from './reportes-sisconcre.service';
import { FiltroFechasInput } from 'src/common/dto/filtro-fechas.input';
import { ReporteSegmentadoFase1Response } from './dto/fase1/reporte-segmentado-f1.output';
import { UseGuards } from '@nestjs/common';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { DetalleAnomaliasF1Response } from './dto/fase1/detalle-anomalias-f1.output';
import { AnomaliasResumenResponseF1 } from './dto/fase1/detalle-anomalias-integral-f1.output';
import { DetalleAnomaliasEjecutivoF1Response } from './dto/fase1/detalle-anomalias-f1-ejecutivo.output';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { DetalleAnomaliasIntegralEjecutivosResponseF1 } from './dto/fase1/detalle-anomalias-integral-f1-ejecutivos.output';
import { ReporteFase2Response } from './dto/fase2/resultados-seguimiento.dto';
import { ReporteFase3Response } from './dto/fase3/revision-desembolsos.dto';
import { DetalleAnomaliasF3Response } from './dto/fase3/anomalias-desembolso.dto';

@Resolver()
@UseGuards( AuthGraphQLGuard )
export class ReportesSisconcreResolver {

  constructor(private readonly reportesSisconcreService: ReportesSisconcreService) {}

  @Query(() => ReporteSegmentadoFase1Response)
  async reporteSegmentadoFase1(
    @Args('input') input: FiltroFechasInput,
    @GetUser('graphql') user: Usuario
  ) {
    return this.reportesSisconcreService.getReporteSegmentadoF1(input, user);
  }

  @Query(() => DetalleAnomaliasF1Response)
  async detalleAnomaliasF1(
    @Args('input') input: FiltroFechasInput,
    @GetUser('graphql') user: Usuario
  ) {
    return this.reportesSisconcreService.getDetalleAnomaliasF1(input, user);
  }

  @Query(() => AnomaliasResumenResponseF1)
  async detalleAnomaliasIntegralF1(
    @Args('input') input: FiltroFechasInput,
    @GetUser('graphql') user: Usuario
  ) {
    return this.reportesSisconcreService.getDetalleAnomaliasInteralF1(input, user);
  }
  
  @Query(() => DetalleAnomaliasEjecutivoF1Response)
  async detalleAnomaliasPorEjecutivoF1(
    @Args('input') input: FiltroFechasInput,
    @GetUser('graphql') user: Usuario
  ) {
    return this.reportesSisconcreService.getDetalleAnomaliasPorEjecutivoF1(input, user);
  }

  @Query(() => DetalleAnomaliasIntegralEjecutivosResponseF1)
  async detalleAnomaliasIntegralPorEjecutivoF1(
    @Args('input') input: FiltroFechasInput,
    @GetUser('graphql') user: Usuario
  ) {
    return this.reportesSisconcreService.getDetalleAnomaliasIntegralPorEjecutivoF1(input, user);
  }

  // * REPORTES FASE 2
  @Query(() => ReporteFase2Response)
  async resultadoSeguimientoF2(
    @Args('input') input: FiltroFechasInput,
    @GetUser('graphql') user: Usuario
  ) {
    return this.reportesSisconcreService.getResultadosSeguimientoF2(input, user);
  }

  // * REPORTES FASE 3
  @Query(() => ReporteFase3Response)
  async revisionDesembolsosF3(
    @Args('input') input: FiltroFechasInput,
    @GetUser('graphql') user: Usuario
  ) {
    return this.reportesSisconcreService.getRevisionDesembolsosF3(input, user);
  }

  @Query(() => DetalleAnomaliasF3Response)
  async detalleAnomaliasF3(
    @Args('input') input: FiltroFechasInput,
    @GetUser('graphql') user: Usuario
  ) {
    return this.reportesSisconcreService.getDetalleAnomaliasF3(input, user);
  }

}
