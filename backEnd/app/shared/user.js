function User(name, nickname, email) {
    this.name = name;
    this.nickname = nickname;
    this.email = email;
  }
  
  User.prototype.isVoid = () => {
      return (
          this.name == null | ''
          && this.nickname == null | ''
          && this.email == null | ''
      );
  }
  
  
  module.exports = User;