import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUsecase from "./update.product.usecase";
import { InputUpdateProductDto } from "./update.product.dto";
import { InputCreateProductDto } from '../create/create.product.dto';
import CreateProductUseCase from "../create/create.product.usecase";

describe("Test update product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const createProductUsecase = new CreateProductUseCase(productRepository);

        const createInput: InputCreateProductDto = {
            type: "a",
            name: "Product A",
            price: 100,
        };

        const createdProduct = await createProductUsecase.execute(createInput);

        const updateInput: InputUpdateProductDto = {
            id: createdProduct.id,
            name: "Product B",
            price: 150,
        };

        const updateProductUsecase = new UpdateProductUsecase(productRepository);
        const result = await updateProductUsecase.execute(updateInput);

        expect(result).toEqual({
            id: createdProduct.id,
            name: "Product B",
            price: 150,
        });

        const product = await productRepository.find(result.id);
        expect(product).toEqual({
            _id: result.id,
            _name: "Product B",
            _price: 150,
        });
    });

    it("should throw an error when updating a non-existent product", async () => {
        const productRepository = new ProductRepository();
        const updateProductUsecase = new UpdateProductUsecase(productRepository);

        const updateInput: InputUpdateProductDto = {
            id: "213123",
            name: "Product B",
            price: 150,
        };

        await expect(updateProductUsecase.execute(updateInput)).rejects.toThrow(Error);
    });
});