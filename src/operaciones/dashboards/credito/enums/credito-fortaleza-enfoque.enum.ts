import { registerEnumType } from '@nestjs/graphql';

export enum CreditoFortalezaEnfoque {
  MENSUAL = 'MENSUAL',
  ACUMULADO = 'ACUMULADO',
}

registerEnumType(CreditoFortalezaEnfoque, {
  name: 'CreditoFortalezaEnfoque',
});
