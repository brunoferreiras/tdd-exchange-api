import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { Repository } from 'typeorm';
import { Currencies } from './currencies.entity';
import { CreateCurrencyDto } from './dto/create-currency.dto';

export class CurrenciesRepository extends Repository<Currencies> {
  async getCurrency(currency: string): Promise<Currencies> {
    const result = await this.findOne({ currency })

    if (!result) {
      throw new InternalServerErrorException();
    }

    return result;
  }

  async createCurrency(createCurrencyDto: CreateCurrencyDto): Promise<Currencies> {
    const createCurrency = new Currencies();
    createCurrency.currency = createCurrencyDto.currency;
    createCurrency.value = createCurrencyDto.value;

    try {
      await validateOrReject(createCurrency);
      await this.save(createCurrency);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return createCurrency
  }

  async updateCurrency({ currency, value }: CreateCurrencyDto): Promise<Currencies> {
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
    const result = await this.findOne({ currency })

    if (!result) {
      throw new NotFoundException(`The currency ${currency} not found`)
    }
    

    await this.delete({ currency });
  }
}