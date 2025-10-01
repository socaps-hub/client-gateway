import { Args, Query, Resolver } from '@nestjs/graphql';
import { ReportesService } from './reportes.service';
import { UseGuards } from '@nestjs/common';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { FiltroFechasInput } from 'src/common/dto/filtro-fechas.input';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { ReporteFase1Response } from './dto/fase1/reporte-segmentado-response.output';

@Resolver()
@UseGuards(AuthGraphQLGuard)
export class ReportesResolver {

  constructor(private readonly reportesService: ReportesService) { }

  @Query(() => ReporteFase1Response, { name: 'sisconcapReporteSegmentadoFase1' })
  async reporteSegmentadoFase1(
    @Args('input') input: FiltroFechasInput,
    @GetUser('graphql') user: Usuario
  ) {
    return this.reportesService.getReporteSegmentadoF1(input, user);
  }
}
