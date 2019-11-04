/**
 *  route index
 */

const express = require('express');
const router = express.Router();
const path = require('path');

var BlockchainService = require('../common/blockchain-service');
var service = new BlockchainService();
var utils = require('fabric-client/lib/utils.js');
var logger = utils.getLogger('index');
let util = require('../util/util');
var passport = require('./passport');
router.get('/login',(req,res)=>{
    res.render('login.html');
})

router.post('/login',
passport.authenticate('local',{successRedirect:'/',failureRedirect:'/login'})
);


router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/login');
})
router.get('/',(req,res)=>{
    console.log(req.session.passport.user);
    res.render('index.html');
})
router.put('/api/house',(req,res)=>{
    let house = req.body;
    console.log(JSON.stringify(house));
    service.invoke(util.getUser(req).id,'UpdateHouse',[JSON.stringify(house)],false)
    .then((result)=>{
        res.json(result)
    },(err)=>{
        logger.error('/api/house/errorr 에러')
        res.status(500).json(err);
    })
})
router.get('/api/user',(req,res)=>{
    res.json(util.getUser(req));
})
router.get('/transferhouse',isAuthenticated,(req,res)=>{
    res.render('transfer.html');
})
router.post('/api/user/house', (req, res) => {
    const DOUBLE_QUOTE = '"';
    let house = req.body;
    service.invoke(util.getUser(req).id,'TransferHouse',[DOUBLE_QUOTE + house.Id + DOUBLE_QUOTE,
      DOUBLE_QUOTE + house.OwnerId + DOUBLE_QUOTE],false)
    .then((resp) => {
      res.json(resp);
    },(err) => {
      logger.error('Failed to invoke: ' + JSON.stringify(err));
      res.status(500).json(err);
    });
  });

router.post('/api/house',(req,res)=>{
    let house = req.body;
    logger.info(util.getUser(req).id);
    service.invoke(util.getUser(req).id,'AddHouse',[JSON.stringify(house)],false)
    .then((result)=>{
        res.json(result);
    },(err)=>{
        logger.error("/api/house에러")
        res.status(500).json(err);
    })
});
router.get('/house',isAuthenticated,(req,res)=>{
    res.render('list.html');
})

router.get('/api/house',isAuthenticated,(req,res)=>{
    const DOUBLE_QUOTE = '"';
    console.log(typeof req.params.id);
    service.query(util.getUser(req).id,'ListOwnerIdHouses',[JSON.stringify(util.getUser(req).id)],false)
    .then((result)=>{
        console.log(result);
        res.json(result);
    },(err)=>{
        logger.error("/api/house/id에러");
        res.status(500).json(err);
    })
})

router.get('/api/houses',isAuthenticated,(req,res)=>{
    service.query(util.getUser(req).id,'ListHouses',[])
    .then((result)=>{
        res.json(JSON.parse(result.result));
    })
})

router.get('/user',(req,res)=>{
    res.render('user.html');
})
function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}
module.exports = router;