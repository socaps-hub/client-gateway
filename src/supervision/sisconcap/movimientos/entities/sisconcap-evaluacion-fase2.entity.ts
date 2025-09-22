import { ObjectType, Field, ID, Int } from "@nestjs/graphql";
import { ResFaseII } from "src/supervision/fase-ii-seguimiento/evaluaciones-fase2/enums/evaluacion-fase2.enum";
import { Movimiento } from "./movimiento.entity";

@ObjectType()
export class SisconcapEvaluacionFase2 {
    @Field(() => ID)
    R22Id: string;

    @Field(() => Int)
    R22Folio: number;

    @Field(() => String)
    R22E_id: string;

    @Field(() => ResFaseII)
    R22Res: ResFaseII;

    // Relación inversa
    @Field(() => Movimiento, { nullable: true })
    movimiento?: Movimiento;
}