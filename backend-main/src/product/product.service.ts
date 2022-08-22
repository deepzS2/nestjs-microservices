import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product, ProductDocument } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async getAll(): Promise<Array<Product>> {
    return await this.productModel.find().exec();
  }

  async create(data: Product): Promise<Product> {
    return new this.productModel(data).save();
  }

  async findById(id: number): Promise<Product> {
    return await this.productModel.findOne({ id });
  }

  async update(id: number, data: Partial<Product>): Promise<Product> {
    return await this.productModel.findOneAndUpdate({ id }, data);
  }

  async delete(id: number): Promise<void> {
    await this.productModel.deleteOne({ id });
  }
}
