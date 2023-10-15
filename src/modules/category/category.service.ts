import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CategoryEnt } from './entities/category.entity';

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}

	create(createCategoryDto: CreateCategoryDto, userId: number): Promise<CategoryEnt> {
		return this.prisma.category.create({ data: { ...createCategoryDto, userId } });
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
