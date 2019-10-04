const request = require('../request');
const db = require('../db');
const { signupUser } = require('../data-helpers');

describe('me testing', () => {
  beforeEach(() => db.dropCollection('user'));
  beforeEach(() => db.dropCollection('rappers'));

  let user = null;
  beforeEach(() => {
    return signupUser().then(newUser => (user = newUser));
  });

  const rapper = {
    name: 'chance the rapper',
    yearsActive: 8
  };

  function postRapper(rapper) {
    return request
      .post('/api/rappers')
      .set('Authorization', user.token)
      .send(rapper)
      .expect(200)
      .then(({ body }) => body);
  }

  function updateFavoriteRapper(rapper) {
    return postRapper(rapper).then(rapper => {
      return request
        .put(`/api/me/favorites/${rapper.id}`)
        .set('Authorization', user.token)
        .expect(200)
        .then(({ body }) => body);
    });
  }

  it('puts a rapper into favorites', () => {
    return postRapper(rapper).then(rapper => {
      return request
        .put(`/api/me/favorites/${rapper._id}`)
        .set('Authorization', user.token)
        .send(rapper)
        .expect(200)
        .then(({ body }) => {
          expect(body[0]).toMatchInlineSnapshot(
            {
              _id: expect.any(String)
            },


          );
        });
    });
  });
});
