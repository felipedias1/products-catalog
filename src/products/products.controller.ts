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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProduct } from './swagger/createProduct';
import { FindAllProduct } from './swagger/findAllProduct';
import { FindProductById } from './swagger/findById';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create new Product' })
  @ApiResponse({
    status: 201,
    description: 'New product created with success',
    type: CreateProduct,
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid Parameters' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'Products found',
    type: FindAllProduct,
    isArray: true,
  })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Generate CSV file with all products' })
  @ApiResponse({ status: 200, description: 'CSV file generated with success' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Get('csv')
  exportCsv() {
    return this.productsService.generateCsv();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Generate PDF file with all products' })
  @ApiResponse({
    status: 200,
    description: 'PDF file generated with success',
  })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Get('pdf')
  exportPdf() {
    return this.productsService.generatePdf();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get specific product by ID' })
  @ApiResponse({
    status: 200,
    description: 'Product found',
    type: FindProductById,
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid Parameters' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update specific product by ID' })
  @ApiResponse({ status: 204, description: 'Product updated with success' })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid Parameters' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete specific product by ID' })
  @ApiResponse({ status: 204, description: 'Product deleted with success' })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid Parameters' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
