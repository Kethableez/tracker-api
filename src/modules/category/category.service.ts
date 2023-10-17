import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CategoryEnt } from './entities/category.entity';
import { ApiResponse } from '../../core/models/api-response.dto';

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}

	async create(createCategoryDto: CreateCategoryDto, userId: number): Promise<ApiResponse> {
		await this.prisma.category.create({ data: { ...createCategoryDto, userId } });
		return { header: 'Category was created' };
	}

	findAll(userId: number): Promise<CategoryEnt[]> {
		return this.prisma.category.findMany({ where: { OR: [{ forAll: true }, { userId }] } });
	}

	findOne(id: number): Promise<CategoryEnt> {
		return this.prisma.category.findUnique({ where: { id } });
	}

	update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<CategoryEnt> {
		return this.prisma.category.update({
			where: { id },
			data: updateCategoryDto
		});
	}

	remove(id: number): Promise<CategoryEnt> {
		return this.prisma.category.delete({ where: { id } });
	}
}
