import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/services';
import { CreateRadiografiaCargaArgs } from './dto/args/create-radiografia-carga.arg';
import { radiografiasPatterns } from 'src/common/constants/radiografias/radiografiasPatterns';
import { FileUpload } from 'graphql-upload-ts';
import { RadioAreaEnum } from './enums/control-carga-radio-area.enum';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';

@Injectable()
export class RadiografiaService {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

    // crearCargaMasivaRadiografiaCredito( file: FileUpload, cooperativaId: string ) {        
    //     return this.client.send( radiografiasPatterns.UPLOAD_RA_CREDITO, { file, cooperativaId } );
    // }

    getAllControlCargaRadiografias() {
        return this.client.send( radiografiasPatterns.GET_ALL_CONTROL_CARGA_RADIOS, {} );
    }

    crearCargaMasivaRadiografiaCredito(key: string, cooperativaCodigo: string) {
        return this.client.emit(
            radiografiasPatterns.UPLOAD_RA_CREDITO,
            { key, cooperativaCodigo }
        );
    }

    crearCargaMasivaRadiografia(key: string, cooperativaCodigo: string, area: RadioAreaEnum, user: Usuario) {
        return this.client.emit(
            radiografiasPatterns.UPLOAD_RADIOGRAFIA,
            { key, cooperativaCodigo, area, user }
        );
    }

}
