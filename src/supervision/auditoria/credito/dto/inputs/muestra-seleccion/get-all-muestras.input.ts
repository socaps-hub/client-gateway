// src/supervision/auditoria/credito/dto/inputs/get-all-muestras.input.ts
import { InputType, OmitType } from '@nestjs/graphql';
import { ParametrosMuestraInput } from '../muestra-params.input';

@InputType()
export class GetAllMuestrasInput extends OmitType(ParametrosMuestraInput, [
  'filtro',
  'margenError',
  'nivelConfianza',
  'filters',
  'searchText',
] as const) {}
