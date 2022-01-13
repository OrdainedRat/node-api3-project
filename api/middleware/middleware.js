const User = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  const method = req.method;
  const url = req.originalUrl;
  const timestamp = new Date()
  console.log(`Time: [${timestamp}], Method: ${method}, URL: ${url}`) 
  next()
}

async function validateUserId(req, res, next) {
  try{
    const user = await User.getById(req.params.id)
      if(!user) {
        res.status(404).json({ message: "user not found" })
      } else {
        req.user = user
        next()
      }
  } catch(err) {
      res.status(500).json({message: 'Cannot Get User!'})
  }
}

async function validateUser(req, res, next) {
  console.log(' validateUser middleware :}')
  const { name } = req.body
  try{
    if(!name) {
      res.status(400).json({ message: "missing required name field" })
    } else {
      next()
    }
  } catch(err) {
    res.status(500).json({message: 'Could not process'})
  }
  
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  console.log(' validatePost middleware :}')
    next()
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}