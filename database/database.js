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
    return db.any(`SELECT * FROM chatrooms ORDER BY roomname DESC`,[])
  },

  selectRoom: (roomid) => {
    return db.one(`SELECT * FROM chatrooms WHERE id=$1`,[roomid])
  },

  queryString: (input) => {
    input = `%${input}%`
    return db.any(`
      SELECT * FROM chatrooms
      WHERE UPPER(roomname) like UPPER($1)
      `,
      [input])
  },

  leaveChatRoom: activeuserid => {
    return db.none(`DELETE FROM activeusers WHERE id=$1`,[ activeuserid ])
  },

  createChatRoom: ( roomname ) => {
    return db.any(
      `INSERT INTO chatrooms
        ( roomname )
      VALUES
        ( $1 )`,
      [ roomname ]
    )
  },

  editChatRoom: ( roomid, roomname ) => {
    return db.oneOrNone(
       `UPDATE chatrooms
       SET roomname=$2
       WHERE roomid=$1`,
       [ roomid, roomname ] )
  }
}

const User = {
  isActiveUser: ( activeuserid ) => {
    return db.one(`SELECT * FROM activeusers WHERE activeuserid=$1`,[ activeuserid ])
  },

  makeActiveUser: ( activeuserid, id, roomid ) => {
    return db.none(`INSERT INTO activeusers
      ( activeuserid, id, roomid )
    VALUES
      ( $1, $2, $3 )`,[ activeuserid, id, roomid ])
  },

  find: ( email, password ) => {
    return db.oneOrNone( 'SELECT * FROM users WHERE email=$1', [ email])
      .then( user => comparePassword( password, user))
  },

  findById: id => db.one( 'SELECT * FROM users WHERE id=$1', [ id ] ),
  createOne: (
    firstname,
    lastname,
    email,
    username,
    password ) => {
    return createSalt( password )
      .then( hashPassword )
      .then ( hash => {
        return db.one(
          `INSERT INTO users(
            firstname,
            lastname,
            email,
            username,
            salt,
            password ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [
              firstname,
              lastname,
              email,
              username,
              hash[ 0 ],
              hash[ 1 ] ]
        )
      })
  }
}

module.exports = {
  Messages,
  User
}
