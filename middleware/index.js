var Student = require("../models/student");
var Attendance  = require("../models/attendance");
var middlewareObj = {};



//To prevent unauthorized access to students
middlewareObj.checkStudentsOwnership = function (req,res,next) {
    if(req.isAuthenticated()){
        Student.findById(req.params.id,function (err,foundStudent) {
            if(err){
                res.redirect("/students");
            }else{
                //does user have student?
                if(foundStudent.user.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","You do not have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    }
    req.flash("warning","You need to login before you can do that!");
}


//To prevent unauthorized access to attendances

middlewareObj.checkAttendanceOwnership = function (req,res,next) {
    if(req.isAuthenticated()){
        Attendance.findById(req.params.attendance_id,function (err,foundAttendance) {
            if(err){
                res.redirect("back");
            } else{
                //do the user has a attendance?
                if(foundAttendance.user.id.equals(req.user._id)){
                    next();
                } else{
                    req.flash("error","You do not have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    }
}

//Prevent unauthorized users -middleware
middlewareObj.isLoggedIn = function (req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("warning","You need to login before you can do that!");
    res.redirect("/login");
}


module.exports = middlewareObj;