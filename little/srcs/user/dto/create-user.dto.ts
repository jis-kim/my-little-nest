import { IsNumber, IsString, Max, MaxLength, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(20)
  name: string;

  @IsNumber()
  @Max(130)
  @Min(0)
  age: number;

  //@IsStrongPassword()
  @IsString()
  @MaxLength(20)
  password: string;
}
