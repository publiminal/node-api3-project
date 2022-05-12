
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
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules

module.exports = {logger, validateUserId, validateUser, validatePost}