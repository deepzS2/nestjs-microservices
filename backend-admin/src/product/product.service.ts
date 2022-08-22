import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAll(): Promise<Array<Product>> {
    return await this.productRepository.find();
  }

  async create(data: Pick<Product, 'image' | 'title'>): Promise<Product> {
    return await this.productRepository.save(data);
  }

  async getById(id: number): Promise<Product> {
    return await this.productRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    data: Partial<Omit<Product, 'id'>>,
  ): Promise<UpdateResult> {
    return await this.productRepository.update(id, data);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.productRepository.delete(id);
  }
}
