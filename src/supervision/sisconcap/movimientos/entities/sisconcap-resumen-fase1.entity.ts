import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Usuario } from "src/configuracion/usuarios/entities/usuario.entity";
import { Movimiento } from "./movimiento.entity";
import { Calificativo } from "src/supervision/sisconcre/solicitudes/enums/evaluacion.enum";

@ObjectType()
export class SisconcapEvaluacionResumenFase1 {
    @Field(() => Int)
    R21Folio: number;

    @Field(() => Int)
    R21Ha: number;

    @Field(() => Int)
    R21Rc: number;

    @Field(() => Calificativo)
    R21Cal: Calificativo;

    @Field(() => String)
    R21Obs: string;

    @Field(() => String)
    R21Ejvo_id: string;

    @Field(() => String)
    R21SP_id: string;

    // Relaciones
    @Field(() => Movimiento, { nullable: true })
    movimiento?: Movimiento;

    @Field(() => Usuario, { nullable: true })
    supervisor?: Usuario;

    @Field(() => Usuario, { nullable: true })
    ejecutivo?: Usuario;
}