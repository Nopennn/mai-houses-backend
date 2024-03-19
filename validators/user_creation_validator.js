let Validator = require('validatorjs');

const fun = (body) => {
    const rule = {
        login: 'required|string|min:2|max:25',
        password: 'required|string|min:2|max:255',
      };
    return new Validator(body, rule).fails()
}

module.exports = {user_creation_validator: fun}