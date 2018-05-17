var express = require("express"),
    router = express.Router({mergeParams:true}),
    Student = require("../models/student"),
    Attendance = require("../models/attendance"),
    middlewareObj = require("../middleware");


//NEW ATTENDANCE ROUTE
router.get("/new",middlewareObj.isLoggedIn,function (req,res) {
    Student.findById(req.params.id,function (err,student) {
        if(err){
            console.log();
        }else{
            res.render("attendance/new",{student:student});

        }
    });
});

//CREATE ATTENDANCE ROUTE
router.post("/",middlewareObj.isLoggedIn,function (req,res) {
    Student.findById(req.params.id,function (err,student) {
        if(err){
            console.log(err);
            res.redirect("/students");
        }
        else
        {
            Attendance.create(req.body.attendance,function (err,attendance) {
                if(err){
                    console.log(err);
                } else{
                    //add id and the username of the user
                    attendance.user.id = req.user._id;
                    attendance.user.username = req.user.username;
                    attendance.save();
                    //save the attendance
                    student.attendances.push(attendance);
                    student.save();
                    res.redirect("/students/" + student._id);
                }
            });
        }
    });
});

//EDIT ROUTE
router.get("/:attendance_id/edit",middlewareObj.checkAttendanceOwnership,function (req,res) {
    Attendance.findById(req.params.attendance_id,function (err,foundAttendance) {
       if(err){
           res.redirect("back");
       } else{
           res.render("attendance/edit",{student_id:req.params.id,attendance:foundAttendance});
       }
    });
});

//UPDATE ROUTE
router.put("/:attendance_id",middlewareObj.checkAttendanceOwnership,function (req,res) {
   Attendance.findByIdAndUpdate(req.params.attendance_id,req.body.attendance,function (err,updatedAttendance) {
      if (err){
          res.redirect("back");
      }else{
          res.redirect("/students/" + req.params.id);
      }
   });
});

//DESTROY ROUTE
router.delete("/:attendance_id",middlewareObj.checkAttendanceOwnership,function (req,res) {
   Attendance.findByIdAndRemove(req.params.attendance_id,function (err) {
       if(err){
           res.redirect("back");
       }else{
           res.redirect("/students/" + req.params.id);
       }
   })
});

module.exports = router;
