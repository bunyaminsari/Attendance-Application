var bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose"),
    express = require("express"),
    expressSanitizer = require("express-sanitizer"),
    app = express(),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    flash = require("connect-flash"),
    Student = require("./models/student"),
    Attendance = require("./models/attendance"),
    User = require("./models/user");
    // seedDB = require("./seeds");

//Routes
var indexRoutes = require("./routes/index"),
    studentRoutes = require("./routes/student"),
    attendanceRoutes = require("./routes/attendance");

//APP CONFIG
var url = process.env.DATABASEURL || "mongodb://localhost/results_deploy";
mongoose.connect(url);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(expressSanitizer());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());

// seedDB(); //seeds the database

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret:"This is a key for Result Card App!",//you can write anything here
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//to pass currentUser to all imgConfig
app.use(function (req,res,next) {
    res.locals.currentUser = req.user;
    res.locals.warning = req.flash("warning");
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/",indexRoutes);
app.use("/students",studentRoutes);
app.use("/students/:id/attendances",attendanceRoutes);

//==================================================
app.get("*",function (req,res) {
    res.send("Sorry,Page is not found!");
});

app.listen(process.env.PORT || 3000,function () {
    console.log("Server started!");
});
