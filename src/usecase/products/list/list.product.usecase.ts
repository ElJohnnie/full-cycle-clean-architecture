import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductDto } from './list.product.dto';
import Product from '../../../domain/product/entity/product';

export class ListProductUseCase {
    private productRespository: ProductRepositoryInterface;
    constructor(productRespository: ProductRepositoryInterface) {
        this.productRespository = productRespository;
      }

    async execute({}: InputListProductDto): Promise<OutputListProductDto> {
        const products = await this.productRespository.findAll();
        return OutputMapper.toOutput(products);
    }
}

class OutputMapper {
    static toOutput(products: Product[]): OutputListProductDto {
        return {
            products: products.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price
            }))
        }
    }
}