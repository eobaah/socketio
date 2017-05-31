const {
  createSalt,
  hashPassword,
  comparePassword
} = require('../auth/hashpassword')
const promise = require( 'bluebird' )
const options = { promiseLib: promise }
const pgp = require( 'pg-promise' )( options )
const CONNECTION_STRING = `pg://${process.env.USER}@localhost:5432/chatdb`
const db = pgp( CONNECTION_STRING )

const Messages = {

  getChatRooms: () => {
    return db.any(`SELECT * FROM bookstore ORDER BY title ASC`,[])
  },

  selectRoom: (id) => {
    return db.one(`SELECT * FROM bookstore WHERE id=$1`,[id])
  },

  queryString: (input) => {
    input = `%${input}%`
    return db.any(`
      SELECT * FROM bookstore
      WHERE UPPER(title) like UPPER($1)
      OR UPPER(author) like UPPER($1)
      OR UPPER(genre) like UPPER($1)`,
      [input])
  },

  leaveChatRoom: id => {
    return db.none(`DELETE FROM bookstore WHERE id=$1`,[id])
  },

  createChatRoom: ( { title, author, preview, genre, image_url }) => {
    return db.any(
      `INSERT INTO bookstore
        ( title, author, preview, genre, image_url )
      VALUES
        ( $1, $2, $3, $4, $5)`,
      [ title, author, preview, genre, image_url ]
    )
  },

  editChatRoom: ( id, book ) => {
    return db.oneOrNone(
       `UPDATE bookstore
       SET title=$2, author=$3, preview=$4, genre=$5, image_url=$6
       WHERE id=$1`,
       [id, book.title, book.author, book.preview, book.genre, book.image_url] )
  }
}

const User = {

  find: ( email, password ) => {
    return db.oneOrNone( 'SELECT * FROM users WHERE email=$1', [email])
      .then( user => comparePassword( password, user))
  },
  findById: id => db.one( 'SELECT * FROM users WHERE id=$1', [id] ),
  createOne: ( email, password ) => {
    return createSalt( password )
      .then( hashPassword )
      .then ( hash => {
        return db.one(
          'INSERT INTO users(email, password ) VALUES ($1, $2) RETURNING *', [ email, hash ]
        )
      })
  }
}

module.exports = {
  Messages,
  User
}
