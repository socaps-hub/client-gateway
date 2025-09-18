import { ObjectType, Field, ID, Int } from "@nestjs/graphql";
import { ResFaseI } from "src/supervision/fase-i-levantamiento/evaluaciones/enums/evaluacion.enum";
import { Movimiento } from "./movimiento.entity";

@ObjectType()
export class SisconcapEvaluacionFase1 {
    @Field(() => ID)
    R20Id: string;

    @Field(() => Int)
    R20Folio: number;

    @Field(() => String)
    R20E_id: string;

    @Field(() => ResFaseI)
    R20Res: ResFaseI;

    // Relación inversa
    @Field(() => Movimiento, { nullable: true })
    movimiento?: Movimiento;
}