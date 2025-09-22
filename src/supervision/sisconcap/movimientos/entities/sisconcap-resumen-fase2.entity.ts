import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Usuario } from "src/configuracion/usuarios/entities/usuario.entity";
import { Calificativo } from "src/supervision/fase-i-levantamiento/evaluaciones/enums/evaluacion.enum";
import { Movimiento } from "./movimiento.entity";

@ObjectType()
export class SisconcapEvaluacionResumenFase2 {
    @Field(() => Int)
    R23Folio: number;

    @Field(() => Int)
    R23Solv: number;

    @Field(() => Int)
    R23PSolv: number;

    @Field(() => Int)
    R23Rc: number;

    @Field(() => String)
    R23Obs: string;

    @Field(() => Calificativo)
    R23Cal: Calificativo;

    @Field(() => String)
    R23FSeg: string;

    @Field(() => String)
    R23SP_id: string;

    // Relaciones
    @Field(() => Movimiento, { nullable: true })
    movimiento?: Movimiento;

    @Field(() => Usuario, { nullable: true })
    supervisor?: Usuario;
}