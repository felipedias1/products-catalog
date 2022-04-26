import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = new this.productModel(createProductDto);
    return product.save();
  }

  findAll() {
    return this.productModel.find();
  }

  async findOne(id: string) {
    const ObjectId = mongoose.Types.ObjectId;
    if (!ObjectId.isValid(id)) {
      throw new HttpException(
        `Product ID ${id} is not valid`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const product = await this.productModel.findById({ _id: id });
    if (!product) {
      throw new HttpException(
        `Product ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const ObjectId = mongoose.Types.ObjectId;
    if (!ObjectId.isValid(id)) {
      throw new HttpException(
        `Product ID ${id} is not valid`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const product = this.productModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateProductDto,
      },
      {
        new: true,
      },
    );
    if (!product) {
      throw new HttpException(
        `Product ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return { message: 'Produto Cadastrado com sucesso!' };
  }

  async remove(id: string) {
    const ObjectId = mongoose.Types.ObjectId;
    if (!ObjectId.isValid(id)) {
      throw new HttpException(
        `Product ID ${id} is not valid`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const product = await this.productModel
      .remove({
        _id: id,
      })
      .exec();
    if (!product) {
      throw new HttpException(
        `Product ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return product;
  }
}
