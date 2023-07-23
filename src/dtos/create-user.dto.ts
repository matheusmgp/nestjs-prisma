import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Campo Nome é obrigatório' })
  @IsString({ message: 'Campo Nome precisa ser string' })
  @MaxLength(80)
  name: string;

  @IsNotEmpty({ message: 'Campo Email é obrigatório' })
  @IsEmail()
  email: string;
}
