const {
  user,
  status,
  role,
  payment,
  contest,
  application
} = require('../models');

const moment = require('moment')

const Op = require('sequelize').Op;

class ContestController {
  constructor() {
    user.hasMany(contest, {
      foreignKey: 'id_provider'
    })
    contest.belongsTo(user, {
      foreignKey: 'id_provider'
    })
    status.hasMany(contest,{
      foreignKey: 'id_status_contest'
    })
    contest.belongsTo(status, {
      foreignKey : 'id_status_contest'
    })
  }

  async searchStat(user1,req,res) {

    const page = parseInt(req.query.page);  // Pagination constant
    const limit = 5;
    const offset = (page - 1) * limit;


    if (user1.id_role == 2) {
      const totalResult = await contest.findAndCountAll({
        where:{
          id_provider:user1.id,
          title: {
            [Op.regexp]:req.body.contest // title
          }
        }
      })

      const result = await contest.findAll({
        where:{
          id_provider:user1.id,
          title: {
            [Op.regexp]:req.body.contest // title
          }
        },
        attributes: [
          ['updatedAt','posted'], //ambil updateAt ganti jadi posted
          'due_date',
          'title',
          'prize',
          'description'
        ],
        include:[{ //forein key
          model:status,
          attributes:['status']
        },{
          model:user,
          attributes:[['fullname','provider']]
        }],
        offset: offset,
        limit: limit,
        order:[
          ['announcement', 'DESC']
        ]
      })

      // const resultSize = _.size(totalResult) // Check the reviews dataset size
      const totalPage = (totalResult < limit) ? 1 : Math.ceil(totalResult.count/limit)

      for (let i = 0; i < result.length; i++ ) {
        result[i].dataValues.posted = moment(result[i].dataValues.posted.toJSON()).format('dddd, DD MMMM YYYY')
      }

      return res.status(200).json({
        message:"Success",
        totalResult:totalResult.count,
        totalPage:totalPage,
        result:result
      })
    } else if (user1.id_role == 3) {
      const result = await contest.findAll({
        where:{
          title: {
            [Op.regexp]:req.body.contest
          }
        },
        attributes: [
          ['updatedAt','posted'],
          'due_date',
          'title',
          'prize',
          'description'
        ],
        include:[{
          model:status,
          attributes:['status']
        },{
          model:user,
          attributes:[['fullname','provider']]
        }],
        order:[
          ['announcement', 'DESC']
        ]
      })
      for (let i = 0; i < result.length; i++ ) {
        result[i].dataValues.posted = moment(result[i].dataValues.posted.toJSON()).format('dddd, DD MMMM YYYY')
      }
      return res.status(200).json({
        message:"Success",
        result:result
      })
    } else {
      res.status(422).json({
        status:"Error"
      })
    }
  }

  async contest(user1,req,res) {
    const result = await contest.findOne({
      where:{
        id:req.params.id
      },
      attributes:[
        'title',
        'prize',
        'due_date',
        'announcement',
        'description'
      ],
      include: [{
        model:status,
        attributes:['status']
      },{
        model:user,
        attributes:[['fullname','provider']]
      }]
    })

    return res.status(200).json({
      message:"Success",
      result:result
    })
  }

  async create(user1,req,res) {
    let createdContest = await contest.create({
      title:req.body.title,
      id_provider:user1.id,
      prize:req.body.prize,
      due_date:req.body.due_date,
      description:req.body.description,
      id_status_contest:3,
      announcement:req.body.announcement
    })
    let newContest = await contest.findOne({
      where: {
        id: createdContest.id
      },
      attributes:[
        'title',
        'prize',
        'due_date',
        'announcement',
        'description'
      ],
      include: [{
        model:status,
        attributes:['status']
      }]
    })
    return res.status(200).json({
      message:"Success",
      result:newContest
    })
  }

  async myContest(user1, req, res) {

    const result = await contest.findAll({
      where:{
        id_provider : user1.id
      },
      attributes: [
        ['updatedAt','posted'],
        'due_date',
        'title',
        'prize',
        'description'
      ],
      include:[{
        model:status,
        attributes:['status']
      },{
        model:user,
        attributes:[['fullname','provider']]
      }],
      order:[
        ['announcement', 'DESC']
      ]
    })

    for (let i = 0; i < result.length; i++ ) {
      result[i].dataValues.posted = moment(result[i].dataValues.posted.toJSON()).format('dddd, DD MMMM YYYY')
    }

    return res.status(200).json({
      message:"Success",
      result:result
    })


  }

  async updateClose(user1, req, res) {

    let update = {
      id_status_contest:2
    }
    //
    await contest.update(update,{
      where:{
        id: req.params.id
      }
    })

    const result = await contest.findOne({
      where:{
        id: req.params.id
      },
      attributes:[
        'title',
        'prize',
        'due_date',
        'announcement',
        'description'
      ],
      include: [{
        model:status,
        attributes:['status']
      },{
        model:user,
        attributes:[['fullname','provider']]
      }]
    })

    return res.status(200).json({
      message:"Success",
      result:result
    })
  }
}

module.exports = new ContestController;
