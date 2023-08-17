
const bcryptjs=require('bcryptjs');
const salt=bcryptjs.genSaltSync(10);

// bcryptjs.hashSync

exports.hash=(password)=>{    return bcryptjs.hashSync(password,salt);}
// bcryptjs.compare
exports.bcrypt = (password,oldPassword)=>{return bcryptjs.compare(password,oldPassword)}
