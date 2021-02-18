'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let input = []
    let totalQuestion = 50
    for (let i = 0; i < totalQuestion; i++) {
      let obj = {}
      let question = ""
      let answer = 0
      let value1 = Math.ceil(Math.random() * 100)
      let value2 = Math.ceil(Math.random() * 100)
      let randomOperation = Math.floor(Math.random() * 4)
      if (randomOperation === 0) {
        question = `${value1} + ${value2}`
        answer = value1 + value2
      } else if (randomOperation === 1) {
        question = `${value1} - ${value2}`
        answer = value1 - value2
      } else if (randomOperation === 2) {
        question = `${value1} x ${value2}`
        answer = value1 * value2
      } else if (randomOperation === 3) {
        question = `${value1} / ${value2}`
        answer = value1 / value2
      }
      obj = {
        question,
        answer,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      input.push(obj)
    }
    return queryInterface.bulkInsert("Questions", input, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Questions", null, {})
  }
};
