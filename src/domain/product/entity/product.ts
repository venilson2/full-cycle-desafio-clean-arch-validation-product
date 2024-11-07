import Entity from "../../@sahred/entity/entity.abstract";
import NotificationError from "../../notification/notification.error";

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
    if(this._id.length === 0){
      this.notification.addError({context: "product", message: "Id is required"})
    }
    if(this._name.length === 0){
      this.notification.addError({context: "product", message: "Name is required"})
    }
  }
}