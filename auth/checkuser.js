export const isLoggedIn = ( request, response, next ) =>
  request.user ? next() : response.redirect('/users/login')
