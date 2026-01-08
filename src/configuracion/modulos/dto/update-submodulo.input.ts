import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { IsNumber } from "class-validator";
import { CreateSubModuloInput } from "./create-submodulo.input";

@InputType()
export class UpdateSubModuloInput extends PartialType(CreateSubModuloInput) {

  @Field(() => Int)
  @IsNumber()
  id: number;

}