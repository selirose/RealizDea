const express = require('express');
const passport = require('passport');
const router = express.Router();
const auth = require('../middlewares/auth');
const ContestController = require('../controllers/contestController');
const contestValidator = require('../middlewares/validators/contestValidator');
const upload = require('../middlewares/validators/uploadImage');

router.post('/search/category',[function(req, res, next) {
  passport.authenticate('participant', {
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
    ContestController.searchCat(user, req, res);
  })(req, res, next);
}]);

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

router.get('/my/contest',[function(req, res, next) {
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

router.post('/:id_contest/submit/:id_participant', [upload.multiple, contestValidator.submit, function(req, res, next){
  passport.authenticate('participant',{
    session:false
  }, async function(err, user, info){
    if(!user){
      res.status(401).json({
        status:'Error',
        message:info.message
      });
      return;
    }
    ContestController.submit(user, req, res);
  })(req, res, next);
}])

router.get('/:id_contest/submission', [contestValidator.contestSubmission, function(req, res, next){
  passport.authenticate('user',{
    session:false
  }, async function(err, user, info){
    if(!user){
      res.status(401).json({
        status:'Error',
        message:info.message
      });
      return;
    }
    ContestController.contestSubmission(user, req, res);
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

router.get('/:id_contest/update/close/:id_provider', [contestValidator.contestClose, function(req, res, next){
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
}]);

router.get('/:id_submission/update/winner/:id_provider', [contestValidator.submissionWinner, function(req, res, next){
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
    ContestController.submissionWinner(user, req, res);
  })(req, res, next);
}]);






module.exports = router;
