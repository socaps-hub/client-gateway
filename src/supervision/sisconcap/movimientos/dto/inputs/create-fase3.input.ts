import { Field, InputType, Int } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsNumber, IsArray, ValidateNested } from "class-validator";
import { CreateSisconcapEvaluacionFase3Input } from "./create-sisconcap-evaluacion-fase3.input";
import { CreateSisconcapEvaluacionResumenFase3Input } from "./create-sisconcap-resumen-fase3.input";

@InputType()
export class CreateFase3Input {
    @Field(() => Int)
    @IsNumber()
    folio: number;

    @Field(() => [CreateSisconcapEvaluacionFase3Input])
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateSisconcapEvaluacionFase3Input)
    evaluaciones: CreateSisconcapEvaluacionFase3Input[];

    @Field(() => CreateSisconcapEvaluacionResumenFase3Input)
    @ValidateNested()
    @Type(() => CreateSisconcapEvaluacionResumenFase3Input)
    resumen: CreateSisconcapEvaluacionResumenFase3Input;
}