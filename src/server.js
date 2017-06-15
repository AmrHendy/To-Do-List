/*var http = require("http");
var fs = require("fs");
var express = require("express");
*/
var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var correctUser = null;
var signinUser = null;
app.use(express.static('public'));
var jsonParser = bodyParser.json();
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('files'));
    app.get('/', function (req, res) {
        res.sendFile( __dirname + '/' + 'home.html' );
        console.log("success1");
    });

    app.post('/login' , urlencodedParser,function(req , res){      
        console.log("success2");
        //var html2 = "1234";
        var html2;
            fs.readFile(__dirname + "/" + "WebPhase1.html", 'utf8', function (err3, data3) {
                console.log("in");
                html2 = fs.readFileSync(__dirname + "/" + "WebPhase1.html", "utf8");

        });
        fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        if(err){
            //console.log("error");
        }
        else{
        var filedata = JSON.parse(data);
        var repeted = 0;
        var i = 1;
        for (var user1 in filedata) {
        if(req.body.emailsignup == filedata[user1].email){repeted = 1; console.log("in if") ; break;}
        else{repeted = 0; correctUser = user1; i++; console.log("in else ") ;}
        }
        if(repeted === 0){
            var user = 
                {  "userr" : {  "email" : req.body.emailsignup , 
                                "password" : req.body.passwordsignup ,
                                "username" : req.body.usernamesignup ,
                                "html" : html2 
                }};
            
            console.log(req.body.emailsignup);
            console.log(req.body.usernamesignup);
            console.log(req.body.passwordsignup);
            
            filedata["user"+i] = user["userr"]; 
            var newdata= JSON.stringify(filedata);
            fs.writeFile(__dirname + "/" + "users.json", newdata ,'utf8');
            res.sendFile( __dirname + '/' + 'home.html' );
        }
            else{
                console.log("user is repetted");
                res.sendFile(__dirname + '/' + 'loguperror.html');
            }
        }
             
            
    });
});

    app.post('/tasklist' , urlencodedParser,function(req , res){      
        console.log("success3");
        var newhtml = req.body.htmltext;
        fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
            if(err){
                console.log("my error");
            }
            else{
                console.log("1");
                var filedata = JSON.parse(data);
                var found =  false;
                for(var user in filedata){
                    if(req.body.useremail == filedata[user].email && req.body.password == filedata[user].password){
                        found = true;
                        signinUser = user;
                        console.log("2");
                        break;
                    }
                    else{
                        signinUser = null;
                        found = false;
                    }
                }
                
                if(found){
                    console.log("3");
                    data = JSON.parse( data );
                    console.log("4");
                    console.log("5");
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(data[signinUser].html);
                }
                else{
                    console.log("user is invalid");
                    res.sendFile(__dirname + '/' + 'loginerror.html');
                }
            
                
            }
            });
            
        });
        app.post('/tasks' , jsonParser,function(req , res){      
            console.log("success4");
            var newtable = req.body.html;
            console.log(newtable);
            fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
                if(err){
                console.log("my error");
                }
                else{
                    var filedata = JSON.parse(data);    
                    filedata[signinUser].html = '<html>' + newtable + '<\html>';
                    fs.writeFile(__dirname + "/" + "users.json",JSON.stringify(filedata), function (err) {
                        if (err) return console.log("error5");
                    });
                    res.setHeader('X-XSS-Protection', 0);
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(filedata[signinUser].html);
                }
                
            });
            
        });

var server = app.listen(8082, function () {
var host = server.address().address;
var port = server.address().port;
console.log("Example app listening at http://%s:%s", host, port); });