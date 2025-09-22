import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNumber, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateSisconcapEvaluacionFase2Input } from "./create-sisconcap-evaluacion-fase2.input";
import { CreateSisconcapEvaluacionResumenFase2Input } from "./create-sisconcap-resumen-fase2.input";

@InputType()
export class CreateFase2Input {
    @Field(() => Int)
    @IsNumber()
    folio: number;

    @Field(() => [CreateSisconcapEvaluacionFase2Input])
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateSisconcapEvaluacionFase2Input)
    evaluaciones: CreateSisconcapEvaluacionFase2Input[];

    @Field(() => CreateSisconcapEvaluacionResumenFase2Input)
    @ValidateNested()
    @Type(() => CreateSisconcapEvaluacionResumenFase2Input)
    resumen: CreateSisconcapEvaluacionResumenFase2Input;
}