import { ArgsType, Field } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString } from "class-validator";
import { ValidEstadosAuditoria } from "../../enums/valid-estados.enum";

@ArgsType()
export class CreditosByEstadoArgs {

    @Field( () => ValidEstadosAuditoria)
    @IsString()
    estado: ValidEstadosAuditoria

    @Field( () => Boolean, { nullable: true, defaultValue: true })
    @IsBoolean()
    @IsOptional()
    filterBySucursal?: boolean

}
