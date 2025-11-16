import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/services';
import { CreateRadiografiaCargaArgs } from './dto/args/create-radiografia-carga.arg';
import { radiografiasPatterns } from 'src/common/constants/radiografias/radiografiasPatterns';
import { FileUpload } from 'graphql-upload-ts';

@Injectable()
export class RadiografiaService {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

    // crearCargaMasivaRadiografiaCredito( file: FileUpload, cooperativaId: string ) {        
    //     return this.client.send( radiografiasPatterns.UPLOAD_RA_CREDITO, { file, cooperativaId } );
    // }

    crearCargaMasivaRadiografiaCredito(key: string, cooperativaCodigo: string) {
        console.log({key, cooperativaCodigo});

        return this.client.emit(
            radiografiasPatterns.UPLOAD_RA_CREDITO,
            { key, cooperativaCodigo }
        );
        
        // return this.client.send( radiografiasPatterns.UPLOAD_RA_CREDITO, { key, cooperativaCodigo });
        // return {
        //     status: true,
        //     message: 'El procesamiento ha iniciado',
        // };
    }

}
