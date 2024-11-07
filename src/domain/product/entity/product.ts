import Entity from "../../@sahred/entity/entity.abstract";
import NotificationError from "../../notification/notification.error";
import ProductValidatorFactory from "../factory/product.validator.factory";

export default class Product extends Entity {
  private _name: string = "";

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;
    this.validate();
    if(this.notification.hasErrors()){
      throw new NotificationError(this.notification.getErrors())
    }
  }

  get name(): string {
    return this._name;
  }

  validate(){
    ProductValidatorFactory.create().validate(this);
  }
}