import { IsString, MinLength, IsInt, IsPositive, Min } from 'class-validator';

export class CreatePokemonDto {
  @IsString({ message: 'name Debe ser un string' })
  @MinLength(1, { message: 'name debe tener una longitud minima es de 1' })
  name: string;
  @IsInt({ message: 'no Debe ser un entero' })
  @IsPositive({ message: 'El no Debe ser un numero positivo' })
  @Min(1, { message: 'El no debe tener longitud minima es de 1' })
  no: number;
}
