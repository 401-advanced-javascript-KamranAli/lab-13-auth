const request = require('../request');
const db = require('../db');
const { signupUser } = require('../data-helpers');

describe('Rappers Api', () => {
  beforeEach(() => db.dropCollection('users'));
  beforeEach(() => db.dropCollection('rappers'));

  let user = null;
  beforeEach(() => {
    return signupUser().then(newUser => (user = newUser));
  });

  const chance = {
    name: 'Chance the Rapper',
    yearsActive: 8
  };

  it('post a rapper for this user', () => {
    return request
      .post('/api/rappers')
      .set('Authorization', user.token)
      .send(chance)
      .expect(200)
      .then(({ body }) => {
        expect(body.owner).toBe(user._id);
        expect(body).toMatchInlineSnapshot(
          {
            _id: expect.any(String),
            owner: expect.any(String)
          },

          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "name": "Chance the Rapper",
            "owner": Any<String>,
            "yearsActive": 8,
          }
        `
        );
      });
  });
});
