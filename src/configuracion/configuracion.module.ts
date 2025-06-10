import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { CooperativasModule } from './cooperativas/cooperativas.module';
import { SucursalesModule } from './sucursales/sucursales.module';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
    imports: [
        CooperativasModule,
        SucursalesModule,
        NatsModule,
        CategoriasModule,
    ]
})
export class ConfiguracionModule {}
