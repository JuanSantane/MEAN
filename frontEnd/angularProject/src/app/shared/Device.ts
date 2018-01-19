export class Device {
  id: String;
  name: String;
  type: String;
  desc: String;

  constructor(id: String, name: String, type: String, desc: String) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.desc = desc;
  }
  public isVoid() {
    return this.name == null && this.type == null && this.id == null;
  }
}
