const Article = require('../models/article.model');
const Category = require('../models/category.model');

exports.list = (req, res)=>{
    Article.find()
  .then((articles)=>{
    //res.status(200).json(articles);
    res.render('index', { title: 'Express', articles: articles })
  })
  .catch((err)=>{
    res.status(200).json(err);
  });
}

exports.show = (req, res)=>{
    //console.log(req.params.id);
    Article.findOne({_id: req.params.id})
    .then((article)=>{
      res.render('single-article',{article: article})
      //console.log(article);
    })
    .catch((err)=>{
      res.redirect('/');
      //console.log(err);
    });
  }

  exports.add = (req, res)=>{
      Category.find()
      .then((categories)=>{
        res.render('add-article',{categories: categories});
      })
      .catch(()=>{
          res.redirect('/');
      });
      
  }

  exports.addOne = (req, res)=>{
   
    var article = new Article({
      ...req.body,
      image: `${req.protocol}://${req.get('host')}/images/articles/${req.file.filename}`,
      publishedAt: Date.now()
    });

   article.save((err, article)=>{
      if(err){
        console.log(err);
        Category.find()
        .then((categories)=>{
          res.render('add-article', {categories: categories,error: "Sorry, an error has occurred. Thank you try again later"});
        })
        .catch(()=>{
          res.redirect('/');
        });
        
      }else{
        console.log(article);
        Category.find()
        .then((categories)=>{
          res.render('add-article', {categories: categories,success: "Thank you, your article has been added"})
        })
        .catch(()=>{
          res.redirect('/');
        });
       
      }
    });
   
    
  }

