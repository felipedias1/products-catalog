import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Model } from 'mongoose';
import {
  Category,
  CategoryDocument,
} from 'src/categories/entities/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './entities/product.entity';
import { json2csv } from 'json-2-csv';
import * as fs from 'fs';
import jsPDF from 'jspdf';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { nome, categoriaId } = createProductDto;
    const id = new mongoose.Types.ObjectId(categoriaId);
    const isRegistered = await this.productModel.findOne({ nome });
    if (isRegistered) {
      throw new HttpException(
        `Product name already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const isCategoryRegistered = await this.categoryModel.find({
      _id: id,
    });
    if (!isCategoryRegistered) {
      throw new HttpException(
        `Category does not exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
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

  async generateCsv() {
    const products = await this.productModel.find({});

    json2csv(
      products,
      (err, csv) => {
        if (err) {
          throw err;
        }
        fs.writeFileSync('products.csv', csv);
      },
      {
        keys: [
          '_doc._id' as 'id',
          '_doc.nome' as 'nome',
          '_doc.quantidade',
          '_doc.ativo',
          '_doc.categoriaId',
        ],
      },
    );
  }

  async generatePdf() {
    const products = await this.productModel.find({});

    const doc = new jsPDF();
    products.forEach(function (products, i) {
      doc.text(
        '_id: ' +
          products._id +
          '\n' +
          ' quantidade: ' +
          products.quantidade +
          '\n' +
          ' ativo: ' +
          products.ativo +
          '\n' +
          ' categoriaId: \n' +
          products.categoriaId +
          '\n\n\n',
        20,
        20 + i * 40,
      );
    });
    doc.save('products.pdf');
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
