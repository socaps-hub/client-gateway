import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CreditoService } from './credito.service';
import { AuthGraphQLGuard } from '../../../auth/guards/auth-graphql.guard';
import { CreditoColocacionTotalOutput } from './dto/outputs/credito-colocacion-total.output';
import { CreditoColocacionTotalInput } from './dto/inputs/credito-colocacion-total.input';
import { CreditoMedicionAnualOutput } from './dto/outputs/credito-medicion-anual.output';
import { CreditoMedicionAnualInput } from './dto/inputs/credito-medicion-anual.input';

@Resolver()
@UseGuards(AuthGraphQLGuard)
export class CreditoResolver {
  constructor(private readonly _creditoService: CreditoService) {}

  @Query(() => CreditoColocacionTotalOutput, {
    name: 'creditoColocacionTotalDashboard',
  })
  async creditoColocacionTotalDashboard(
    @Args('input') input: CreditoColocacionTotalInput,
  ) {
    return this._creditoService.getColocacionTotalDashboard(input);
  }

  @Query(() => CreditoMedicionAnualOutput, {
    name: 'creditoMedicionAnual',
  })
  public getMedicionAnual(
    @Args('input')
    input: CreditoMedicionAnualInput,
  ) {
    return this._creditoService.getMedicionAnual(input);
  }
}
