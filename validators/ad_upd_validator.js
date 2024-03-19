let Validator = require('validatorjs');

const fun = (body) => {
    const rule = {
        price: 'integer|min:0',
        adress: 'string|min:2|max:255',
        photo_links: 'array',
        about: 'string|min:0|max:255',
        tags: 'array',
        
      };
    return new Validator(body, rule).fails()
}

module.exports = {ad_upd_validator: fun}