import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Test list product use case", () => {
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

    it("should list all products", async () => {
        const productRepository = new ProductRepository();
        const usecase = new ListProductUseCase(productRepository);

        const product1 = new Product("123", "Product A", 100);
        const product2 = new Product("124", "Product B", 200);
        await productRepository.create(product1);
        await productRepository.create(product2);

        const input = {};

        const output = {
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

    it("should return an empty list when there are no products", async () => {
        const productRepository = new ProductRepository();
        const usecase = new ListProductUseCase(productRepository);

        const input = {};

        const output: { products: { id: string; name: string; price: number }[] } = {
            products: [],
        };

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });
});