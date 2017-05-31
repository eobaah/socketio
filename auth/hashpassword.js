const bcrypt = require('bcrypt')
const saltRounds = 10

const createSalt = password => {
  return new Promise( ( resolve, reject ) => {
    bcrypt.genSalt( saltRounds, (error, salt ) => {
      if(error) {
        reject(error)
      }
      resolve([ salt, password])
    })
  })
}

const hashPassword = saltResult => {
  const [ salt, password ] = saltResult

  return new Promise( ( resolve, reject ) => {
    bcrypt.hash( password, salt, ( error, hash ) => {
      if(error) {
        reject(error)
      }
      resolve([ salt, password])
    })
  })
}

const comparePassword = ( password, user ) => {
  return new Promise( ( resolve, reject ) => {
    bcrypt.compare( password, user.password, (error, result ) => {
      const data = result ? user : null

      resolve( data )
    })
  })
}

module.exports = {
  createSalt,
  hashPassword,
  comparePassword
}
