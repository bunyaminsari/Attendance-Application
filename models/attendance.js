var mongoose = require("mongoose");

var attendanceSchema = new mongoose.Schema({
    status:String,
    remarks:String,
    user:
        {
            id:
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"User"
                },
            username:String
        },
    created:{type:Date, default:Date.now}
});

module.exports = mongoose.model("Attendance",attendanceSchema);