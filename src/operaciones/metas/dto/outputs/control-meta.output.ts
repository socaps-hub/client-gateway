import { Field, Int, ObjectType } from '@nestjs/graphql';
import { OpMetaAreaEnum } from '../../../enums/op-meta-area.enum';

@ObjectType()
export class ControlMetaOutput {
  @Field(() => Int)
  controlId: number;

  @Field(() => String)
  cooperativaId: string;

  @Field()
  cooperativaNombre: string;

  @Field(() => OpMetaAreaEnum)
  area: OpMetaAreaEnum;

  @Field(() => Int)
  periodoAnio: number;

  @Field(() => String, { nullable: true })
  archivo: string | null;

  @Field(() => String)
  fechaCarga: string;

  @Field(() => Int)
  sucursales: number;

  @Field(() => Int)
  metasRegistradas: number;
}
