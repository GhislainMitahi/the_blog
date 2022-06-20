const Article = require('../models/article.model');
const Category = require('../models/category.model');
const fs = require('fs')

exports.listArticle = (req, res)=>{
    Article.find()
  .then((articles)=>{
    //res.status(200).json(articles);
    req.flash('success', 'Test ok');
    res.render('index', { title: 'Express', articles: articles })
  })
  .catch((err)=>{
    res.status(500).json(err);
  });
}

exports.showArticle = (req, res)=>{
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

  exports.addArticle = (req, res)=>{
      Category.find()
      .then((categories)=>{
        res.render('add-article',
        {categories: categories})
      })
      .catch(()=>{
          res.redirect('/');
      });
      
  }

  exports.addOneArticle = (req, res)=>{
   
    var article = new Article({
      ...req.body,
      image: `${req.protocol}://${req.get('host')}/images/articles/${req.file.filename}`,
      publishedAt:  Date.now()
    });

   article.save((err, article)=>{
      if(err){
        req.flash('error', 'Sorry, an error has occurred. Thank you try again later')
        return res.redirect('/add-article');
    }
    req.flash('success', 'Thank you, your article has been added')
    return res.redirect("/add-article");

    });
   
    
  }

  exports.editArticle = (req, res) => {
    const id = req.params.id;
    Article.findOne({_id: id}, (err, article)=>{
if(err){
  req.flash('error', err.message);
  return res.redirect('/');
}
Category.find((err, categories)=>{
  if(err){
    req.flash(error, err.message);
  }
  return res.render('edit-article', {categories: categories, article: article});
})
    })
  }

  exports.editOneArticle = (req, res) => {
    const id = req.params.id;
       Article.findOne({_id: id}, (err, article)=>{
         if(err){
           req.flash('error', err.message);
           return res.redirect("/edit-article/"+id);
         }

         if(req.file){
          console.log("le voici : " + req.file);
          const filename = article.image.split('/articles/')[1];
          fs.unlink(`pubic/images/articles/${filename}`,()=>{
            console.log('Deleted : '+filename);
          })
      }

         article.title = req.body.title ? req.body.title : article.title;
         article.category = req.body.category ? req.body.category : article.category;
         article.content = req.body.content ? req.body.content : article.content;
         article.image = req.file ? `${req.protocol}://${req.get('host')}/images/articles/${req.file.filename}` : article.image;
       
  article.save((err, article) => {
    if(err){
      req.flash('error', err.message);
      return res.redirect('/edit-article/'+id);
    }

    req.flash('success', 'Cool, the article has been edited !');
    return res.redirect('/edit-article/'+id);
  })
})
}

//   Category.find()
//   .then((categories)=>{ 
//     res.render('add-article', {categories: categories,error: "Sorry, an error has occurred. Thank you try again later"});
//   })
//   .catch(()=>{
//     res.redirect('/');
//   });
  
// }else{
//   // console.log(article);
//   Category.find()
//   .then((categories)=>{
//     res.render('add-article', {categories: categories,success: "Thank you, your article has been added"})
//   })
//   .catch(()=>{
//     res.redirect('/');
//   });