const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')
const validator = require('../validation/validator')


const createCollege = async function(req, res) {
    try {
        const collegeBody = req.body;
        if(!validator.isValidRequestBody(collegeBody)) {
            return res.status(400).send({ status: false, msg: 'Please provide college details'})
        }

        let { name , fullName , logoLink , isDeleted } = collegeBody;

        if (!validator.isValid(name)) {
            return res.status(400).send({ status:false, msg: 'name is required'})
        }
        
        if (!validator.isValid(fullName)) {
            return res.status(400).send({ status:false, msg: 'fullName is required'})
        }
        
        if(!validator.isValid(logoLink)) {
            return res.status(400).send({ status:false, msg: 'logoLink is required'})
            
        }

        if((/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.\+#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%\+.#?&//=]*)/.test(collegeBody.logoLink))) {
            
        }
        else 
            return res.status(400).send({ status:false, msg: 'Not a valid logoLink'})

        let duplicateName  = await collegeModel.findOne({name: collegeBody.name})
        if(duplicateName) {
            return res.status(400).send({ status:false, msg: 'name already exists'})
        }

        const reqData = { name, fullName, logoLink, isDeleted }
        let collegeCreated = await collegeModel.create(reqData)
        res.status(201).send({ status:true, output: collegeCreated })
    }
    catch(err) {
        res.status(500).send({ status:false, msg:err.message })
        console.log(err)
    }
}


const internList = async function (req, res) {
    try {
        let collegeName = req.query.collegeName;
        
        if (!collegeName) {
           return res.status(400).send({ status: false, msg: 'CollegeName is required' })
        }

        let collegeDetail = await collegeModel.findOne({ name: collegeName , isDeleted: false })

        if (!collegeDetail) {
            return res.status(400).send({ status: false, msg: 'college name doesnt exist' })
        }

        let internDetail = await internModel.find({ collegeId: collegeDetail._id, isDeleted: false }).select({ _id: 1, name: 1, email: 1, mobile: 1 })

        let getAllInterns = {
            name: collegeDetail.name,
            fullName: collegeDetail.fullName,
            logoLink: collegeDetail.logoLink,
            interns: internDetail
        }
         
        if (internDetail.length === 0) {
            return res.status(200).send({ status: true, getAllInterns, msg: 'No such Intern' })
        }
        else {
            res.status(200).send({status: true, data: getAllInterns})
        }
    } 
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports.createCollege = createCollege;
module.exports.internList = internList;