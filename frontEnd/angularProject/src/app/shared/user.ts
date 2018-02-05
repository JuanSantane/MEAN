export class User {
    _id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
  
    constructor(_id: string, name: string, surname: string, email: string, password: string) {
      this._id = _id;
      this.name = name;
      this.surname = surname;
      this.email = email;
      this.password = password;
    }
    public isVoid() {
      return this.name == null && this.surname == null && this._id == null && this.email == null;
    }
  }
  