export class Request {
  name: String;
  type: String;
  description: String;
  constructor() {
    this.description = null;
    this.name = null;
    this.type = null;
  }
  public isVoid() {
    return this.name == null && this.type == null;
  }
}
