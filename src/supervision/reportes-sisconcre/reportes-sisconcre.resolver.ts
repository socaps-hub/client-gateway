import { Args, Query, Resolver } from '@nestjs/graphql';
import { ReportesSisconcreService } from './reportes-sisconcre.service';
import { FiltroFechasInput } from 'src/common/dto/filtro-fechas.input';
import { ReporteSegmentadoFase1Response } from './dto/fase1/reporte-segmentado-f1.output';
import { UseGuards } from '@nestjs/common';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { DetalleAnomaliasF1Response } from './dto/fase1/detalle-anomalias-f1.output';
import { AnomaliasResumenResponseF1 } from './dto/fase1/detalle-anomalias-integral-f1.output';

@Resolver()
@UseGuards( AuthGraphQLGuard )
export class ReportesSisconcreResolver {

  constructor(private readonly reportesSisconcreService: ReportesSisconcreService) {}

  @Query(() => ReporteSegmentadoFase1Response)
  async reporteSegmentadoFase1(
    @Args('input') input: FiltroFechasInput,
  ) {
    return this.reportesSisconcreService.getReporteSegmentadoF1(input);
  }

  @Query(() => DetalleAnomaliasF1Response)
  async detalleAnomaliasF1(
    @Args('input') input: FiltroFechasInput,
  ) {
    return this.reportesSisconcreService.getDetalleAnomaliasF1(input);
  }

  @Query(() => AnomaliasResumenResponseF1)
  async detalleAnomaliasIntegralF1(
    @Args('input') input: FiltroFechasInput,
  ) {
    return this.reportesSisconcreService.getDetalleAnomaliasInteralF1(input);
  }

}
