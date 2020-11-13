import { InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Currencies } from './currencies.entity';
import { CurrenciesInputType } from './types/currencies-input.type';

export class CurrenciesRepository extends Repository<Currencies> {
  async getCurrency(currency: string): Promise<Currencies> {
    const result = await this.findOne({ currency })

    if (!result) {
      throw new InternalServerErrorException();
    }

    return result;
  }

  async createCurrency({ currency, value }: CurrenciesInputType): Promise<Currencies> {
    return new Currencies();
  }

  async updateCurrency({ currency, value }: CurrenciesInputType): Promise<Currencies> {
    return new Currencies();
  }

  async deleteCurrency(currency: string): Promise<void> {
    return;
  }
}