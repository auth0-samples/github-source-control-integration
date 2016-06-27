function (user, context, callback) {
  callback(new UnauthorizedError('You are not authorized to do this'));
}
