import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';

import { CreditoService } from './credito.service';
import { AuthGraphQLGuard } from '../../../auth/guards/auth-graphql.guard';
import { CreditoColocacionTotalOutput } from './dto/outputs/credito-colocacion-total.output';
import { CreditoColocacionTotalInput } from './dto/inputs/credito-colocacion-total.input';
import { CreditoMedicionAnualOutput } from './dto/outputs/credito-medicion-anual.output';
import { CreditoMedicionAnualInput } from './dto/inputs/credito-medicion-anual.input';
import { CreditoMedicionMensualOutput } from './dto/outputs/credito-medicion-mensual.output';
import { CreditoMedicionMensualInput } from './dto/inputs/credito-medicion-mensual.input';
import { CreditoMedicionTrimestralOutput } from './dto/outputs/credito-medicion-trimestral.output';
import { CreditoMedicionTrimestralInput } from './dto/inputs/credito-medicion-trimestral.input';
import { CreditoFortalezaColocacionOutput } from './dto/outputs/credito-fortaleza-colocacion.output';
import { CreditoFortalezaColocacionInput } from './dto/inputs/credito-fortaleza-colocacion.input';
import { CreditoPosicionLogroMetaOutput } from './dto/outputs/credito-posicion-logro-meta.output';
import { CreditoPosicionLogroMetaInput } from './dto/inputs/credito-posicion-logro-meta.input';
import {
  CreditoCumplimientoMensualColocacionOutput
} from './dto/outputs/credito-cumplimiento-mensual-colocacion.output';
import { CreditoCumplimientoMensualColocacionInput } from './dto/inputs/credito-cumplimiento-mensual-colocacion.input';
import { CreditoComportamientoProductoOutput } from './dto/outputs/credito-comportamiento-producto.output';
import { CreditoComportamientoProductoInput } from './dto/inputs/credito-comportamiento-producto.input';
import { CreditoComportamientoCarteraOutput } from './dto/outputs/credito-comportamiento-cartera.output';
import { CreditoComportamientoCarteraInput } from './dto/inputs/credito-comportamiento-cartera.input';
import { CreditoComposicionCarteraOutput } from './dto/outputs/credito-composicion-cartera.output';
import { CreditoComposicionCarteraInput } from './dto/inputs/credito-composicion-cartera.input';
import { CreditoDiasAtrasoOutput } from './dto/outputs/credito-dias-atraso.output';
import { CreditoDiasAtrasoInput } from './dto/inputs/credito-dias-atraso.input';
import { CreditoAmortizacionesPactadasOutput } from './dto/outputs/credito-amortizaciones-pactadas.output';
import { CreditoAmortizacionesPactadasInput } from './dto/inputs/credito-amortizaciones-pactadas.input';
import { CreditoAmortizacionesVencidasOutput } from './dto/outputs/credito-amortizaciones-vencidas.output';
import { CreditoAmortizacionesVencidasInput } from './dto/inputs/credito-amortizaciones-vencidas.input';

@Resolver()
@UseGuards(AuthGraphQLGuard)
export class CreditoResolver {
  constructor(private readonly _creditoService: CreditoService) {}

  @Query(() => CreditoColocacionTotalOutput, {
    name: 'creditoColocacionTotalDashboard',
  })
  async creditoColocacionTotalDashboard(
    @Args('input') input: CreditoColocacionTotalInput,
  ) {
    return this._creditoService.getColocacionTotalDashboard(input);
  }

  @Query(() => CreditoMedicionAnualOutput, {
    name: 'creditoMedicionAnual',
  })
  public getMedicionAnual(
    @Args('input')
    input: CreditoMedicionAnualInput,
  ) {
    return this._creditoService.getMedicionAnual(input);
  }

  @Query(() => CreditoMedicionMensualOutput, {
    name: 'creditoMedicionMensual',
  })
  public getMedicionMensual(
    @Args('input')
    input: CreditoMedicionMensualInput,
  ) {
    return this._creditoService.getMedicionMensual(input);
  }

  @Query(() => CreditoMedicionTrimestralOutput, {
    name: 'creditoMedicionTrimestral',
  })
  public getMedicionTrimestral(
    @Args('input')
    input: CreditoMedicionTrimestralInput,
  ) {
    return this._creditoService.getMedicionTrimestral(input);
  }

  @Query(() => CreditoFortalezaColocacionOutput, {
    name: 'creditoFortalezaColocacion',
  })
  public getFortalezaColocacion(
    @Args('input')
    input: CreditoFortalezaColocacionInput,
  ) {
    return this._creditoService.getFortalezaColocacion(input);
  }

  @Query(() => CreditoPosicionLogroMetaOutput, {
    name: 'creditoPosicionLogroMeta',
  })
  public getPosicionLogroMeta(
    @Args('input')
    input: CreditoPosicionLogroMetaInput,
  ): Observable<CreditoPosicionLogroMetaOutput> {
    return this._creditoService.getPosicionLogroMeta(input);
  }

  @Query(() => CreditoCumplimientoMensualColocacionOutput, {
    name: 'creditoCumplimientoMensualColocacion',
  })
  public getCumplimientoMensualColocacion(
    @Args('input')
    input: CreditoCumplimientoMensualColocacionInput,
  ): Observable<CreditoCumplimientoMensualColocacionOutput> {
    return this._creditoService.getCumplimientoMensualColocacion(input);
  }

  @Query(() => CreditoComportamientoProductoOutput, {
    name: 'creditoComportamientoProducto',
  })
  public getComportamientoProducto(
    @Args('input')
    input: CreditoComportamientoProductoInput,
  ): Observable<CreditoComportamientoProductoOutput> {
    return this._creditoService.getComportamientoProducto(input);
  }

  //   ====================================
  //   CALIDAD DE LA CARTERA
  //   ====================================
  @Query(() => CreditoComportamientoCarteraOutput, {
    name: 'creditoComportamientoCartera',
  })
  public getComportamientoCartera(
    @Args('input') input: CreditoComportamientoCarteraInput,
  ): Observable<CreditoComportamientoCarteraOutput> {
    return this._creditoService.getComportamientoCartera(input);
  }

  @Query(() => CreditoComposicionCarteraOutput, {
    name: 'creditoComposicionCartera',
  })
  public getComposicionCartera(
    @Args('input') input: CreditoComposicionCarteraInput,
  ): Observable<CreditoComposicionCarteraOutput> {
    return this._creditoService.getComposicionCartera(input);
  }

  @Query(() => CreditoDiasAtrasoOutput, {
    name: 'creditoDiasAtraso',
  })
  public getDiasAtraso(
    @Args('input') input: CreditoDiasAtrasoInput,
  ): Observable<CreditoDiasAtrasoOutput> {
    return this._creditoService.getDiasAtraso(input);
  }

  @Query(() => CreditoAmortizacionesPactadasOutput, {
    name: 'creditoAmortizacionesPactadas',
  })
  public getAmortizacionesPactadas(
    @Args('input') input: CreditoAmortizacionesPactadasInput,
  ): Observable<CreditoAmortizacionesPactadasOutput> {
    return this._creditoService.getAmortizacionesPactadas(input);
  }

  @Query(() => CreditoAmortizacionesVencidasOutput, {
    name: 'creditoAmortizacionesVencidas',
  })
  public getAmortizacionesVencidas(
    @Args('input') input: CreditoAmortizacionesVencidasInput,
  ): Observable<CreditoAmortizacionesVencidasOutput> {
    return this._creditoService.getAmortizacionesVencidas(input);
  }
}
