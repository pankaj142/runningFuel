
(function(){
    angular
     .module('BlogApp',[])
     .controller('BlogController', BlogController);

 function BlogController($scope, $http){
     $scope.createPost = createPost;
     $scope.deletePost = deletePost;
     $scope.editPost = editPost;
     $scope.updatePost = updatePost;

     function init(){
         getAllPost(); // to get all posts from database
     }
     
     init();  
  
   // $scope.posts="";
     function getAllPost(){
         $http
              .get('/api/blogpost')
              .then(function(posts){
                  $scope.posts=posts;
                //  console.log(posts);
         });
     }


     function createPost(post){
        console.log(post);
        $http
            .post('/api/blogpost', post)
            .then(getAllPost);
        $scope.post="";    
     }
 

    function deletePost(postId){
        $http
             .delete('/api/blogpost/'+postId)
             .then(getAllPost);
       // console.log(postId);
    }

    function editPost(postId){
        $http
             .get('/api/blogpost/'+postId)
             .then(function(post){
                $scope.post= post.data;
                console.log(post);
             });
    }

    function updatePost(post){
        console.log(post);
        $http
             .put('/api/blogpost/'+post._id, post)
             .then(getAllPost);
    }

 } // end of  BlogController controller
    
})();