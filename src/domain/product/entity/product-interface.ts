import Notification from "../../@shared/notification/notification";

export default interface ProductInterface {
    id: string;
    name: string;
    price: number;
    notification: Notification;
    validate(): void;
  }
  