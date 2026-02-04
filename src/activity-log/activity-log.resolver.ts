import { Args, Query, Resolver } from '@nestjs/graphql';
import { ActivityLogService } from './activity-log.service';
import { UseGuards } from '@nestjs/common';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { ActivityLogResponse } from './dto/outputs/activity-log-response.output';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { ActivityLogFilterInput } from './dto/inputs/activity-log-filter.input';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { ActivityLogDetailDto } from './dto/outputs/activity-log-detail-output';

@Resolver()
@UseGuards(AuthGraphQLGuard)
export class ActivityLogResolver {

  constructor(private readonly activityLogService: ActivityLogService) {}

  @Query(() => ActivityLogResponse, { name: 'ALGetActivityLogs' })
  getActivityLogsFiltrado(
    @Args('input') input: ActivityLogFilterInput,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this.activityLogService.getActivityLogsFiltrado(input);
  }

  @Query(() => ActivityLogDetailDto, { name: 'ALGetActivityLogById' })
  getActivityLogById(
    @Args('id') id: string,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this.activityLogService.getActivityLogById(id);
  }

}
