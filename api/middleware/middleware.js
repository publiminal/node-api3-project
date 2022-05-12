const dbUsers = require('../users/users-model')
const dbPosts = require('../posts/posts-model')



/* 
logger()
logger logs to the console the following information about each request: 
request method, request url, and a timestamp
this middleware runs on every request made to the API

*/

function logger(req, res, next) {
  // DO YOUR MAGIC
  // console.log(`this is logger in action`)
  // request method : req.method
  // request url : req.url
  // const timestamp = Date.now()
  const log = `${req.method} => ${req.url} :: ${Math.floor(Date.now()/1000)}`
  console.log(log)
  next()
}

/* 
this middleware will be used for all user endpoints that include an id parameter in the url 
(ex: /api/users/:id and it should check the database to make sure there is a user with that id.
if the id parameter is valid, store the user object as req.user and allow the request to continue
if the id parameter does not match any user id in the database, respond with status 404 and { message: "user not found" }
*/

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  dbUsers.getById(req.params.id)
  .then(user => {
    const isValid = user != null 
    if(isValid){
      req.user = user
    }else{
      console.log('user not valid')
      res.status(404).json({ message: "user not found" })
      return 
    }
  })
  .catch(err => console.warn('ValidateUser error ::', err ))

  next()
  // console.log('isValidUser', isValidUser)
}


/* 
  validateUser validates the body on a request to create or update a user
  if the request body lacks the required name field, respond with status 400 and { message: "missing required name field" }
*/
function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const user = req.body
  const isValid = 'name' in user 
  if(!isValid) {
    res.status(400).json({ message: "missing required name field" })
    return
  } 

  next()
}

/* 
  validatePost validates the body on a request to create a new post
  if the request body lacks the required text field, respond with status 400 and { message: "missing required text field" }
*/
function validatePost(req, res, next) {
  // DO YOUR MAGIC
  // const isBodyOk = 

  next()
}

// do not forget to expose these functions to other modules

module.exports = {logger, validateUserId, validateUser, validatePost}