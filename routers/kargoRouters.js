const express = require('express');
const router = express.Router();
const {queryKargo, createKargo, cancelKargo} = require('../actions/yurticiActions')

// GET / endpoint'i
router.post('/querykargo', async (req, res) => {
  console.log('body', req.body)  
  const {key} = req.body
  console.log('key', key)
  const resp = await queryKargo(key)
  res.status(200).json(resp)
});
router.post('/createkargo', async (req, res) => {
  console.log('body', req.body)
  const {body} = req
  try{
    const result = await createKargo(body)
    res.status(200).json(result)
  }catch(err){
    console.log('err', err)
    res.status(500).json(err)
  }
})
router.post('/cancelkargo', async (req, res) => {
  console.log('body', req.body)
  const {key} = req.body
  try{
    const result = await cancelKargo(key)
    res.status(200).json(result)
  }catch(err){
    console.log(err)
    res.status(500).json(err)
  }
})
module.exports = router;