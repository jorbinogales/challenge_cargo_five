import { Logger, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { CategoryModule } from './category/category.module';
import { RoleModule } from './role/role.module';
import { EasyconfigModule } from 'nestjs-easyconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from './database/connection';
import { ConfigurationModule } from './configs/configuration.module';
import { EasyConfiguration } from './configs/easyconfig.service';

require('dotenv').config();

@Module({
  imports: [
    EasyconfigModule.register({
      path: `environment/.env.${process.env.NODE_ENV}`,
      safe: true,
    }),
    TypeOrmModule.forRootAsync(DatabaseConfiguration),
    ConfigurationModule,
    UserModule, 
    ArticleModule,
    CategoryModule, 
    // RoleModule
  ],
  providers: [EasyConfiguration, Logger]
})
export class AppModule {}
