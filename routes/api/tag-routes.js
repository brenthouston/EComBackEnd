const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include:[{
      model: Product
    }]
  }).then(tagData=>{
    res.json(tagData)
  }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:'error occurred',err})
  });
});

router.get('/:id', (req, res) => {
  Tag.findAll({
    where: {
      id:req.params.id
    }
  }).then(tag=>{
    if(tag.length===0){
      return res.status(404).json({msg:"No such tag with this ID in the database.",err})
    }
    res.json(tag)
  }).catch(er=>{
    console.log(err);
    res.status(500).json({msg:"error occured",err})
  })
  
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name:req.body.tag_name
  }).then(newTag=>{
    res.json(newTag)
  }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occured",err})
  });

});

router.put('/:id', (req, res) => {
  Tag.update(req.body,{
    where:{
      id:req.params.id
    }
  }).then(editCategory=>{
    if(!editCategory[0]){
      return res.status(404).json({msg:"No such tag with this ID in database."})
    }
    res.json(editCategory);
  }).catch(err=>{
    console.log("err");
    res.status(500).json({msg:"error occured",err})
  })
 
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where:{
      id:req.params.id
    }
  }).then(delTag=>{
    if(!delTag){
      return res.status(404).json({msg:"No such tag with this ID in database"})
    }
    res.json(delTag);
  }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:'error occured',err})
  })
 
});

module.exports = router;
