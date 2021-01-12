const {
  check,
  validationResult,
  matchedData,
  sanitize} = require('express-validator');
const {
  user,
  status,
  role,
  payment,
  contest,
  application} = require('../../models')

module.exports = {
  contest: [
    check('id').custom((value, {
      req
    }) => {
      return contest.findOne({
        where: {
          id: req.params.id
        }
      }).then(result => {
        if (!result) {
          throw new Error('Contest Not Found!')
        }
      })
    }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.mapped()
        })
      }
      next();
    }
  ],

  create:[
    check('title',"Please Fill in the Title").not().isEmpty().custom((value,{req}) => {
      return contest.findOne({
        where: {
          title:req.body.title
        }
      }).then(result=>{
        if (result) {
          throw new Error("Title Already Used!")
        }
      })
    }),
    check('prize',"Numeric Only!").isNumeric(),
    check('due_date', "Date Format (YYYY-MM-DD) Only").isDate().toDate(),
    check('announcement', "Date Format (YYYY-MM-DD) Only").isDate().toDate(),
    check('description',"Please Fill in the Description").not().isEmpty(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.mapped()
        })
      }
      next();
    }
  ]
}
