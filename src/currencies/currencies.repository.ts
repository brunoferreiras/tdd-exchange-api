import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
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

  async createCurrency(currenciesInputType: CurrenciesInputType): Promise<Currencies> {
    const createCurrency = new Currencies();
    createCurrency.currency = currenciesInputType.currency;
    createCurrency.value = currenciesInputType.value;

    try {
      await validateOrReject(createCurrency);
      await this.save(createCurrency);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return createCurrency
  }

  async updateCurrency({ currency, value }: CurrenciesInputType): Promise<Currencies> {
    const result = await this.findOne({ currency });
    if (!result) {
      throw new NotFoundException(`The currency ${currency} not found`)
    }

    result.value = value;
    try {
      await this.save(result)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }

    return result
  }

  async deleteCurrency(currency: string): Promise<void> {
    return;
  }
}