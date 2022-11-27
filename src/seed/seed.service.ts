import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ResponsePokedex } from './interfaces/response-pokedes';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    const { data } = await this.axios.get<ResponsePokedex>(
      'https://pokeapi.co/api/v2/pokemon?limit=100',
    );

    const modificData = data.results.map((value) => {
      const segment = value.url.split('/');
      const numero = +segment[segment.length - 2];
      const { url, ...object } = value;
      object.no = numero;
      return object;
    });
    return modificData;
  }
}
