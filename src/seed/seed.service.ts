import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adepters/axios.adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { ResponsePokedex } from './interfaces/response-pokedes';

@Injectable()
export class SeedService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({});
    const data = await this.http.get<ResponsePokedex>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const modificData = data.results.map((value) => {
      const segment = value.url.split('/');
      const numero = +segment[segment.length - 2];
      const { url, ...object } = value;
      object.no = numero;
      return object;
    });
    await this.pokemonModel.create(modificData);
    return 'Seed Executed';
  }
}
