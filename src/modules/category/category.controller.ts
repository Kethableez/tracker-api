import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserId } from 'src/core/decorators/auth-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEnt } from './entities/category.entity';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiCreatedResponse({ type: CategoryEnt })
	create(@Body() createCategoryDto: CreateCategoryDto, @UserId() userId: number): Promise<CategoryEnt> {
		return this.categoryService.create(createCategoryDto, userId);
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({ type: CategoryEnt, isArray: true })
	findAll(@UserId() userId: number): Promise<CategoryEnt[]> {
		return this.categoryService.findAll(userId);
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({ type: CategoryEnt })
	findOne(@Param('id', ParseIntPipe) id: number): Promise<CategoryEnt> {
		return this.categoryService.findOne(id);
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({ type: CategoryEnt })
	update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto): Promise<CategoryEnt> {
		return this.categoryService.update(id, updateCategoryDto);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({ type: CategoryEnt })
	remove(@Param('id', ParseIntPipe) id: number): Promise<CategoryEnt> {
		return this.categoryService.remove(id);
	}
}
