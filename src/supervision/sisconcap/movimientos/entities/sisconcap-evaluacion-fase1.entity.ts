import { ObjectType, Field, ID, Int } from "@nestjs/graphql";
import { Movimiento } from "./movimiento.entity";
import { ResFaseI } from "src/supervision/sisconcre/solicitudes/enums/evaluacion.enum";

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