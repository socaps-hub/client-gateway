import { join } from 'path';
import { Module } from '@nestjs/common';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { AuthModule } from './auth/auth.module';
import { NatsModule } from './transports/nats.module';
import { SupervisionModule } from './supervision/supervision.module';
import { ConfiguracionModule } from './configuracion/configuracion.module';
import { HealthCheckModule } from './health-check/health-check.module';

@Module({
  imports: [
    AuthModule, 
    NatsModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
     // debug: false,
      playground: false,
      introspection: true,
      autoSchemaFile: join( process.cwd(), 'src/schema.gql'),
      plugins: [
        ApolloServerPluginLandingPageLocalDefault(),
      ]
    }),

    SupervisionModule,

    ConfiguracionModule,

    ConfiguracionModule,

    HealthCheckModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
