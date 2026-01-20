import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { Calificativo } from 'src/supervision/sisconcre/solicitudes/enums/evaluacion.enum';

@InputType()
export class CreateEvaluacionResumenFase4Input {

    @Field(() => ID)
    @IsString()
    R16P_num: string;

    @Field(() => Int)
    @IsNumber()
    R16SolvT: number;

    @Field(() => Int)
    @IsNumber()
    R16SolvA: number;

    @Field(() => Int)
    @IsNumber()
    R16SolvM: number;

    @Field(() => Int)
    @IsNumber()
    R16SolvB: number;

    @Field(() => Calificativo)
    @IsString()
    R16SegCal: Calificativo;

    @Field(() => Int)
    @IsNumber()
    R16HaSolv: number;

    @Field(() => Int)
    @IsNumber()
    R16PenCu: number;

    @Field(() => Int)
    @IsNumber()
    R16RcF: number;

    @Field(() => Calificativo)
    @IsString()
    R16DesCal: Calificativo;

    @Field(() => Calificativo)
    @IsString()
    R16CalF: Calificativo;

    @Field(() => String)
    @IsString()
    R16Obs: string;

    @Field(() => String)
    @IsString()
    R16Ev_por: string;
}
