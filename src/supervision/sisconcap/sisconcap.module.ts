import { Module } from '@nestjs/common';
import { MovimientosModule } from './movimientos/movimientos.module';

@Module({
  imports: [MovimientosModule]
})
export class SisconcapModule {}
