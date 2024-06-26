const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    firstName: {
        type: String,
        required: [true, 'firstname is required']
    },
    lastName: {
        type: String,
        required: [true, 'lastname is required']
    },
    phone: {
        type: String,
        required: [true, 'phone is required']
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    website: {
        type: String,
    },
    address: {
        type: String,
        required: [true, 'address is required']
    },
    specialization: {
        type: String,
        required: [true, 'specialization is require']
    },
    experience: {
        type: String,
        required: [true, 'experience is required']
    },
    feesPerConsaltation: {
        type: Number,
        required: [true, 'fee is required']
    },
    status: {
        type: String,
        default: "pending"
    },
    timings: {
        type: Object,
        required: [true, 'work is required']
    }
}, { timestamps: true });
const doctorModel = mongoose.model("doctors", doctorSchema);

module.exports = doctorModel;
