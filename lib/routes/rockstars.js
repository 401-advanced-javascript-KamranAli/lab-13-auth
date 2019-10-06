// eslint-disable-next-line new-cap
const router = require('express').Router();
const Rockstar = require('../models/rockstar');

router
  .get('/', ({ query }, res, next) => {
    const findQuery = {};
    if(query.name) findQuery.name = query.name;
    if(query.country) findQuery.country = query.country;

    Rockstar.find(findQuery)
      .select('name country yearsActive')
      .lean()
      .then(Rockstar => {
        res.json(Rockstar);
      })
      .catch(next);
  })

  .post('/', (req, res, next) => {
    req.body.roles = req.user.id;

    Rockstar.create(req.body)
      .then(rockstar => res.json(rockstar))
      .catch(next);
  })

  .put('/:id', ({ params, body, user }, res, next) => {
    Rockstar.updateOne({
      _id: params.id,
      roles: user.id
    }, body)
      .then(rockstar => res.json(rockstar))
      .catch(next);
  })

  .delete('/:id', ({ params, user }, res, next) => {
    Rockstar.findOneAndRemove({
      _id: params.id,
      roles: user.id
    })
      .then(rockstar => res.json(rockstar))
      .catch(next);
  });