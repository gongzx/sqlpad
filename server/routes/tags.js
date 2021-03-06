const _ = require('lodash')
const router = require('express').Router()
const Query = require('../models/Query.js')
const mustBeAuthenticated = require('../middleware/must-be-authenticated.js')
const sendError = require('../lib/sendError')

router.get('/api/tags', mustBeAuthenticated, function(req, res) {
  return Query.findAll()
    .then(queries => {
      const tags = _.uniq(_.flatten(_.map(queries, 'tags')))
        .sort()
        .filter(t => t)

      return res.json({
        tags: tags
      })
    })
    .catch(error => sendError(res, error, 'Problem getting tags'))
})

module.exports = router
