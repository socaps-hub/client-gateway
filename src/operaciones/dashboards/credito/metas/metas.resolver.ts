import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { MetasService } from './metas.service';
import { AuthGraphQLGuard } from '../../../../auth/guards/auth-graphql.guard';
import { UploadMetasColocacionOutput } from './dto/outputs/upload-metas-colocacion.output';
import { UploadMetasColocacionInput } from './dto/inputs/upload-metas-colocacion.input';
import { AwsS3Service } from '../../../../common/aws/services/aws-s3.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { OpMetaAreaEnum } from '../../../enums/op-meta-area.enum';
import { GetUser } from '../../../../auth/decorators/user.decorator';
import { ValidRoles } from '../../../../auth/enums/valid-roles.enum';
import { Usuario } from '../../../../configuracion/usuarios/entities/usuario.entity';
import { firstValueFrom } from 'rxjs';

@Resolver()
@UseGuards(AuthGraphQLGuard)
export class MetasResolver {
  constructor(
    private readonly _service: MetasService,
    private readonly _awsS3Service: AwsS3Service,
  ) {}

  @Mutation(() => UploadMetasColocacionOutput, {
    name: 'uploadMetasColocacion',
  })
  public async uploadMetasColocacion(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload,

    @Args('cooperativaId')
    cooperativaId: string,

    @Args('periodoAnio', { type: () => Int })
    periodoAnio: number,

    @Args('area', { type: () => OpMetaAreaEnum })
    area: OpMetaAreaEnum,

    @GetUser({
      type: 'graphql',
      roles: [ValidRoles.superUser],
    })
    user: Usuario,
  ): Promise<UploadMetasColocacionOutput> {
    const { key } = await this._awsS3Service.uploadExcel(
      file,
      'metas/colocacion',
    );

    return firstValueFrom(
      this._service.uploadMetasColocacion({
        cooperativaId,
        periodoAnio,
        area,
        s3Key: key,
      }),
    );
  }
}