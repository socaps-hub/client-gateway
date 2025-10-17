import { join } from 'path';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { graphqlUploadExpress } from 'graphql-upload-ts';

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
      ],
      csrfPrevention: false,
    }),

    SupervisionModule,

    ConfiguracionModule,

    ConfiguracionModule,

    HealthCheckModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(
  //     graphqlUploadExpress({
  //       maxFileSize: 10_000_000, // 10 MB
  //       maxFiles: 1,
  //     }),
  //   ).forRoutes('graphql');
  // }
}
