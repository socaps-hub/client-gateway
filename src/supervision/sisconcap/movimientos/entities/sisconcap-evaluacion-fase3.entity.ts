import { ObjectType, Field, ID, Int } from "@nestjs/graphql";
import { ResFaseII } from "src/supervision/fase-ii-seguimiento/evaluaciones-fase2/enums/evaluacion-fase2.enum";
import { Movimiento } from "./movimiento.entity";
@ObjectType()
export class SisconcapEvaluacionFase3 {
    @Field(() => ID)
    R24Id: string;

    @Field(() => Int)
    R24Folio: number;

    @Field(() => String)
    R24E_id: string;

    @Field(() => ResFaseII)
    R24Res: ResFaseII;

    // Relación inversa
    @Field(() => Movimiento, { nullable: true })
    movimiento?: Movimiento;
}