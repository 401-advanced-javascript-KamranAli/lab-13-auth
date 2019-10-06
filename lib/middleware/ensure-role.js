
module.exports = function createRole(role) {
  return ({ user }, res, next) => {
    if(!(user && user.roles & user.roles.includes(role))) {
      next({
        statusCode: 400,
        error: `user not authorized, must be "${role}"`
      });
    }
    else {
      next();
    }
  };
};