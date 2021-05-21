# node-practice
We have used mongodb database , a no-sql database as it is highly scalable , more flexible i.e we can easily apply changes to database as and when required unlike sql databases without worrying much about the structure. Since no-sql database are highly available as compared to sql database that's why we are using them.

For enhanced security we are verifying the request body of apis' with joi validation ( a npm package for validation).

postman collection link --> https://www.getpostman.com/collections/17d00147155efca2dafc

Below some usecases for different requests are provided along with the output :- 
# 1. Login User -->  api/user/login (A post request)
      we just need to provide email and password (both are required) fields, as body fields in json format e.g  { "email":"abcd@abc.com","password":"fFsfsfs#3"}
      If the body parameters are right in reponse we will receive a jwt token , else an error message.
      
# 2. Register User --> api/user/register  (A post request)
    Password must be of min 8 length and max 26 length and must contain:
    1. at least 1 special character
    2. at least 1 uppercase character
    3. at least 1 lowercase character
    4. at least 1 digit.
    
    It must contain all the 3 fields (name,email and password) in request body in json format.e.g {"name" :"abcd","email":"abcd@abc.com","password" : "Wsfdf1@w"}
    Returns saved user instance as response upon succesful registration else gives error message.
   
 # 3. Create Blog --> api/blog/create  ( A post request)
    API Endpoint : api/blog/create
    While using this post request it must have the following headers:
    1. Content-Type : "application/json"
    2. Authorization : "Bearer ${jwt-token (received as response from login)}
   and it must contain both fields i.e title and body in request body as json.e,g 
    request body --> 
    {
      "title" : "first blog",
      "body" : "First line"                               // both the fields are necessary , else error message will be returned as respone.
    }
    necessary headers -->
    {
      "Content-Type" : "application/json",
      "Authorization" : "Bearer eyinaddns..121in3nndsds"   //where "eyinaddns..121in3nndsd" is the token received as response from login 
    }
    Returns saved blog instance as response upon success else gives error message as response. 
    
# 4. Get All Blogs --> api/blog/getAll (get request)
    Returns all blogs present in database as json in response if successful else an error message.
    No need for authorization as all users (logged in or not) have permissions to fetch the blogs.
    
# 5. Get Blog by Id --> api/blog/getBlog/:id , where id = ID of Blog to be fetched. (get request)
    In the above request we pass blog id as request parameter and it returns blog with provided 'id' as response in json format if successful else an error message.
    No need for authorization as all users (logged in or not) have permissions to fetch the blog.
    
# 6. Delete Blog--> api/blog/deleteBlog/:id , where id = ID of Blog to be deleted. (delete request)
   In the above delete request we must pass authorization token in headers section for authorizing user.
   e.g neccessary headers --> 
   {
    "Authorization" : "Bearer eyinaddns..121in3nndsds"   //where "eyinaddns..121in3nndsd" is the token received as response from login.
   }
   In the above request we pass blog id as request parameter and it returns "Blog successfully deleted message" upon deletion of blog else return error statement on error.
   Note --> A user can only delete and update those blogs which are created by him else error will occur.
   
# 7. Update Blog  --> api/blog/updateBlog/:id , where id = ID of Blog to be updated. (put request)
    In the above put request we must pass authorization token in headers section for authorizing user and at least one field out of title and body for successful updation of         blog else error will occur.
    eg --> request.body 
    {
      "title" : "Hello World",
      "body"  : "Node-practice"
    }
    necessary headers --> 
    {
      "Content-Type" : "application/json",
      "Authorization" : "Bearer eyinaddns..121in3nndsds"   //where "eyinaddns..121in3nndsd" is the token received as response from login.
    }
    In the above request we pass blog id as request parameter and it returns updated upon successful updation of blog else return error statement on error.
    Note --> A user can only delete and update those blogs which are created by him else error will occur.
   
 # 8.  Get all comments of a blog --> api/comment/getComments/:id ,where id is the id of the Blog whose comments are to be fetched. (get request)
      Returns all the comments for the blog with given ID as "id" (provided in request parameter) in json format if successful else gives an error message as response.
      No need for authorization as all users (logged in or not) have permissions to fetch the blogs.
      
 # 9. Add Comment on a blog -->  api/comment/createComment/:id ,id is the id of Blog where comment is to be added. (put request)
    The above request must contain authorization token in headers (provided as repsonse in login) as unauthorized users (with no tokens) will not be allowed to comment on any       blog!
    e.g request.body 
    {
      "text" : "first comment"
    }
    necessary request headers 
    {
      "Content-Type" : "application/json",
      "Authorization" : "Bearer eyinaddns..121in3nndsds"   //where "eyinaddns..121in3nndsd" is the token received as response from login.
    }  
    The above request must contain "text" field as body in json format which contains the comment to be added
    The response contains the blog having id =id and all of its comments and the comment details in json format if successful else it contains an error message.
 
10. I have not added logout api as it will be done in frontend where we will remove localstorage where jwt token will be stored.

