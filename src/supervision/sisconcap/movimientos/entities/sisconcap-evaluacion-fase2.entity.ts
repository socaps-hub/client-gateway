import { ObjectType, Field, ID, Int } from "@nestjs/graphql";
import { Movimiento } from "./movimiento.entity";
import { ResFaseII } from "src/supervision/sisconcre/solicitudes/enums/evaluacion-fase2.enum";

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