import { Module } from '@nestjs/common';
import { MovimientosModule } from './movimientos/movimientos.module';
import { ReportesModule } from './reportes/reportes.module';

@Module({
  imports: [MovimientosModule, ReportesModule]
})
export class SisconcapModule {}
