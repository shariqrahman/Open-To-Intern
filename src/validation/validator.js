const isValid = function (value) {
    if (typeof value == 'undefined' || value == null || typeof value == 'string' && value.length === 0) return false
    return true;
}

const isValidRequestBody = function (value) {
     return Object.keys(value).length > 0
}


module.exports.isValid = isValid;
module.exports.isValidRequestBody = isValidRequestBody;