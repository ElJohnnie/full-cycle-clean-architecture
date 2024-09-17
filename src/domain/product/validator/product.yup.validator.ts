import * as yup from "yup";
import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";

export default class ProductYupValidator implements ValidatorInterface<Product> {
  validate(product: Product): void {
    const schema = yup.object().shape({
      id: yup.string().required("Id is required"),
      name: yup.string().required("Name is required"),
      price: yup.number().required("Price is required").positive("Price must be positive"),
    });

    try {
      schema.validateSync(
        {
          id: product.id,
          name: product.name,
          price: product.price,
        },
        {
          abortEarly: false,
        }
      );
    } catch (errors) {
      const yupErrors = errors as yup.ValidationError;
      yupErrors.errors.forEach((error) => {
        product.notification.addError(error);
      });
    }
  }
}