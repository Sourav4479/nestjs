import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class UpdateTodoDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  @IsNotEmpty()
  done: boolean;
}
