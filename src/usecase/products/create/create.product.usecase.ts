import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import ProductFactory from '../../../domain/product/factory/product.factory';
import { InputCreateProductDto, OutputCreateProductDto } from './create.product.dto';
import Product from '../../../domain/product/entity/product';

export default class CreateProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = ProductFactory.create(
      input.type,
      input.name,
      input.price
    ) as Product;

    console.log(product);

    await this.productRepository.create(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
