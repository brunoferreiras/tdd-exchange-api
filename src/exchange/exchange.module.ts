import { Module } from '@nestjs/common';
import { CurrenciesModule } from '../currencies/currencies.module';
import { ExchangeService } from './exchange.service';

@Module({
  imports: [CurrenciesModule],
  providers: [ExchangeService]
})
export class ExchangeModule {}
