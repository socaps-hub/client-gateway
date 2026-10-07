import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { firstValueFrom } from 'rxjs';

import { AuthGraphQLGuard } from '../../../../auth/guards/auth-graphql.guard';
import { GetUser } from '../../../../auth/decorators/user.decorator';
import { ValidRoles } from '../../../../auth/enums/valid-roles.enum';
import { Usuario } from '../../../../configuracion/usuarios/entities/usuario.entity';
import { AwsS3Service } from '../../../../common/aws/services/aws-s3.service';

import { OpMetaAreaEnum } from '../../../enums/op-meta-area.enum';

import { MetasService } from './metas.service';
import { UploadMetasCaptacionOutput } from './dto/outputs/upload-metas-captacion.output';

@Resolver()
@UseGuards(AuthGraphQLGuard)
export class MetasResolver {
  constructor(
    private readonly _service: MetasService,
    private readonly _awsS3Service: AwsS3Service,
  ) {}

  @Mutation(() => UploadMetasCaptacionOutput, {
    name: 'uploadMetasCaptacion',
  })
  public async uploadMetasCaptacion(
    @Args({
      name: 'file',
      type: () => GraphQLUpload,
    }) file: FileUpload,

    @Args('cooperativaId') cooperativaId: string,

    @Args('periodoAnio', {
      type: () => Int,
    }) periodoAnio: number,

    @Args('area', {
      type: () => OpMetaAreaEnum,
    }) area: OpMetaAreaEnum,

    @GetUser({
      type: 'graphql',
      roles: [ValidRoles.superUser],
    }) user: Usuario,
  ): Promise<UploadMetasCaptacionOutput> {
    const { key } = await this._awsS3Service.uploadExcel(
      file,
      'metas/captacion',
    );

    return firstValueFrom(
      this._service.uploadMetasCaptacion({
        cooperativaId,
        periodoAnio,
        area,
        s3Key: key,
      }),
    );
  }
}
