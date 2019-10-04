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

  function postRapper(rapper) {
    return request
      .post('/api/rappers')
      .set('Authorization', user.token)
      .send(rapper)
      .expect(200)
      .then(({ body }) => body);
  }

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

  it('updates a rapper', () => {
    return postRapper(chance).then(rapper => {
      return request
        .put(`/api/rappers/${rapper._id}`)
        .set('Authorization', user.token)
        .send({ yearsActive: 9 })
        .expect(200)
        .then(({ body }) => {
          expect(body.yearsActive).toBe(9);
          expect(body._id).toBe(rapper._id);
        });
    });
  });

  it('deletes a rapper', () => {
    return postRapper(chance).then(rapper => {
      return request
        .delete(`/api/rappers/${rapper._id}`)
        .set('Authorization', user.token)
        .expect(200)
        .then(() => {
          return request
            .get('/api/rappers')
            .set('Authorization', user.token)
            .expect(200);
        })
        .then(({ body }) => {
          console.log(body);
          expect(body.length).toBe(0);
        });
    });
  });

  it('get all rappers by id', () => {
    return postRapper(chance)
      .then(() => {
        return request
          .get('/api/rappers')
          .set('Authorization', user.token)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(1);
      });
  });

  it('get a rapper by id', () => {
    return postRapper(chance)
      .then(rapper => {
        return request
          .get(`/api/rappers/${rapper._id}`)
          .set('Authorization', user.token)
          .expect(200);
      })
      .then(({ body }) => {
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
