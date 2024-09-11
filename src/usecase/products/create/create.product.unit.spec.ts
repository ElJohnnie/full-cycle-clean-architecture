import CreateProductUseCase from "./create.product.usecase";

const input = {
  name: "Teste",
  price: 500,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should call repository with correct params", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute({ ...input, type : 'a' });

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });


  it("should throw an error if product type is invalid", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    await expect(productCreateUseCase.execute({ ...input, type: 'invalid' })).rejects.toThrowError('Product type not supported');
  });

});
