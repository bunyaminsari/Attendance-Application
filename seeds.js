var mongoose = require("mongoose");
var Student = require("./models/student");
var Attendance = require("./models/attendance");


var data = [
    {
        firstname:"Jennifer",
        lastname:"Lawrence",
        rollno:"51",
        class:"5",
        image:"http://farm8.static.flickr.com/7432/16170091928_3e62a8a04a_m.jpg"
    },{
        firstname:"Emma",
        lastname:"Watson",
        rollno:"52",
        class:"5",
        image:"http://farm8.static.flickr.com/7079/27276176216_13d553a0d2_m.jpg"
    },
    {
        firstname:"Jhonny",
        lastname:"Deep",
        rollno:"53",
        class:"5",
        image:"http://farm4.static.flickr.com/3781/33679120996_05c1b924e4_m.jpg"
    },
    {
        firstname:"Rachel",
        lastname:"Green",
        rollno:"61",
        class:"6",
        image:"http://farm5.static.flickr.com/4084/5088600109_7d6304d195_m.jpg"
    },
    {
        firstname:"Pheobe",
        lastname:"Stone",
        rollno:"62",
        class:"6",
        image:"http://farm7.static.flickr.com/6079/6076524095_e6a826ed2a_m.jpg"
    },
    {
        firstname:"Chandler",
        lastname:"Bing",
        rollno:"63",
        class:"6",
        image:"http://farm9.static.flickr.com/8653/16126172393_118469a108_m.jpg"
    },
    {
        firstname:"Joey",
        lastname:"Tribuani",
        rollno:"71",
        class:"7",
        image:"http://farm3.static.flickr.com/2537/4120501170_0d1beb68d2_m.jpg"
    },
    {
        firstname:"Hermoione",
        lastname:"Granger",
        rollno:"72",
        class:"7",
        image:"http://farm6.static.flickr.com/5573/14764344725_51623cb88c_m.jpg"
    },
    {
        firstname:"Harry Potter",
        lastname:"Deep",
        rollno:"73",
        class:"7",
        image:"http://farm4.static.flickr.com/3077/3119659084_38f31f701e_m.jpg"
    }
];

function seedDB() {
    //remove all students
    Student.remove({},function (err) {
        if(err){
            console.log(err);
        // }else{
        //     //put data into database
        //     data.forEach(function (seed) {
        //         //create students from data
        //         Student.create(seed,function (err,student) {
        //            if(err){
        //                console.log(err);
        //            } else{
        //                //create attendance
        //                Attendance.create(
        //                    {
        //                    status:"P",
        //                    remarks:"He was at school on time!"
        //                    }
        //                ,function (err,attendance) {
        //                    if(err){
        //                        console.log(err);
        //                    }else{
        //                        //push attendance and save it
        //                        student.attendances.push(attendance);
        //                        student.save();
        //
        //                    }
        //                });
        //            }
        //         });
        //
        //     });
        }
    });

}


//module seedDB
module.exports = seedDB;