var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user");


//shows home page
router.get("/",function(req,res){
    res.render("home");
});

//to show register form
router.get("/register",function (req,res) {
    res.render("register");
});

// to handle registration logic
router.post("/register",function (req,res) {
    var newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password,function (err,user) {
        if(err){
            req.flash("error",err.message);
            return res.redirect("/register");
        }
            passport.authenticate("local")(req,res,function () {
                req.flash("success","Welcome to Attendance App " + user.username);
                res.redirect("/students");
            });
    });
});

//to show log in form
router.get("/login",function (req,res) {
    res.render("login");
});

//to handle log in logic
router.post("/login",passport.authenticate("local",{
    successRedirect:"/students",
    failureRedirect:"/login"
}),function (req,res) {
});

//to handle logout logic
router.get("/logout",function (req,res) {
    req.logout();
    req.flash("success","You logged out!");
    res.redirect("/");
});

module.exports = router;