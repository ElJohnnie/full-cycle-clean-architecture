import * as yup from "yup";
import ValidatorInterface from "../../@shared/validator/validator.interface";
import ProductInterface from "../entity/product-interface";

export default class ProductYupValidator implements ValidatorInterface<ProductInterface> {
  validate(entity: ProductInterface): void {
    const schema = yup.object().shape({
      id: yup.string().required("Id is required"),
      name: yup.string().required("Name is required"),
      price: yup.number().required("Price is required").positive("Price must be greater than zero"),
    });

    try {
      schema.validateSync(
        {
          id: entity.id,
          name: entity.name,
          price: entity.price,
        },
        {
          abortEarly: false,
        }
      );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "products",
          message: error,
        });
      });
    }
  }
}
