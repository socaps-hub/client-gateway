import { Args, Query, Resolver } from '@nestjs/graphql';
import { CreditoService } from './credito.service';
import { UseGuards } from '@nestjs/common';
import { AuthGraphQLGuard } from '../../../auth/guards/auth-graphql.guard';
import { CreditoColocacionTotalOutput } from './dto/outputs/credito-colocacion-total.output';
import { CreditoColocacionTotalInput } from './dto/inputs/credito-colocacion-total.input';

@Resolver()
@UseGuards(AuthGraphQLGuard)
export class CreditoResolver {
  constructor(private readonly creditoService: CreditoService) {}

  @Query(() => CreditoColocacionTotalOutput, {
    name: 'creditoColocacionTotalDashboard',
  })
  async creditoColocacionTotalDashboard(
    @Args('input') input: CreditoColocacionTotalInput,
  ) {
    return this.creditoService.getColocacionTotalDashboard(input);
  }
}
