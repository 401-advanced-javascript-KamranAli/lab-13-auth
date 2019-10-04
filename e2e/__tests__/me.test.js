const request = require('../request');
const db = require('../db');
const { signupUser } = require('../data-helpers');

describe('me testing', () => {
  beforeEach(() => db.dropCollection('users'));
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
        .put(`/api/me/favorites/${rapper._id}`)
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
          expect(body[0]).toBe(rapper._id);
        });
    });
  });

  it('removes a rapper from favorites', () => {
    return updateFavoriteRapper(rapper).then(favorites => {
      const favoredRapper = favorites[0];
      return request
        .delete(`/api/me/favorites/${favoredRapper}`)
        .set('Authorization', user.token)
        .expect(200)
        .then(({ body }) => {
          expect(body.length).toBe(0);
        });
    });
  });

  it('get all user favorites', () => {
    return postRapper(rapper).then(() => {
      return request
        .get('/api/me/favorites')
        .set('Authorization', user.token)
        .expect(200)
        .then(({ body }) => {
          expect(body.length).toBe(0);
        });
    });


  });
});