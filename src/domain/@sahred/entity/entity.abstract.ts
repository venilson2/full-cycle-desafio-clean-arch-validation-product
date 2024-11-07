import Notification from "../../notification/notification";
import { v4 as uuid } from 'uuid'

export default abstract class Entity {
  protected _id: string = uuid();
  public notification: Notification;

  constructor() {
    this.notification = new Notification();
  }

  get id(): string {
    return this._id;
  }
}