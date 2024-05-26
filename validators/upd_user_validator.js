let Validator = require('validatorjs');

const fun = (body) => {
    const rule = {
      login: 'required|string|min:2|max:25',
      password: 'required|string|min:2|max:255',
      name: 'required|string',
      surname: 'required|string',
      photo: 'required|string',
      email: 'required|string|email',
      phone: 'required|string',
      age: 'required|integer',
      gender: ["required", { 'in': ["none", "m" , "f"] }],
      about: 'required|string',
      wanted: 'required|string',
      tags: 'required|array',
      };
    return new Validator(body, rule).fails()
}

module.exports = {upd_user_validator: fun}