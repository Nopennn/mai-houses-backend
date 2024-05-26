let Validator = require('validatorjs');

const fun = (body) => {
    const rule = {
        login: 'required|string|min:2|max:25',
        password: 'required|string|min:2|max:255',
        email: 'required|email',
        age: 'required|integer|min:0',
        name: 'required|string|min:2|max:255',
        surname: 'required|string|min:2|max:255',
        photo: 'required|string',
        gender: ["required",{ 'in': ["none", "m" , "f"] }],
        about: 'required|string',
        wanted: 'required|string',
        tags: 'required|array',
        
      };
    return new Validator(body, rule).fails()
}

module.exports = {upd_user_validator: fun}