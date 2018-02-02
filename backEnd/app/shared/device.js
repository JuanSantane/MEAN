
function Device(name, type, desc) {
  this.name = name;
  this.type = type;
  this.desc = desc;
}

Device.prototype.isVoid = () => {
    return (
        this.name == null | ''
        && this.type == null | ''
        && this.desc == null | ''
    );
}


module.exports = Device;
