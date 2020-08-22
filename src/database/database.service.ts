import { Injectable, OnModuleInit, HttpException } from '@nestjs/common';
import { createConnection } from 'typeorm';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { User } from './entity/user.entity';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(private config: ConfigService) {}
  async onModuleInit() {
    await createConnection({
      type: 'mysql',
      host: this.config.get('DATABASE_HOST'),
      port: Number(this.config.get('DATABASE_PORT')),
      username: this.config.get('DATABASE_USER'),
      password: this.config.get('DATABASE_PASSWORD'),
      database: this.config.get('DATABASE_NAME'),
      entities: [ User],
      synchronize: false,
      logging: false,
      insecureAuth: true,
    })
    .then(done => console.log('Connection established'))
    .catch(err => {
      console.log(err);
      throw new HttpException('Connection Error', 500);
    });
  }
}
