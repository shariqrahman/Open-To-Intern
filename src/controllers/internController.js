const internModel = require('../models/internModel')
const collegeModel = require('../models/collegeModel')
const validator = require('../validation/validator')



const createIntern = async function (req, res) {
    try {

        const requestBody = req.body;

        if (!validator.isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'Please provide intern details' })
        }

        let { isDeleted, name, email, mobile, collegeName  } = requestBody; 

        if (!validator.isValid(name)) {
            return res.status(400).send({ status: false, message: 'name is required' })
        }
        
        if (!validator.isValid(mobile)) {
            return res.status(400).send({ status: false, message: 'mobile no is required' })
        }
        
        if (!(/^([+]\d{2})?\d{10}$/.test(requestBody.mobile))) {
            return res.status(400).send({ status: false, message: 'please provide a valid moblie Number' })
        }

        if (!validator.isValid(email)) {
            return res.status(400).send({ status: false, message: 'Email is required' })
        }

        if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(requestBody.email))) {
            return res.status(400).send({ status: false, message: 'Please provide a valid email' })
        }
        

        let duplicateEmail  = await internModel.findOne({email:requestBody.email})
        if(duplicateEmail){
            return res.status(400).send({ status:false, message: 'email already exists'})
        }

        if (!validator.isValid(collegeName)) {
            return res.status(400).send({ status: false, message: 'collegeName is required' })
        }
        
        const college = await collegeModel.findOne({ name: collegeName, isDeleted: false });
        if (!college) {
            return res.status(400).send({ status: false, message: 'college  does not exit or deleted' })
        }

       let collegeId = college._id;
      
        const savedInternData = { name, email, mobile, collegeId, isDeleted }
        const createIntern = await internModel.create(savedInternData);
        res.status(201).send({ status: true, message: 'intern is enrolled successfully', data: createIntern })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

module.exports.createIntern = createIntern;