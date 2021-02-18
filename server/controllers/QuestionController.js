const { Question } = require('../models')

class QuestionController {
  static showAll(req, res) {
    Question.findAll()
    .then(result=>{
      res.status(200).json(result)
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }
}

module.exports = QuestionController