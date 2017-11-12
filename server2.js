var express =require('express');
var bodyParser =require('body-parser');
var mongoose =require('mongoose');
mongoose.Promise = require('bluebird');
var app =express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true }));

mongoose.connect('mongodb://localhost/blogfall2016');

var PostSchema = mongoose.Schema({
    title:{ type:String, require:true},
    body:String,
    tag:{type:String, enum:['Political','Educational','Social','National']},
    posted:{type:Date, default:Date.now}
},{collection:'post'}  // it will force db to save this model as collection called as 'post'
);

var PostModel = mongoose.model('PostModel', PostSchema);

app.get('/api/blogpost', getAllPost);
app.post('/api/blogpost', createPost);
app.delete('/api/blogpost/:id', deletePost);
app.get('/api/blogpost/:id', getPostById);
app.put('/api/blogpost/:id', updatePost);

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