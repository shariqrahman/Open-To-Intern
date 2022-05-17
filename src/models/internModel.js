const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const internSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
    },
    email: {
        type : String,
        trim : true,
        unique: true,
        required : true,
        lowercase : true,
        match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    mobile: {
        type: String,
        required: true,
        minlength: 10,
        unique: true,
    },
    collegeId: {
        type: ObjectId,
        ref: 'College',
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },

},)

module.exports = mongoose.model('Intern', internSchema)