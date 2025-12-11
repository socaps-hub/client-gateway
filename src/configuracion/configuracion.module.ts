import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { CooperativasModule } from './cooperativas/cooperativas.module';
import { SucursalesModule } from './sucursales/sucursales.module';
import { CategoriasModule } from './categorias/categorias.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProductosModule } from './productos/productos.module';
import { CreditoModule } from './credito/credito.module';
import { MigracionModule } from './migracion/migracion.module';

@Module({
    imports: [
        CooperativasModule,
        SucursalesModule,
        NatsModule,
        CategoriasModule,
        UsuariosModule,
        ProductosModule,
        CreditoModule,
        MigracionModule,
    ]
})
export class ConfiguracionModule {}
