import { Inject, Injectable } from "@nestjs/common";
import { Sucursal } from "./entities/sucursal.entity";
import { ClientProxy } from "@nestjs/microservices";
import { NATS_SERVICE } from "src/config/services";
import { sucursalesPatterns } from "src/common/constants";
import { CreateSucursaleInput } from "./dto/inputs/create-sucursale.input";
import { Usuario } from "../usuarios/entities/usuario.entity";


@Injectable()
export class SucursalesService {

  constructor(
    @Inject(NATS_SERVICE) private readonly _client: ClientProxy
  ) {}

  create(createSucursalInput: CreateSucursaleInput, user: Usuario) {
    return this._client.send( sucursalesPatterns.CREATE, { createSucursalInput, user } );
  }

  findAll(user: Usuario) {
    return this._client.send( sucursalesPatterns.GET_ALL, { user } );
  }

  findAllByCoopId(id: string) {
    return this._client.send( sucursalesPatterns.GET_ALL_BY_COOP_ID, { id } );
  }

  findOne(id: string, user: Usuario) {
    return this._client.send( sucursalesPatterns.GET_BY_ID, { id, user } );
  }

  // update(id: number, updateSucursaleInput: UpdateSucursaleInput) {
  //   return `This action updates a #${id} sucursale`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} sucursale`;
  // }
}