import Product from "../entity/product";
import ProductYupValidator from "../validator/product.yup.validator";
import ValidatorInterface from '../../@shared/validator/validator.interface';
import ProductInterface from "../entity/product-interface";

export default class ProductValidatorFactory {
  static create(): ValidatorInterface<ProductInterface> {
    return new ProductYupValidator();
  }
}