const express = require('express');
const dbUsers = require('../users/users-model')
const dbPosts = require('../posts/posts-model')
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  // console.log('started default users router ')
  dbUsers.get()
    .then(users => res.status(200).json(users)  )
    .catch(() => res.status(500).json({message:'The users information could not be retrieved'}))
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  // validateUserId middleware checked whether id was a valid user and included it to the req param.
   dbUsers.getById(req.params.id)
  .then(user => {
        // console.log('req.user', req.user)
        res.status(200).json(req.user)
      })
      .catch(user => {
        res.status(500).json({message:'The user information could not be retrieved'})
      })
});




router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid

  // validateUser confirm whether the body has a 'name' key

  const userName = req.body
  dbUsers.insert(userName)
    .then(newUser => res.status(200).json(newUser) )
    .catch(newUser => {
      console.warn('error  insert user', newUser)
      res.status(500).json({message:'There was an error while saving the user to the database'})
    })

});

router.post('/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

  // validateUserId middleware check whether id was a valid user and included it to the req param.
  // validateUser confirm whether the body has a 'name' key
  const userid = req.params.id
  const name = req.body.name
  res.status(500).json({message:'There was an error on received params : id is no needed'})

});


router.put('/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

  // validateUserId middleware check whether id was a valid user and included it to the req param.
  // validateUser confirm whether the body has a 'name' key
  const userid = req.params.id
  const name = req.body.name
  dbUsers.update(userid, {...req.user, name })
    .then(newUser => res.status(200).json(newUser) )
    .catch(() => res.status(500).json({message:'There was an error while saving the user to the database'}))

});

router.delete('/:id', validateUserId,  (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const userid = req.params.id
  const name = req.body.name
  dbUsers.remove(userid)
    .then(deletedUser => res.status(200).json(req.user) )
    .catch(() => res.status(500).json({message:'There was an error while updating the user to the database'}))
});

router.delete('/', (req, res) => {
  // action restricted
    res.status(200).json({message:'action restricted'})
});

router.get('/:id/posts', validateUserId,  (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  dbUsers.getUserPosts(req.params.id)
  .then(posts => {
        // console.log('req.post', req.post)
        res.status(200).json(posts)
      })
      .catch(() => {
        res.status(500).json({message:'The post(s) information could not be retrieved'})
      })
});

router.post('/:id/posts', validatePost, validateUserId, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const id = req.params.id
  const newPost = {user_id:id, ...req.body}
  dbPosts.insert(newPost)
  .then(post => { 
    console.log(' new post', post)
    res.status(200).json(post)
   })
  .catch((err) => { 
    console.log('new post err', err)
    res.status(500).json({message:'The post(s) information could not be retrieved'})
   })
});

// do not forget to export the router
module.exports = router
