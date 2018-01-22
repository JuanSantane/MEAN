export class Device {
  id: string;
  name: string;
  type: string;
  desc: string;

  constructor(id: string, name: string, type: string, desc: string) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.desc = desc;
  }
  public isVoid() {
    return this.name == null && this.type == null && this.id == null;
  }
}
