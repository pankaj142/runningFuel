var express =require('express');
var bodyParser =require('body-parser');
var mongoose =require('mongoose');
mongoose.Promise = require('bluebird');
var app =express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true }));

mongoose.connect('mongodb://localhost/petrolApp');

var UserRegSchema = mongoose.Schema({
    userName:String,
    email:String,
    mobileNumber:Number,
    adharNumber:Number,
    licenceNumber:Number,
    password:String
    
},{collection:'userRegistration'}  // it will force db to save this model as collection called as 'post'
);

var RequestSchema = mongoose.Schema({
    adharNumber:String,
    licenceNumber:String,
    mobileNumber:String,
    petrolPumbAddr:String,
    petrolPumpName:String,
    userId:String,
    username:String
    
},{collection:'Requests'}  // it will force db to save this model as collection called as 'post'
);

var ProviderLoginSchema = mongoose.Schema({
    email:String,
    password:String
    
},{collection:'providerLoginData'}  // it will force db to save this model as collection called as 'post'
);

var UserRegModel = mongoose.model('UserRegModel', UserRegSchema);
var RequestModel = mongoose.model('RequestModel', RequestSchema);
var ProviderLoginModel = mongoose.model('ProviderLoginModel', ProviderLoginSchema);

//user apis
app.post('/api/register',userRegister);
app.get('/api/login/:data',userLogin);
app.post('/api/requestData',storeRequests);

//app.get('api/getUserInfo/:id',getUserData);
//provider apis
app.post('/api/provider/login',providerLogin);
app.get('/api/provider/reguestlist/:data',fetchRequests)




app.get('/api/blogpost', getAllPost);
app.post('/api/blogpost', createPost);
app.delete('/api/blogpost/:id', deletePost);
app.get('/api/blogpost/:id', getPostById);
app.put('/api/blogpost/:id', updatePost);

function fetchRequests(req,res){
    var data=req.params.data;

    console.log(req.params.data);
    console.log(req.params.data.split("zzzz"));
    var userLoginData=req.params.data.split("zzzz");
    RequestModel
        .find({petrolPumbAddr:userLoginData[1]})
        .then(
            function(userData){    //on success
                var userId=userData.data;
                res.json(userData);   // 200-http OK status
            },
            function(err){       //on failure
                res.sendStatus(400); //400-http unsuccessful req
            }
        );
}

function providerLogin(req,res){
    var data = req.body;
    console.log(data); 
    ProviderLoginModel
        .create(data)
        .then(
            function(postObj){    //on success
                res.json(200);   // 200-http OK status
            },
            function(err){       //on failure
                res.sendStatus(400); //400-http unsuccessful req
            }
        );
}

function storeRequests(req,res){
    var request = req.body;
    console.log(request); 
    RequestModel
        .create(request)
        .then(
            function(request){    //on success
                res.json(request);   // 200-http OK status
            },
            function(err){       //on failure
                res.sendStatus(400); //400-http unsuccessful req
            }
        );
}
/*
function getUserData(req,res){
    var id=req.params.data;
    console.log(id)

    UserRegModel
        .findById(id)
        .then(
            function(userData){    //on success
                var userId=userData.data;
                res.json(userData);   // 200-http OK status
            },
            function(err){       //on failure
                res.sendStatus(400); //400-http unsuccessful req
            }
        );

}
*/

function userLogin(req,res){
    //var email=req.params.data;
    console.log(req.params.data);
    console.log(req.params.data.split("yyyyy"));
    var userLoginData=req.params.data.split("yyyyy");
    UserRegModel
        .find({email:userLoginData[0],password:userLoginData[1]})
        .then(
            function(userData){    //on success
                var userId=userData.data;
                res.json(userData);   // 200-http OK status
            },
            function(err){       //on failure
                res.sendStatus(400); //400-http unsuccessful req
            }
        );

    
    //res.json(200)
   
}
function userRegister(req,res){
    var data = req.body;
    console.log(data); 
    UserRegModel
        .create(data)
        .then(
            function(postObj){    //on success
                res.json(200);   // 200-http OK status
            },
            function(err){       //on failure
                res.sendStatus(400); //400-http unsuccessful req
            }
        );
}

function updatePost(req, res){
    var postId =req.params.id;
    var post =req.body;
    PostModel
            .update({_id:postId},{
                title:post.title,
                body:post.body
            })
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(err){
                    res.sendStatus(400);
                }
            )
            
}


function getPostById(req, res){
    var postId=req.params.id;
    PostModel
             .findById(postId)
             .then(
                 function(post){
                    res.json(post);
                 },
                 function(err){
                    res.sendStatus(400);
                 }
             )
}

function deletePost(req, res){
    var postId = req.params.id;
    PostModel
            .remove({_id: postId})
            .then(
                function(status){  // status- command result
                    res.sendStatus(200);  // res-server response
                },
                function(){
                    res.sendStatus(400); //res-server response 
                }
            )
}

function getAllPost(req,res){
    PostModel
            .find()
            .then(
                function(posts){           // on get success 
                    res.json(posts);
                },
                function(err){              //on get failed
                    res.sendStatus(400);
                }
            );
}

function createPost(req, res){
    var post = req.body;
    console.log(post); 
    PostModel
        .create(post)
        .then(
            function(postObj){    //on success
                res.json(200);   // 200-http OK status
            },
            function(err){       //on failure
                res.sendStatus(400); //400-http unsuccessful req
            }
        );
}

app.listen(3000);