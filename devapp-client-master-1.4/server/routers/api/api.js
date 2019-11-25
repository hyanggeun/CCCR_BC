let config = require("config");
const express = require('express');
const router = express.Router();
var BlockchainService = require('../../common/blockchain-service');
var service = new BlockchainService();
var utils = require('fabric-client/lib/utils.js');
var logger = utils.getLogger('index');
let util = require('../../util/util');
 let CONFIG = config.asset;

  
router.get('/blocks', async (req, res) => {
    try {
      const blocks = await service.getBlocks("hyanggeun");
      res.json(blocks);
    } catch (e) {
      res.json({ error: 'Error accessing blockchain.'});
    }
});

router.get('/txList', async (req, res) => {
    try {
      const blocks = await service.getTxs("hyanggeun");
      if(req.query.houseId){
        const houseId = req.query.houseId;
        const result = blocks.filter(e=>e.Id === houseId)
        res.json(result);
      }
      res.json(blocks);
    } catch (e) {
      res.json({ error: 'Error accessing blockchain.'});
    }
});

router.post('/id', async (req, res) => {
    try {
      const blocks = await service.getBlocks(util.getUser(req).id);
      res.json(blocks);
    } catch (e) {
      res.json({ error: 'Error accessing blockchain.'});
    }
});

router.get('/house',(req,res)=>{
    const DOUBLE_QUOTE = '"';
    console.log(util.getUser(req).id)
    service.query(util.getUser(req).id,'ListOwnerIdHouses',[JSON.stringify(util.getUser(req).id)],false)
    .then((result)=>{
        console.log(result);
        res.json(result);
    },(err)=>{
        logger.error("/api/house/id에러");
        res.status(500).json(err);
    })
})
router.get('/house/:id',(req,res)=>{
    var page_num = parseInt(req.params.id,10);
    console.log(page_num);
    service.query(util.getUser(req).id,'ListOwnerIdHouses',[JSON.stringify(util.getUser(req).id)],false)
    .then((result)=>{
        var result = JSON.parse(result['result']);
        var total_num = result.length;
        var total_page = Math.floor((total_num-1)/4) +1;
        var section_num = Math.floor((page_num-1)/5)+1;
        var total_section = Math.floor((total_page-1)/5)+1;
        var is_last_section = false;
        if(section_num === total_section){
            is_last_section = true;
        }
        var is_first_section = false;
        if(section_num === 1){
            is_first_section=true;
        }
        var is_first_page = false;
        if(page_num === 1){
            is_first_page=true;
        }
        var is_last_page = false;
        if(page_num === total_page){
            is_last_page=true;
        }
        var return_result = [];
        var page = (total_num-1)-4*(page_num-1);
        for(var i=page;i>page-4;i--){
            if(i>=0){
                return_result.push(result[i]);
            }
        }
        var return_json = {
            'result': return_result,
            'total_page': total_page,
            'total_num': total_num,
            'section_num': section_num,
            'page_num': page_num,
            'is_last_page': is_last_page,
            'is_first_page': is_first_page,
            'is_last_section': is_last_section,
            'is_first_section': is_first_section
        }
        res.json(return_json);
    },(err)=>{
        logger.error("/api/house/id에러");
        res.status(500).json(err);
    })
})


router.put('/house',(req,res)=>{
    let house = req.body;
    service.invoke(util.getUser(req).id,'UpdateHouse',[JSON.stringify(house)],false)
    .then((result)=>{
        res.json(result)
    },(err)=>{
        logger.error('/api/house/errorr 에러')
        res.status(500).json(err);
    })
})

router.post('/house',(req,res)=>{
    let house = req.body;
    console.log(house['Timestamp']);
    console.log(typeof now_date);
    var now_date = new Date(house['Timestamp']);
    now_date.setHours(now_date.getHours()+9);
    house['Timestamp'] = now_date;
    service.invoke(util.getUser(req).id,'AddHouse',[JSON.stringify(house)],false)
    .then((result)=>{
        res.json(result);
    },(err)=>{
        logger.error("/api/house에러")
        res.status(500).json(err);
    })
});

router.get('/houses',isAuthenticated,(req,res)=>{
    service.query(util.getUser(req).id,'ListHouses',[])
    .then((result)=>{
        res.json(result);
    })
})
router.get('/houses/:id',(req,res)=>{
    var page_num = parseInt(req.params.id,10);
    service.query(util.getUser(req).id,'ListHouses',[])
    .then((result)=>{
        var result = JSON.parse(result['result']);
        var total_num = result.length;
        var total_page = Math.floor((total_num-1)/4)+1;
        var section_num = Math.floor((page_num-1)/5)+1;
        var total_section = Math.floor((total_page-1)/5)+1;
        var is_last_section = false;
        if(section_num === total_section){
            is_last_section = true;
        }
        var is_first_section = false;
        if(section_num === 1){
            is_first_section=true;
        }
        var is_first_page = false;
        if(page_num === 1){
            is_first_page=true;
        }
        var is_last_page = false;
        if(page_num === total_page){
            is_last_page=true;
        }

        var return_result = [];
        var page = (total_num-1)-4*(page_num-1);
        for(var i=page;i>page-4;i--){
            if(i>=0){
                return_result.push(result[i]);
            }
        }
        var return_json = {
            'result': return_result,
            'total_page': total_page,
            'total_num': total_num,
            'section_num': section_num,
            'page_num': page_num,
            'is_last_page': is_last_page,
            'is_first_page': is_first_page,
            'is_last_section': is_last_section,
            'is_first_section': is_first_section
        }
        res.json(return_json);
    },(err)=>{
        logger.error("/api/house/id에러");
        res.status(500).json(err);
    })
})
router.get('/user',(req,res)=>{
    res.json(util.getUser(req).name);
})

router.get('/users',(req,res)=>{
    let resp = [];
   for(let user in CONFIG.users){
       if(user !== 'admin'){
         resp.push({'result': user});
       }
   }
   console.log(JSON.stringify(resp));
   res.json(resp);
})

router.post('/user/house', (req, res) => {
    const DOUBLE_QUOTE = '"';
    let house = req.body;
    console.log(JSON.stringify(house));
    var now_date = new Date(house['Timestamp']);
    now_date.setHours(now_date.getHours()+9);
    console.log("now date : ",now_date);
    house.Timestamp = now_date.toISOString();
    console.log("house_JSON :" ,house.Timestamp);
    console.log([[DOUBLE_QUOTE + house.Id + DOUBLE_QUOTE,
        DOUBLE_QUOTE + house.OwnerId + DOUBLE_QUOTE, DOUBLE_QUOTE+house.Price+DOUBLE_QUOTE, DOUBLE_QUOTE+house.Timestamp+DOUBLE_QUOTE]]);
    service.invoke(util.getUser(req).id,'TransferHouse',[DOUBLE_QUOTE + house.Id + DOUBLE_QUOTE,
      DOUBLE_QUOTE + house.OwnerId + DOUBLE_QUOTE, DOUBLE_QUOTE+house.Price+DOUBLE_QUOTE,DOUBLE_QUOTE+house.Timestamp+DOUBLE_QUOTE],false)
    .then((resp) => {
      console.log("성공함 /user/house");
      res.json(resp);
    },(err) => {
      logger.error('Failed to invoke: ' + JSON.stringify(err));
      res.status(500).json(err);
    });
  });

  function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;
