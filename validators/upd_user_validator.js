let Validator = require('validatorjs');

const fun = (body) => {
    const rule = {
        login: 'string|min:2|max:25',
        password: 'string|min:2|max:255',
        email: 'email',
        age: 'integer|min:0',
        name: 'string|min:2|max:255',
        surname: 'string|min:2|max:255',
        photo: 'url',
        gender: [{ 'in': ["none", "m" , "f"] }],
        about: 'string|min:0|max:255',
        wanted: 'string|min:0|max:255',
        tags: 'array',
        
      };
    return new Validator(body, rule).fails()
}

module.exports = {upd_user_validator: fun}