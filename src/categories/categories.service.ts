import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './entities/category.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import jsPDF from 'jspdf';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const isRegistered = await this.categoryModel.findOne({
      nome: createCategoryDto.nome,
    });
    if (isRegistered) {
      throw new HttpException(
        `Category name already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const category = new this.categoryModel(createCategoryDto);
    return category.save();
  }

  findAll() {
    return this.categoryModel.find();
  }

  async findOne(id: string) {
    const ObjectId = mongoose.Types.ObjectId;
    if (!ObjectId.isValid(id)) {
      throw new HttpException(
        `Category ID ${id} is not valid`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const category = await this.categoryModel.findById({ _id: id });
    if (!category) {
      throw new HttpException(
        `Category ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return category;
  }

  async generatePdf() {
    const categories = await this.categoryModel.find({});

    const doc = new jsPDF();
    categories.forEach(function (categories, i) {
      doc.text(
        '_id: ' +
          categories._id +
          '\n' +
          ' nome: ' +
          categories.nome +
          '\n' +
          ' ativo: ' +
          categories.ativo +
          '\n\n\n',
        20,
        20 + i * 30,
      );
    });
    doc.save('categories.pdf');
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const ObjectId = mongoose.Types.ObjectId;
    if (!ObjectId.isValid(id)) {
      throw new HttpException(
        `Category ID ${id} is not valid`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const category = await this.categoryModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateCategoryDto,
      },
      {
        new: true,
      },
    );
    if (!category) {
      throw new HttpException(
        `Category ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: string) {
    const ObjectId = mongoose.Types.ObjectId;
    if (!ObjectId.isValid(id)) {
      throw new HttpException(
        `Category ID ${id} is not valid`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const category = await this.categoryModel
      .remove({
        _id: id,
      })
      .exec();
    if (!category) {
      throw new HttpException(
        `Category ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
