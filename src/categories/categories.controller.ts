import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create new category' })
  @ApiResponse({
    status: 201,
    description: 'New category created with success',
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid Parameters' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all categories registered' })
  @ApiResponse({ status: 200, description: 'Categories found' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Generate PDF file with all Categories' })
  @ApiResponse({ status: 200, description: 'PDF file generated with success' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Get('pdf')
  exportPdf() {
    return this.categoriesService.generatePdf();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get specific category by ID' })
  @ApiResponse({ status: 200, description: 'Category found' })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid Parameters' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update specific category by ID' })
  @ApiResponse({ status: 204, description: 'Category updated with success' })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid Parameters' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete specific category by ID' })
  @ApiResponse({ status: 204, description: 'Category deleted with success' })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid Parameters' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
