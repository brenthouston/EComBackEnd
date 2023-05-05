const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [{
      model: Product
    }]
  }).then(categoryData =>{
    res.json(categoryData)
  }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred",err})
  })

});

router.get('/:id', (req, res) => {
  Category.findAll({
    where:{
      id:req.params.id
    }
  }).then(category=>{
    if(category.length===0){
      return res.status(404).json({msg:"no category with this ID in database."})
    }
    res.json(category)
  }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occured".err})
  })
 
});

router.post('/', (req, res) => {
  Category.create({
    category_name:req.body.category_name,
}).then(newCategory=>{
    res.json(newCategory)
   
}).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred",err})
})
});

router.put('/:id', (req, res) => {
  Category.update({
    id:req.body.id,
    category_name:req.body.category_name
  },{
    where:{
      id:req.params.id
    }
  }).then(editCategory=>{
    if(!editCategory[0]){
      return res.status(404).json({msg:"No category with this ID present in database."})
    }
    res.json(editCategory);
  }).catch(err=>{
    console.log("err");
    res.status(500).json({msg:"error occured",err})
  })
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where:{
      id:req.params.id
    }
  }).then(delCategory=>{
      if(!delCategory){
        return res.status(404).json({msg:'No category with this ID present in database'})
      }
      res.json(delCategory)
    }).catch(err=>{
      console.log(err);
      res.status(500).json({msg:'error occured',err})
    })
});

module.exports = router;
