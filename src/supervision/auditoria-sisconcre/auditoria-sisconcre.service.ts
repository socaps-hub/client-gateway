import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { AuditoriaInput } from './dto/inputs/auditoria.input';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { auditoriaSisiconcrePatterns } from 'src/common/constants';

@Injectable()
export class AuditoriaSisconcreService {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) {}

    validarPrestamosNoExistentes( data: AuditoriaInput[], user: Usuario ) {
        return this.client.send( auditoriaSisiconcrePatterns.VALIDAR_PRESTAMOS_FROM_EXCEL, { data, user } );
    }
}
