import { InputType, Field, Int, ID } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { Calificativo, Resolucion } from 'src/supervision/fase-i-levantamiento/evaluaciones/enums/evaluacion.enum';

@InputType()
export class CreateEvaluacionResumenFase2Input {

    @Field(() => String)
    @IsString()
    R08P_num: string;

    @Field(() => Int)
    @IsNumber()
    R08SolvT: number;
    
    @Field(() => Int)
    @IsNumber()
    R08SolvA: number;
    
    @Field(() => Int)
    @IsNumber()
    R08SolvM: number;
    
    @Field(() => Int)
    @IsNumber()
    R08SolvB: number;
    
    @Field(() => Int)
    @IsNumber()
    R08Rc: number;

    @Field(() => Calificativo)
    @IsString()
    R08Cal: Calificativo;
    
    @Field(() => Resolucion)
    @IsString()
    R08Res: Resolucion;

    @Field(() => String)
    @IsString()
    R08Obs: string;
}
