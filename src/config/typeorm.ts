import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Currencies } from '../currencies/currencies.entity';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: 'mongodb://localhost:27017/exchange',
  synchronize: true,
  autoLoadEntities: true,
  entities: [Currencies]
}
