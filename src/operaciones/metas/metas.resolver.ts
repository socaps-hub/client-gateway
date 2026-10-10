import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { MetasService } from './metas.service';
import { GetControlesMetasInput } from './dto/inputs/get-controles-metas.input';
import { ControlMetaOutput } from './dto/outputs/control-meta.output';
import { AuthGraphQLGuard } from '../../auth/guards/auth-graphql.guard';
import { GetUser } from '../../auth/decorators/user.decorator';
import { ValidRoles } from '../../auth/enums/valid-roles.enum';
import { Usuario } from '../../configuracion/usuarios/entities/usuario.entity';
import { DetalleMetaOutput } from './dto/outputs/detalle-meta.output';
import { AwsS3Service } from '../../common/aws/services/aws-s3.service';
import { DetalleMetaCaptacionOutput } from './dto/outputs/detalle-meta-captacion.output';
import { DetalleMetaAfiliacionOutput } from './dto/outputs/detalle-meta-afiliacion.output';
import { firstValueFrom } from 'rxjs';

@Resolver()
@UseGuards(AuthGraphQLGuard)
export class MetasResolver {
  constructor(
    private readonly _service: MetasService,
    private readonly _awsS3Service: AwsS3Service,
  ) {}

  @Query(() => [ControlMetaOutput], {
    name: 'controlesMetas',
  })
  public getControlesMetas(
    @Args('input', {
      type: () => GetControlesMetasInput,
      nullable: true,
    })
    input: GetControlesMetasInput = {},

    @GetUser({
      type: 'graphql',
      roles: [ValidRoles.superUser],
    })
    user: Usuario,
  ) {
    return this._service.getControlesMetas(input);
  }

  @Query(() => DetalleMetaOutput, {
    name: 'detalleMeta',
  })
  public getDetalleMeta(
    @Args('controlId', { type: () => Int })
    controlId: number,
  ) {
    return this._service.getDetalleMeta(controlId);
  }

  @Query(() => String, {
    name: 'metaArchivoDownloadUrl',
  })
  public getMetaArchivoDownloadUrl(
    @Args('key', { type: () => String })
    key: string,

    @GetUser({
      type: 'graphql',
      roles: [ValidRoles.superUser],
    })
    user: Usuario,
  ): Promise<string> {
    return this._awsS3Service.getSignedDownloadUrl(key);
  }

  @Query(() => DetalleMetaCaptacionOutput, {
    name: 'detalleMetaCaptacion',
  })
  @UseGuards(AuthGraphQLGuard)
  public getDetalleMetaCaptacion(
    @Args('controlId', {
      type: () => Int,
    })
    controlId: number,
  ) {
    return this._service.getDetalleMetaCaptacion(controlId);
  }

  @Query(() => DetalleMetaAfiliacionOutput, {
    name: 'detalleMetaAfiliacion',
  })
  public async getDetalleMetaAfiliacion(
    @Args('controlId', { type: () => Int })
    controlId: number,
  ): Promise<DetalleMetaAfiliacionOutput> {
    return firstValueFrom(
      this._service.getDetalleMetaAfiliacion(controlId),
    );
  }
}
