import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Usuario } from "src/configuracion/usuarios/entities/usuario.entity";
import { Movimiento } from "./movimiento.entity";
import { Calificativo } from "src/supervision/sisconcre/solicitudes/enums/evaluacion.enum";

@ObjectType()
export class SisconcapEvaluacionResumenFase3 {
    @Field(() => Int)
    R25Folio: number;

    @Field(() => Int)
    R25Solv: number;

    @Field(() => Int)
    R25PSolv: number;

    @Field(() => Int)
    R25Rc: number;

    @Field(() => String)
    R25Obs: string;

    @Field(() => Calificativo)
    R25Cal: Calificativo;

    @Field(() => String)
    R25FSegG: string;

    @Field(() => String)
    R25SP_id: string;

    // Relaciones
    @Field(() => Movimiento, { nullable: true })
    movimiento?: Movimiento;

    @Field(() => Usuario, { nullable: true })
    supervisor?: Usuario;
}