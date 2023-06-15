const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const app=express();
const https=require("https");
// const { request } = require("http");

// app.use(express.static("public"));
// app.use(express.static(__dirname +'/public'));

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
    // res.send("hello-world");
});

app.post("/",function(req,res){
    const firstName=req.body.first;
    const lastName=req.body.last;
    const address=req.body.address;
    const email=req.body.email;
    var data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName,
                    ADDRESS:address
                }
                
            }
        ]
    };
    const jsonData=JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/4e77c059e6";

const options={
    method:"POST",
    auth:"Hrudayesh:8cb07e119ea7c81fe91b44e0fe6a19d7-us21"
}
const request=https.request(url,options,function(response){

    if(response.statusCode==200){
        res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }
    console.log(response.statusCode);
    response.on("data",function(data){
        var res=JSON.parse(data);
        // console.log(res);
        // console.log(res.new_members[0].email_address);
    })
});
    request.write(jsonData);
    request.end();
});

app.post("/success",function(req,res){
    res.redirect("/");
})


app.listen(8080,function(){
    console.log("server started successfully");
});
