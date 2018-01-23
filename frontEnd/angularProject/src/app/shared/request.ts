export class Request {
  id: string;
  name: String;
  type: String;
  description: String;
  constructor() {
    this.description = null;
    this.name = null;
    this.type = null;
  }
  public isVoid() {
    return( (this.name == null || this.name === '')
            && (this.type == null || this.type === '' )
            && (this.id == null || this.id === '' )
          );
  }
}
