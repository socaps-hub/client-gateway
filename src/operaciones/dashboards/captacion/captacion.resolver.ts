import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CaptacionService } from './captacion.service';
import { CaptacionPeriodoInput } from './dto/inputs/captacion-periodo.input';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { CaptacionTablaSaldosOutput } from './dto/outputs/saldos/captacion-tabla-saldos.output';
import { CaptacionPosicionOutput } from './dto/outputs/saldos/captacion-posicion.output';
import { CaptacionBaseInput } from './dto/inputs/captacion-base.input';
import {CaptacionComposicionOutput} from "./dto/outputs/saldos/captacion-composicion.output";
import { CaptacionProductosAnalisisOutput } from './dto/outputs/saldos/captacion-productos-analisis.output';
import { CaptacionProductoInput } from './dto/inputs/captacion-producto.input';

@Resolver()
@UseGuards(AuthGraphQLGuard)
export class CaptacionResolver {
  constructor(private readonly _captacionService: CaptacionService) {}

  @Query(() => CaptacionTablaSaldosOutput, {
    name: 'captacionTablaSaldos',
  })
  public getTablaSaldos(@Args('input') input: CaptacionPeriodoInput) {
    return this._captacionService.getTablaSaldos(input);
  }

  @Query(() => CaptacionPosicionOutput, {
    name: 'captacionPosicion',
  })
  public getPosicion(@Args('input') input: CaptacionBaseInput) {
    return this._captacionService.getPosicion(input);
  }

  @Query(() => CaptacionComposicionOutput, {
    name: 'captacionComposicion',
  })
  public getComposicion(@Args('input') input: CaptacionBaseInput) {
    return this._captacionService.getComposicion(input);
  }

  @Query(() => CaptacionProductosAnalisisOutput, {
    name: 'captacionCuentasVista',
  })
  public getCuentasVista(@Args('input') input: CaptacionProductoInput) {
    return this._captacionService.getCuentasVista(input);
  }

  @Query(() => CaptacionProductosAnalisisOutput, {
    name: 'captacionCuentasPlazo',
  })
  public getCuentasPlazo(@Args('input') input: CaptacionProductoInput) {
    return this._captacionService.getCuentasPlazo(input);
  }
}
