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

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

class ContestController {
  constructor() {
    user.hasMany(contest, {
      foreignKey: 'id_provider'
    })
    contest.belongsTo(user, {
      foreignKey: 'id_provider'
    })

    status.hasMany(contest, {
      foreignKey: 'id_status_contest'
    })
    contest.belongsTo(status, {
      foreignKey: 'id_status_contest'
    })

    user.hasMany(application, {
      foreignKey: 'id_provider'
    })
    application.belongsTo(user, {
      foreignKey: 'id_provider'
    })
    user.hasMany(application, {
      foreignKey: 'id_participant'
    })
    application.belongsTo(user, {
      foreignKey: 'id_participant'
    })
    contest.hasMany(application, {
      foreignKey: 'id_contest'
    })
    application.belongsTo(contest, {
      foreignKey: 'id_contest'
    })
    status.hasMany(application, {
      foreignKey: 'id_status_contest'
    })
    application.belongsTo(status, {
      foreignKey: 'id_status_contest'
    })
  }

  async searchCat(user1, req, res) {

    const page = parseInt(req.query.page); // Pagination constant
    const limit = 5;
    const offset = (page - 1) * limit;

    const applied = await application.findAll({
      where:{
        id_participant:user1.id
      }
    })

    const keep = []

    Object.keys(applied).map((key,index) => {
      keep.push(applied[key].dataValues.id_contest)
    })

    const id_contests = keep.filter(onlyUnique);

    const result = await contest.findAll({
      where: {
        id: {
          [Op.notIn]:[4,5]
        },
        title: {
          [Op.regexp]: req.body.contest === "" ? " " : req.body.contest
        }
      },
      attributes: [
        ['updatedAt', 'posted'], //ambil updateAt ganti jadi posted
        'due_date',
        'title',
        'prize',
        'description'
      ],
      include: [{ //forein key
        model: status,
        attributes: ['status']
      }, {
        model: user,
        attributes: [
          ['fullname', 'provider']
        ]
      }],
      offset: offset,
      limit: limit,
      order: [
        ['announcement', 'DESC']
      ]
    })

    const totalResult = await contest.findAll({
      where: {
        id: {
          [Op.notIn]:[4,5]
        },
        title: {
          [Op.regexp]: req.body.contest === "" ? " " : req.body.contest
        }
      }
    })

    const totalPage = (totalResult.length < limit) ? 1 : Math.ceil(totalResult.length / limit)

    for (let i = 0; i < result.length; i++) {
      result[i].dataValues.posted = moment(result[i].dataValues.posted.toJSON()).format('dddd, DD MMMM YYYY')
    }

    for (let i = 0; i < result.length; i++) {
      result[i].dataValues.status.status = "Apply"
    }

    return res.status(200).json({
      message: "Success",
      totalResult: totalResult.length,
      totalPage: totalPage,
      result: result
    })
  }

  async searchStat(user1, req, res) {
    console.log(req.body.contest === "");

    const page = parseInt(req.query.page); // Pagination constant
    const limit = 5;
    const offset = (page - 1) * limit;


    if (user1.id_role == 2) {
      const totalResult = await contest.findAndCountAll({
        where: {
          id_provider: user1.id,
          title: {
            [Op.regexp]: req.body.contest === "" ? " " : req.body.contest
          }
        }
      })

      const result = await contest.findAll({
        where: {
          id_provider: user1.id,
          title: {
            [Op.regexp]: req.body.contest === "" ? " " : req.body.contest
          }
        },
        attributes: [
          ['updatedAt', 'posted'], //ambil updateAt ganti jadi posted
          'due_date',
          'title',
          'prize',
          'description'
        ],
        include: [{ //forein key
          model: status,
          attributes: ['status']
        }, {
          model: user,
          attributes: [
            ['fullname', 'provider']
          ]
        }],
        offset: offset,
        limit: limit,
        order: [
          ['announcement', 'DESC']
        ]
      })

      // const resultSize = _.size(totalResult) // Check the reviews dataset size
      const totalPage = (totalResult < limit) ? 1 : Math.ceil(totalResult.count / limit)

      for (let i = 0; i < result.length; i++) {
        result[i].dataValues.posted = moment(result[i].dataValues.posted.toJSON()).format('dddd, DD MMMM YYYY')
      }

      return res.status(200).json({
        message: "Success",
        totalResult: totalResult.count,
        totalPage: totalPage,
        result: result
      })
    } else if (user1.id_role == 3) {

      const totalResult = await contest.findAndCountAll({
        where: {
          title: {
            [Op.regexp]: req.body.contest === "" ? " " : req.body.contest
          }
        }
      })

      const result = await contest.findAll({
        where: {
          title: {
            [Op.regexp]: req.body.contest === "" ? " " : req.body.contest
          }
        },
        attributes: [
          ['updatedAt', 'posted'],
          'due_date',
          'title',
          'prize',
          'description'
        ],
        include: [{
          model: status,
          attributes: ['status']
        }, {
          model: user,
          attributes: [
            ['fullname', 'provider']
          ]
        }],
        order: [
          ['announcement', 'DESC']
        ]
      })

      const totalPage = (totalResult < limit) ? 1 : Math.ceil(totalResult.count / limit)

      for (let i = 0; i < result.length; i++) {
        result[i].dataValues.posted = moment(result[i].dataValues.posted.toJSON()).format('dddd, DD MMMM YYYY')
      }
      return res.status(200).json({
        message: "Success",
        totalResult: totalResult.count,
        totalPage: totalPage,
        result: result
      })
    } else {
      res.status(422).json({
        status: "Error"
      })
    }
  }

  async contest(user1, req, res) {
    const result = await contest.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'title',
        'prize',
        'due_date',
        'announcement',
        'description'
      ],
      include: [{
        model: status,
        attributes: ['status']
      }, {
        model: user,
        attributes: [
          ['fullname', 'provider']
        ]
      }]
    })

    return res.status(200).json({
      message: "Success",
      result: result
    })
  }

  async submit(user1, req, res) {
    const contest1 = await contest.findOne({
      where: {
        id: req.params.id_contest
      },
      include: [{
        model: user,
        attributes: [
          ['fullname', 'provider']
        ]
      }]
    })

    const arrayFiles = req.files.map(x => x.filename)
    for (let i = 0; i < arrayFiles.length; i++) {
      await application.create({
        id_contest: req.params.id_contest,
        id_provider: contest1.id_provider,
        id_participant: req.params.id_participant,
        submission: arrayFiles[i],
        description: req.body.description,
        id_status_contest: 1
      })
    }

    const result = await application.findAll({
      where: {
        id_contest: req.params.id_contest,
        id_provider: contest1.id_provider,
        id_participant: req.params.id_participant,
        description: req.body.description,
        id_status_contest: 1
      },
      attributes: [
        'submission',
      ]
    })

    const contestInfo = await application.findOne({
      where: {
        id_contest: req.params.id_contest,
        id_provider: contest1.id_provider,
        id_participant: req.params.id_participant,
        description: req.body.description,
        id_status_contest: 1
      }
    })

    return res.status(200).json({
      message: 'Success',
      contest_title: contest1.title,
      provider: contest1.user.dataValues.provider,
      participant: user1.fullname,
      description: contestInfo.description,
      submission: result
    })


  }

  async myContest(user1,req,res) {

    const page = parseInt(req.query.page);  // Pagination constant
    const limit = 5;
    const offset = (page - 1) * limit;

    if (user1.id_role == 2) {
      const totalResult = await contest.findAndCountAll({
        where:{
          id_provider:user1.id
        }
      })

      const result = await contest.findAll({
        where:{
          id_provider:user1.id
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
      const result = await application.findAll({
        where:{
          id_participant:user1.id
        }
      })

      const totalResult = result.length
      const test = result
      const keep = []

      Object.keys(test).map((key,index) => {
        keep.push(test[key].dataValues.id_contest)
      })

      const id_contests = keep.filter(onlyUnique);

      const finalresult = await contest.findAll({
        where:{
          id:keep
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

      const totalPage = (totalResult < limit) ? 1 : Math.ceil(totalResult/limit)

      for (let i = 0; i < finalresult.length; i++ ) {
        finalresult[i].dataValues.posted = moment(finalresult[i].dataValues.posted.toJSON()).format('dddd, DD MMMM YYYY')
      }

      return res.status(200).json({
        message:"Success",
        totalResult:totalResult,
        totalPage:totalPage,
        result:finalresult
      })
    } else {
      res.status(422).json({
        status:"Error"
      })
    }
  }

  async submission(user1, req, res) {

    const result = await application.findAll({
      where: {
        id_contest: req.params.id_contest
      },
      attributes: [
        'description',
        'submission',
        // 'prize',
        // 'description'
      ],
      include: [{
        model: user,
        attributes: [
          ['fullname', 'participant']
        ]
      }]
    })
    return res.status(200).json({
      message: "Success",
      result: result
    })
  }

  async create(user1, req, res) {
    let createdContest = await contest.create({
      title: req.body.title,
      id_provider: user1.id,
      prize: req.body.prize,
      due_date: req.body.due_date,
      description: req.body.description,
      id_status_contest: 3,
      announcement: req.body.announcement
    })
    let newContest = await contest.findOne({
      where: {
        id: createdContest.id
      },
      attributes: [
        'title',
        'prize',
        'due_date',
        'announcement',
        'description'
      ],
      include: [{
        model: status,
        attributes: ['status']
      }]
    })
    return res.status(200).json({
      message: "Success",
      result: newContest
    })
  }

  async close(user1, req, res) {

    let update = {
      id_status_contest: 2
    }
    //
    await contest.update(update, {
      where: {
        id: req.params.id_contest
      }
    })

    const result = await contest.findOne({
      where: {
        id: req.params.id_contest
      },
      attributes: [
        'title',
        'prize',
        'due_date',
        'announcement',
        'description'
      ],
      include: [{
        model: status,
        attributes: ['status']
      }, {
        model: user,
        attributes: [
          ['fullname', 'provider']
        ]
      }]
    })

    return res.status(200).json({
      message: "Success",
      result: result
    })
  }

  async submissionWinner(user1,req,res) {
    await application.update({
      id_status_contest:4
    },{
      where:{
        id:req.params.id_submission
      }
    })

    const result = await application.findOne({
      where:{
        id:req.params.id_submission
      },
      attributes:[
        'submission',
        "description"
      ],
      include:[{
        model:user,
        attributes:[
          ['fullname','winner']
        ]
      }]
    })

    await application.update({
      id_status_contest:5
    },{
      where:{
        id_provider:req.params.id_provider,
        id: {
          [Op.ne]:req.params.id_submission
        }
      }
    })

    return res.status(200).json({
      message:"Success",
      result:result
    })

  }

  async winner(user1, req, res) {

    const result = await application.findOne({
      where:{
        id_status_contest : 4,
        id_contest : req.params.id_contest
      },
      attributes: [
        'description',
        'submission'
      ],
      include: [{
        model: status,
        attributes: ['status']
      }, {
        model: user,
        attributes:
          [['fullname', 'participant']]
        }]
      })

    return res.status(200).json({
      message: "Winner Aplicant",
      result: result
    })

  }

}

module.exports = new ContestController;
