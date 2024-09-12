import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductDto } from './list.product.dto';
import Product from '../../../domain/product/entity/product';
import { ListProductUseCase } from './list.product.usecase';

const product1 = new Product("123", "Product A", 100);
const product2 = new Product("124", "Product B", 200);

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit Test list product use case", () => {
    it("should list all products", async () => {
        const productRepository = MockRepository();
        const usecase = new ListProductUseCase(productRepository);

        const input: InputListProductDto = {};

        const output: OutputListProductDto = {
            products: [
                {
                    id: "123",
                    name: "Product A",
                    price: 100,
                },
                {
                    id: "124",
                    name: "Product B",
                    price: 200,
                },
            ],
        };

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });

    it("should return an empty list if no products are found", async () => {
        const productRepository = MockRepository();
        productRepository.findAll.mockReturnValue(Promise.resolve([]));
        const usecase = new ListProductUseCase(productRepository);

        const input: InputListProductDto = {};

        const output: OutputListProductDto = {
            products: [],
        };

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });
});