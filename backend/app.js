var express = require("express");
var app = express();
var dbcon = require("./dbcon/db");
var user = require("./model/userHandler");
var feature = require("./model/featureHandler");
var dbconn = require("./dbcon/db");
bodyParser = require('body-parser');
let HttpResponse =  require("./model/util");
let ResponseHandler =  require("./model/response");
const jwt = require('jsonwebtoken');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const SECRET_KEY = "xyz123";

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    console.log(req.headers);
    if (!token) {
        return res.status(401).json({
            status: "failure",
            code: 401,
            message: "Access denied. No token provided."
        });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; 
        next(); 
    } catch (err) {
        console.log(err);
        res.status(401).json({
            status: "failure",
            code: 401,
            message: "Invalid or expired token."
        });
    }
};


let response = {
    status:"success",
    code: 200,
    data:"",
    message:"",
    response:""
}



app.get("/test",verifyToken,(req,res) => {

    res.send("sddsf");
    //return HttpResponse(res, ResponseHandler.invalid('test 123'));
})


const verifyParameters = (req, res, next) => 
{
       validRegEx = /^[^\\\/&]*$/;
       let doctorId = !isNaN(req.body.doctorId)?true:false;
       let patientId = !isNaN(req.body.patientId)?true:false;
       let  = req.body.slot_time.match(validRegEx)?true:false;
       if(!doctorId || !patientId || !patientId)
       {
        return res.status(401).json({
            status: "failure",
            code: 401,
            message: "Access denied. No token provided."
             });
       }  
       else
    {
        next();
    }   


}

app.get("/health-topics", (req, res, next) => 
{  
    try
    {
    let sql = "select id,title,description from hosp_feature";
    dbconn.query(sql,(err,rows) =>
    {
        console.log(err);
             if(err)
            {

                response.status = "failure";
                response.code = 10001;
                response.message = "No data found!"
                res.send(response);
            }
            else
            {
              
                response.status = "success";
                response.code = 200;
                response.data = rows;
                response.message = "feature list"
                res.send(response);
            }
 
        });
    }
    catch
    {
        response.status = "failure";
        response.code = 1000;
        response.message = "Sorry something went wrong!!"
        res.send(response);
    }
});


app.get("/user-type", (req, res, next) => 
{   
    try
    {
        let sql = "select id,name from user_type";
        dbconn.query(sql,(err,rows) =>
        {
                 if(err)
                {
    
                    response.status = "failure";
                    response.code = 10001;
                    response.message = "No data found!"
                    res.send(response);
                }
                else
                {
                  
                    response.status = "success";
                    response.code = 200;
                    response.data = rows;
                    response.message = "user type list"
                    res.send(response);
                }
     
        });
    }
    catch
    {
        response.status = "failure";
        response.code = 1000;
        response.message = "Sorry something went wrong!!"
        res.send(response);
    }
});


    app.get("/appointment-details", (req, res, next) => 
    {   
        try{
            let doctor_id = req.query.doctorId;
            let count = req.query.count;
            let sql = `SELECT ad.id,ad.slot_time,ad.appointment_date,ad.reason,ad.create_date, u.name as 'doctor_name', (SELECT name FROM user WHERE id=ad.patient_user_id) as 'patient_name' FROM appointment_details ad INNER join user u on u.id = ad.doctor_user_id where ad.doctor_user_id= ${doctor_id} and appointment_completed=0 order by id asc limit 0,${count}`;
            dbconn.query(sql,(err,rows) =>
            {
                if(err)
                    {
        
                        response.status = "failure";
                        response.code = 10001;
                        response.message = "No data found!"
                        res.send(response);
                    }
                    else
                    {
                      
                        response.status = "success";
                        response.code = 200;
                        response.data = rows;
                        response.message = "doctor list"
                        res.send(response);
                    }
         
         
            });
        }
        catch
        {
            response.status = "failure";
            response.code = 1000;
            response.message = "Sorry something went wrong!!"
            res.send(response);
        }
});
    
    
app.get("/history", (req, res, next) => 
{
    try{   
        let doctor_id = req.query.doctorId;
        let count = req.query.count;
        let sql = `SELECT ad.id,ad.slot_time,ad.appointment_date,ad.reason,ad.create_date, u.name as 'doctor_name', (SELECT name FROM user WHERE id=ad.patient_user_id) as 'patient_name' FROM appointment_details ad INNER join user u on u.id = ad.doctor_user_id where ad.doctor_user_id= ${doctor_id} and appointment_completed=1 order by id desc limit 0,${count}`;
        
        
        dbconn.query(sql,(err,rows) =>
        {
            if(err)
                {
    
                    response.status = "failure";
                    response.code = 10001;
                    response.message = "No data found!"
                    res.send(response);
                }
                else
                {
                  
                    response.status = "success";
                    response.code = 200;
                    response.data = rows;
                    response.message = "doctor list"
                    res.send(response);
                }
        });
    }
    catch
    {
        response.status = "failure";
        response.code = 1000;
        response.message = "Sorry something went wrong!!"
        res.send(response);
    }
});

    

app.get("/doctors", (req, res, next) => 
{
    try
    { 

        let sql = "select id,name,title from user where user_type=1";
        dbconn.query(sql,(err,rows) =>
        {
            if(err)
                {
    
                    response.status = "failure";
                    response.code = 10001;
                    response.message = "No data found!"
                    res.send(response);
                }
                else
                {
                  
                    response.status = "success";
                    response.code = 200;
                    response.data = rows;
                    response.message = "doctor list"
                    res.send(response);
                }
     
     
        });
    }
    catch
    {
        response.status = "failure";
        response.code = 1000;
        response.message = "Sorry something went wrong!!"
        res.send(response);
    }
});

app.post("/login",(req,res,next) =>
{
    try{

    
    let user_email = req.body.email;
    let user_password = req.body.password;
    let sql = `select id,title,name,email,user_type from user where email = '${user_email}' and password = password('${user_password}')`;
    dbconn.query(sql,(err,rows) =>
    {
        if(err) throw err;

       
        if(rows.length>0)
        {
            const token = jwt.sign({ user_email }, SECRET_KEY, { expiresIn: "1h" });
            response.status = "success";
            response.code = 200;
            response.data = rows;
            response.message = "login succussful";
            response.token = token;
          
            res.send(response);
        }
        else
        {
            response.status = "failure";
            response.code = 10001;
            response.message = "No user found!"
            res.send(response);
        }
 
    });
}
catch
{
    response.status = "failure";
    response.code = 1000;
    response.message = "Sorry something went wrong!!"
    res.send(response);
}
});

app.post("/appointments",verifyParameters,(req,res,next) =>
    {
        try{
    
        
        let doctor_id = req.body.doctorId;
        let patient_id = req.body.patientId;
        let date = req.body.appointmentDate;
        let slot_time = req.body.slotTime;
        let reason = req.body.reason;
        let sql = `insert into appointment_details (doctor_user_id, patient_user_id,slot_time,appointment_date,reason) 
        values(${doctor_id},${patient_id},'${slot_time}','${date}','${reason}')`;
        console.log(sql);
        dbconn.query(sql,(err) =>
        {
            if(err)
            {
                response.status = "failure";
                response.code = 10001;
                response.data = "";
                response.message = "Sorry something went wrong"
                res.send(response);
               
            }
            else
            {
                response.status = "success";
                response.code = 200;
                response.data = "";
                response.message = "appointment created succussfully"
                res.send(response);
            }
     
        });
    }
    catch
    {
        response.status = "failure";
        response.code = 1000;
        response.message = "Sorry something went wrong!!"
        res.send(response);
    }
})



app.listen(3000, () => {
 console.log("Server running on port 3000");
});