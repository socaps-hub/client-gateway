import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { migracionPatterns } from 'src/common/constants/migracion/migracionPatterns';
import { NATS_SERVICE } from 'src/config/services';
import { MigracionRequestInput } from './dto/input/migracion-request.input';

@Injectable()
export class MigracionService {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

    public getAllControlMigrations() {
        return this.client.send( migracionPatterns.GET_ALL_CONTROL_MIGRATIONS, {} )
    }

    public getControlMigrationById( id: number ) {
        return this.client.send( migracionPatterns.GET_CONTROL_MIGRATION_BY_ID, { id } )
    }

    public ejecutarMigracion(input: MigracionRequestInput) {
        this.client.emit(
            migracionPatterns.MIGRAR_SISTEMA,
            { input }
        );
    }

}
