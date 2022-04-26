import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './entities/category.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    const category = new this.categoryModel(createCategoryDto);
    return category.save();
  }

  findAll() {
    return this.categoryModel.find();
  }

  findOne(id: string) {
    return this.categoryModel.findById(id);
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryModel.findByIdAndUpdate(
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
  }

  remove(id: string) {
    return this.categoryModel
      .remove({
        _id: id,
      })
      .exec();
  }
}
