import { registerEnumType } from '@nestjs/graphql';

export enum CreditoRentabilidadModo {
  SUCURSALES = 'SUCURSALES',
  PRODUCTOS = 'PRODUCTOS',
}

registerEnumType(CreditoRentabilidadModo, {
  name: 'CreditoRentabilidadModo',
});

export enum CreditoRentabilidadIdentificador {
  MAYOR_SALDO = 'MAYOR_SALDO',
  MAYOR_INTERES_COBRADO = 'MAYOR_INTERES_COBRADO',
}

registerEnumType(CreditoRentabilidadIdentificador, {
  name: 'CreditoRentabilidadIdentificador',
});
