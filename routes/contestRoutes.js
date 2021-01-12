const express = require('express');
const passport = require('passport');
const router = express.Router();
const auth = require('../middlewares/auth');
const ContestController = require('../controllers/contestController');
const contestValidator = require('../middlewares/validators/contestValidator');

router.post('/search/status',[function(req, res, next) {
  passport.authenticate('user', {
    session: false
  }, async function(err, user, info) {
    // if (err) {
    //   return next(err);
    // }
    if (!user) {
      res.status(401).json({
        status: 'Error',
        message: info.message
      });
      return;
    }
    ContestController.searchStat(user, req, res);
  })(req, res, next);
}]);

router.get('/:id',[contestValidator.contest,function(req, res, next) {
  passport.authenticate('all', {
    session: false
  }, async function(err, user, info) {
    // if (err) {
    //   return next(err);
    // }
    if (!user) {
      res.status(401).json({
        status: 'Error',
        message: info.message
      });
      return;
    }
    ContestController.contest(user, req, res);
  })(req, res, next);
}]);

router.get('/mycontest', [function(req, res, next) {
  passport.authenticate('user', {
    session: false
  }, async function(err, user, info) {
    // if (err) {
    //   return next(err);
    // }
    if (!user) {
      res.status(401).json({
        status: 'Error',
        message: info.message
      });
      return;
    }
    ContestController.myContest(user, req, res);
  })(req, res, next);
}]);

router.post('/create',[contestValidator.create, function(req, res, next) {
  passport.authenticate('provider', {
    session: false
  }, async function(err, user, info) {
    // if (err) {
    //   return next(err);
    // }
    if (!user) {
      res.status(401).json({
        status: 'Error',
        message: info.message
      });
      return;
    }
    ContestController.create(user, req, res);
  })(req, res, next);
}]);

router.get('/:id/update/close', [contestValidator.contest, function(req, res, next){
  passport.authenticate('provider',{
    session:false
  }, async function(err, user, info){
    if(!user){
      res.status(401).json({
        status:'Error',
        message:info.message
      });
      return;
    }
    ContestController.updateClose(user, req, res);
  })(req, res, next);
}])


module.exports = router;
