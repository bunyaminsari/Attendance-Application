var mongoose= require("mongoose");

var studentSchema = new mongoose.Schema({
    firstname:String,
    lastname:String,
    rollno:String,
    class:String,
    image:String,
    user:
        {
          id:
              {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
              },
            username:String
        },
    created:{ type:Date, default:Date.now},
    attendances:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Attendance"
        }
    ],


});

module.exports = mongoose.model("Student",studentSchema);