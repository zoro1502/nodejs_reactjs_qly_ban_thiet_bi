import { IsString, IsInt, IsOptional, IsNotEmpty, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import OptionDto from './option.dto';

export default class CreateProductDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	description: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	avatar: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	slug: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	content: string;

	@ApiProperty()
	@IsOptional()
	options?: OptionDto[];

	@ApiProperty()
	@IsInt()
	@IsOptional()
	status: number;

	@ApiProperty()
	@IsInt()
	@IsOptional()
	hot: number;

	@ApiProperty()
	@IsInt()
	@IsNotEmpty()
	category_id: number;

	@ApiProperty()
	@IsNotEmpty()
	@Min(0)
	price: number;

	@ApiProperty()
	@IsNotEmpty()
	@Min(0)
	number: number;

	@ApiProperty()
	province_id?: number;

	@ApiProperty()
	district_id?: number;

	@ApiProperty()
	ward_id?: number;

	@ApiProperty()
	@Max(100)
	sale?: number;

	@ApiProperty()
	user_id?: number;
}
