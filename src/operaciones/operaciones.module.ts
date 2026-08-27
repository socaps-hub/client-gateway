import { Module } from '@nestjs/common';
import { DashboardsModule } from './dashboards/dashboards.module';
import { MetasModule } from './metas/metas.module';

@Module({
  imports: [DashboardsModule, MetasModule]
})
export class OperacionesModule {}
