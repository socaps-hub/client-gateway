import { IsNumber, IsOptional, IsString } from "class-validator";
import { InputType, Field, Int } from "@nestjs/graphql";
import { Calificativo } from "src/supervision/sisconcre/solicitudes/enums/evaluacion.enum";

@InputType()
export class CreateSisconcapEvaluacionResumenFase3Input {
    @Field(() => Int)
    @IsNumber()
    R25Solv: number;

    @Field(() => Int)
    @IsNumber()
    R25PSolv: number;

    @Field(() => Int)
    @IsNumber()
    R25Rc: number;

    @Field(() => String, { nullable: true })
    @IsOptional()
    R25Obs?: string;

    @Field(() => String)
    @IsString()
    R25FSegG: string;

    @Field(() => Calificativo)
    @IsString()
    R25Cal: Calificativo;
}