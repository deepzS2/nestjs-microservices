import { HttpService } from '@nestjs/axios';
import { Controller, Get, Param, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { Product } from './product.model';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly httpService: HttpService,
  ) {}

  @Get()
  async getAll() {
    return await this.productService.getAll();
  }

  @Post(':id/like')
  async like(@Param('id') id: number) {
    const product = await this.productService.findById(id);

    this.httpService
      .post(`http://localhost:3000/api/product/${id}/like`, {})
      .subscribe((res) => {
        console.log(res);
      });

    product.likes++;

    return await this.productService.update(id, product);
  }

  @EventPattern('product_created')
  async productCreated(product: Product) {
    await this.productService.create(product);
  }

  @EventPattern('product_updated')
  async productUpdated(product: Product) {
    await this.productService.update(product.id, product);
  }

  @EventPattern('product_deleted')
  async productDeleted(id: number) {
    await this.productService.delete(id);
  }
}
