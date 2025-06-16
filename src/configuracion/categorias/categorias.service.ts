import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCategoriaInput } from './dto/inputs/create-categoria.input';
import { NATS_SERVICE } from 'src/config/services';
import { categoriasPatterns } from 'src/common/constants/categorias/categoriasPatterns';
import { Observable } from 'rxjs';
import { Categoria } from './entities/categoria.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class CategoriasService {
  
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  create(createCategoriaInput: CreateCategoriaInput, user: Usuario): Observable<Categoria> {
    return this.client.send( categoriasPatterns.CREATE, { createCategoriaInput, user } );
  }

  findAll(): Observable<Categoria[]> {
    return this.client.send( categoriasPatterns.GET_ALL, {} );
  }

  findOne(id: string): Observable<Categoria> {
    return this.client.send( categoriasPatterns.GET_BY_ID, { id } );
  }

  // update(id: string, updateCategoriaInput: UpdateCategoriaInput) {
  //   return `This action updates a #${id} categoria`;
  // }

  // remove(id: string) {
  //   return `This action removes a #${id} categoria`;
  // }
}
