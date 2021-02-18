const router = require('express').Router()
const QuestionController = require('../controllers/QuestionController')

router.get('/', QuestionController.showAll)

module.exports = router