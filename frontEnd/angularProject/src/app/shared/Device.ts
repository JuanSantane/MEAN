export class Device {
  _id: string;
  name: string;
  type: string;
  desc: string;

  constructor(_id: string, name: string, type: string, desc: string) {
    this._id = _id;
    this.name = name;
    this.type = type;
    this.desc = desc;
  }
  public isVoid() {
    return this.name == null && this.type == null && this._id == null;
  }
}
