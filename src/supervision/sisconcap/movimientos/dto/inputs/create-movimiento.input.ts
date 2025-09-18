import { IsString, IsUUID } from 'class-validator';
import { InputType, Field, ID } from '@nestjs/graphql';

import { FiguraEnum } from '../../enums/figura.enum';
import { MovimientoEnum } from '../../enums/movimiento.enum';

@InputType()
export class CreateMovimientoInput {

    @Field(() => String)
    @IsString()
    R19Cag: string;

    @Field(() => String)
    @IsString()
    R19Nom: string;

    @Field(() => FiguraEnum)
    @IsString()
    R19Figura: FiguraEnum;

    @Field(() => String)
    @IsString()
    R19Suc_id: string;

    @Field(() => MovimientoEnum)
    @IsString()
    R19TipoMov: MovimientoEnum;

    @Field(() => String)
    @IsString()
    R19FMov: string;

    @Field(() => String)
    @IsString()
    R19FRec: string;

    @Field(() => String)
    @IsString()
    R19FRev: string;

    @Field(() => String)
    @IsString()
    R19Est: string;

    @Field(() => ID)
    @IsUUID()
    R19Coop_id: string;
}