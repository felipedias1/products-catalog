import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategory } from './swagger/createCategory';
import { ErrorCategory } from './swagger/errorCategory';
import { ExportCategoryFiles } from './swagger/exportsCategoryFiles';
import { FindAllCategory } from './swagger/findAllCategories';
import { FindCategorytById } from './swagger/findCategoryById';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create new category' })
  @ApiResponse({
    status: 201,
    description: 'New category created with success',
    type: CreateCategory,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid Parameters',
    type: ErrorCategory,
  })
  @ApiResponse({ status: 404, description: 'Not Found', type: ErrorCategory })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all categories registered' })
  @ApiResponse({
    status: 200,
    description: 'Categories found',
    type: FindAllCategory,
  })
  @ApiResponse({ status: 404, description: 'Not Found', type: ErrorCategory })
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Generate PDF file with all Categories' })
  @ApiResponse({
    status: 200,
    description: 'PDF file generated with success',
    type: ExportCategoryFiles,
  })
  @ApiResponse({ status: 404, description: 'Not Found', type: ErrorCategory })
  @Get('pdf')
  exportPdf() {
    return this.categoriesService.generatePdf();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get specific category by ID' })
  @ApiResponse({
    status: 200,
    description: 'Category found',
    type: FindCategorytById,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid Parameters',
    type: ErrorCategory,
  })
  @ApiResponse({ status: 404, description: 'Not Found', type: ErrorCategory })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update specific category by ID' })
  @ApiResponse({ status: 204, description: 'Category updated with success' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid Parameters',
    type: ErrorCategory,
  })
  @ApiResponse({ status: 404, description: 'Not Found', type: ErrorCategory })
  @Patch(':id')
  @HttpCode(204)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete specific category by ID' })
  @ApiResponse({ status: 204, description: 'Category deleted with success' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid Parameters',
    type: ErrorCategory,
  })
  @ApiResponse({ status: 404, description: 'Not Found', type: ErrorCategory })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
