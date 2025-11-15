import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';

import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { ParametrosMuestraInput } from './dto/inputs/muestra-params.input';
import { auditoriaCreditoPatterns } from 'src/common/constants/auditoria/credito/auditoriaCreditoPatterns';
import { CreateMuestraSeleccionInput } from './dto/inputs/muestra-seleccion/create-muestra-seleccion.input';
import { GetAllMuestrasInput } from './dto/inputs/muestra-seleccion/get-all-muestras.input';
import { GetCreditosSeleccionadosInput } from './dto/inputs/muestra-credito-seleccion/get-creditos-seleccionados.input';

@Injectable()
export class CreditoService {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  public async getCreditoSeleccionadoById( id: number ) {
    return this.client.send( auditoriaCreditoPatterns.GET_CREDITO_SELECCIONADO_BY_ID, { id });
  }

  // ────────────────────────────────────────────────
  // 🔹 1️⃣ Cálculo inicial (valores globales)
  // ────────────────────────────────────────────────
  public getMuestraInicial(input: ParametrosMuestraInput, user: Usuario) {
    return this.client.send(
      auditoriaCreditoPatterns.GET_MUESTRA_INICIAL,
      { input, user },
    );
  }

  // ────────────────────────────────────────────────
  // 🔹 2️⃣ Créditos filtrados (solo tabla)
  // ────────────────────────────────────────────────
  public getCreditosFiltrados(input: ParametrosMuestraInput, user: Usuario) {
    return this.client.send(
      auditoriaCreditoPatterns.GET_CREDITOS_FILTRADOS,
      { input, user },
    );
  }

  public async createOrUpdateMuestraSeleccionConFolios(
    user: Usuario,
    input: CreateMuestraSeleccionInput,
    folios: number[],
    isUpdate = false,
    muestraId?: number,
  ) {
    return this.client.send( auditoriaCreditoPatterns.CREATE_MUESTRA_SELECCION, { user, input, folios, isUpdate, muestraId } );
  }

  public async getAllMuestrasSeleccion( user: Usuario, input: GetAllMuestrasInput ) {

    const { page = 1, pageSize = 20, paginado = false } = input

    return this.client.send( auditoriaCreditoPatterns.GET_ALL_MUESTRAS, { user, page, pageSize, paginado } );
  }

  public async getCreditosSeleccionadosByMuestra(user: Usuario, input: GetCreditosSeleccionadosInput) {
    return this.client.send( auditoriaCreditoPatterns.GET_CREDITOS_SELECCIONADOS_BY_MUESTRA, { user, input } );
  }

  public async getMuestraDetalleById(muestraId: number) {
    return this.client.send( auditoriaCreditoPatterns.GET_MUESTRA_DETALLE_BY_ID, { muestraId } );
  }
}
