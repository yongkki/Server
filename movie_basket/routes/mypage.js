var express = require('express');
var Mypage = require('../models/mypage');
var router = express.Router();

// 4-a.마이페이지 메인
// 마이페이지 기본 화면을 띄워준다.
router.get('/', function(req, res, next) {
    var mypageInfo =
    {
        member_name : req.session.member_name
    };

    res.status(200).send({result : mypageInfo});
  /*
  Mypage.showMypages(mypageInfo, function (error, results) {
    if(error) {
      console.log("Connection error " + error);
      res.send(error);
    }
    else {
      res.status(201).send({result : results});
    }
  });
  */
});

// 4-b. 담은 바스켓 조회
router.get('/basket', function(req, res, next) {
    var mypageInfo =
    {
        member_id : req.session.member_id
    };

    Mypage.movieBasket(mypageInfo, function(error, results) {
        if(error) {
            console.log("Connection error " + error);
        }
        else {
            res.status(201).send({result : results});
        }
    });
});

// 4-c.담은 영화
router.get('/movie/cart', function(req, res, next) {
  var mypageInfo = {
    member_id : req.session.member_id
  }

  Mypage.movieCart(mypageInfo, function(error, results) {
    if(error) {
      console.log("Connection error " + error);
    }
    else {
      res.status(201).send({result : results});
    }
  });
});

// 4-d. 추천한 영화
router.get('/movie/recommend', function(req, res, next) {
    var mypageInfo = {
        member_id : req.session.member_id
    }

    Mypage.movieRecommend(mypageInfo, function(error, results) {
        if(error) {
            console.log("Connection error " + error);
        }
        else {
            res.status(201).send({result : results});
        }
    });
});

// 4-e. 마이페이지 환경설정
router.get('/setting', function (req, res, next) {
    var settingInfo =
    {
        member_name : req.session.member_name,
        member_email : req.session.member_email
    };

    if (!settingInfo.member_name) {
        res.sendStatus(500);
    }
    res.status(200).send({result : settingInfo});
});

module.exports = router;
