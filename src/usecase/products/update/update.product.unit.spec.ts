import { InputUpdateProductDto, OutputUpdateProductDto } from './update.product.dto';
import UpdateProductUsecase from './update.product.usecase';
import Product from '../../../domain/product/entity/product';

const product = new Product("123", "Product A", 100);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit Test update product use case", () => {
    it("should update a product", async () => {
        const productRepository = MockRepository();
        const usecase = new UpdateProductUsecase(productRepository);

        const input: InputUpdateProductDto = {
            id: "123",
            name: "Product B",
            price: 150,
        };

        const output: OutputUpdateProductDto = {
            id: "123",
            name: "Product B",
            price: 150,
        };

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
        expect(productRepository.find).toHaveBeenCalledWith("123");
        expect(productRepository.update).toHaveBeenCalledWith(expect.objectContaining({
            id: "123",
            name: "Product B",
            price: 150,
        }));
    });

    it("should throw an error if product is not found", async () => {
        const productRepository = MockRepository();
        productRepository.find.mockReturnValue(Promise.resolve(null));
        const usecase = new UpdateProductUsecase(productRepository);

        const input: InputUpdateProductDto = {
            id: "123",
            name: "Product B",
            price: 150,
        };

        await expect(usecase.execute(input)).rejects.toThrow("Product not found");
    });
});