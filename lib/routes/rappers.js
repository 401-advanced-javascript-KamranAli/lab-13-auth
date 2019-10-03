// eslint-disable-next-line new-cap
const router = require('express').Router();
const Rapper = require('../models/rapper');

router
  .post('/', (req, res, next) => {
    req.body.owner = req.user.id;

    Rapper.create(req.body)
      .then(rapper => res.json(rapper))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Rapper.findById(req.params.id)
      .lean()
      .then(rapper => res.json(rapper))
      .catch(next);
  })

  .get('/', ({ query }, res, next) => {
    const findQuery = {};
    if(query.name) findQuery.name = query.name;
    if(query.yearsActive) findQuery.yearsActive = query.yearsActive;

    Rapper.find(findQuery)
      .select('name label yearsActive')
      .lean()
      .then(rapper => {
        res.json(rapper);
      })
      .catch(next);
  })

  .put('/:id', ({ params, body, user }, res, next) => {
    Rapper.updateOne({
      _id: params.id,
      owner: user.id
    }, body)
      .then(rapper => res.json(rapper))
      .catch(next);
  });

module.exports = router;