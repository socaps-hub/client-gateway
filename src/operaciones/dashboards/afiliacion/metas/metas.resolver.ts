import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';

import { firstValueFrom } from 'rxjs';

import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';

import { MetasService } from './metas.service';
import { UploadMetasAfiliacionOutput } from './dto/outputs/upload-metas-afiliacion.output';
import { AwsS3Service } from '../../../../common/aws/services/aws-s3.service';
import { AuthGraphQLGuard } from '../../../../auth/guards/auth-graphql.guard';
import { GetUser } from '../../../../auth/decorators/user.decorator';
import { ValidRoles } from '../../../../auth/enums/valid-roles.enum';
import { Usuario } from '../../../../configuracion/usuarios/entities/usuario.entity';

@Resolver()
@UseGuards(AuthGraphQLGuard)
export class MetasResolver {
  constructor(
    private readonly _service: MetasService,
    private readonly _awsS3Service: AwsS3Service,
  ) {}

  @Mutation(() => UploadMetasAfiliacionOutput, {
    name: 'uploadMetasAfiliacion',
  })
  public async uploadMetasAfiliacion(
    @Args({
      name: 'file',
      type: () => GraphQLUpload,
    }) file: FileUpload,

    @Args('cooperativaId') cooperativaId: string,

    @Args('periodoAnio', {
      type: () => Int,
    }) periodoAnio: number,

    @GetUser({
      type: 'graphql',
      roles: [ValidRoles.superUser],
    }) _user: Usuario,
  ): Promise<UploadMetasAfiliacionOutput> {
    const { key } = await this._awsS3Service.uploadExcel(
      file,
      'metas/afiliacion',
    );

    return firstValueFrom(
      this._service.uploadMetasAfiliacion({
        cooperativaId,
        periodoAnio,
        s3Key: key,
      }),
    );
  }
}
