import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
  ) {}
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExcrption(error);
    }
  }

  async findAll() {
    const pokemons = await this.pokemonModel.find();
    if (pokemons.length === 0) {
      throw new BadRequestException(`No hay pokemones`);
    }
    const pokemonData = {
      response: true,
      pokemons,
    };
    return pokemonData;
  }

  async findOne(term: string) {
    let pokemonId: Pokemon;

    //search by no
    if (!isNaN(+term)) {
      pokemonId = await this.pokemonModel.findOne({ no: term });
    }
    //search by mongo id
    if (!pokemonId && isValidObjectId(term)) {
      pokemonId = await this.pokemonModel.findById(term);
    }
    //search by name
    if (!pokemonId) {
      pokemonId = await this.pokemonModel.findOne({
        name: term.toLowerCase().trim(),
      });
    }
    if (!pokemonId) {
      throw new NotFoundException(
        `Pokemon whit id, name or no ${term} not found`,
      );
    }

    return pokemonId;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      const pokemon = await this.findOne(term);
      if (updatePokemonDto.name) {
        updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
      }
      await pokemon.updateOne(updatePokemonDto, {
        new: true,
      });
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExcrption(error);
    }
  }

  async remove(id: string) {
    // const pokemon = this.findOne(id);
    // await (await pokemon).deleteOne();
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon whit id "${id}" not found`);
    }
    return;
  }

  private handleExcrption(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create Pokemon -Check server logs`,
    );
  }
}
