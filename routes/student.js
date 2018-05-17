var express = require("express"),
    router  = express.Router({mergeParams:true}),
    Student = require("../models/student"),
    middlewareObj = require("../middleware");

//INDEX ROUTE
router.get("/",middlewareObj.isLoggedIn,function (req,res) {

    Student.find({},function (err,students) {
        if(err){
            console.log(err);
        } else{
            res.render("student/index",{students:students,currentUser:req.user});
        }
    });
});

// NEW ROUTE
router.get("/new",middlewareObj.isLoggedIn,function (req,res) {
    res.render("student/new");
});

//CREATE ROUTE
router.post("/",middlewareObj.isLoggedIn,function (req,res) {
        var firstname  = req.body.firstname;
        var lastname = req.body.lastname;
        var rollno  = req.body.rollno;
        var sclass = req.body.class;
        var image = req.body.image;
        var user = {
            id: req.user._id,
            username: req.user.username
        };
        var newStudent = {firstname:firstname,lastname:lastname,rollno:rollno,class:sclass,user:user,image:image};
        Student.create(newStudent,function (err,newStudent) {
        if(err){
            res.render("student/new");
        } else{
            req.flash("success","Student record created!");
            res.redirect("/students");
        }
    });
});

// SHOW ROUTE
router.get("/:id",function (req,res) {
    Student.findById(req.params.id).populate("attendances").exec(function (err,foundStudent) {
        if(err){
            res.redirect("/students");
        } else{
            res.render("student/show",{student:foundStudent});
        }
    });
});

// EDIT ROUTE
router.get("/:id/edit",middlewareObj.checkStudentsOwnership,function (req,res) {
    Student.findById(req.params.id,function (err,foundStudent) {
        if(err){
            res.redirect("/students");
        }else{
            res.render("student/edit",{student:foundStudent});
        }
    });
});

// UPDATE ROUTE
router.put("/:id",middlewareObj.checkStudentsOwnership,function (req,res) {
    Student.findByIdAndUpdate(req.params.id, req.body.student ,function(err,updatedStudent) {
        if(err){
            res.redirect("/students");
        }else{
            res.redirect("/students/" + req.params.id);
        }
    });
});

// DELETE ROUTE
router.delete("/:id",middlewareObj.checkStudentsOwnership,function (req,res) {
    Student.findByIdAndRemove(req.params.id,function (err) {
        if(err){
            res.redirect("/students");
        }else {
                res.redirect("/students");
        }
    }) ;
});

module.exports = router;