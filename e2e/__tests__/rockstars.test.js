const request = require('../request');
const db = require('../db');
const { signupUser } = require('../data-helpers');

describe('rappers api', () => {
  beforeEach(() => db.dropCollection('users'));
  beforeEach(() => db.dropCollection('rockers'));

  let user = null;
  beforeEach(() => {
    return signupUser().then(newUser => (user = newUser));
  });

  const rocker = {
    name: 'post malone',
    country: 'US'
  };

  function postRocker(rocker) {
    return request
      .post('/api/rockers')
      .set('Authorization', user.token)
      .send(rocker)
      .expect(200)
      .then(({ body }) => body);
  }

  it('post a rocker for this user with admin role', () => {
    return request
      .post('/api/rockers')
      .set('Authorization', user.token)
      .send(rocker)
      .expect(200)
      .then(({ body }) => {
        expect(body.roles).toBe(user._id);
        expect(body).toMatchInlineSnapshot(
          {
            _id: expect.any(String),
            roles: expect.any(String)
          },

          
        );
      });
  });
});