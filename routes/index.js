const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const mongoose = require('mongoose');
const Vocabulary = require('../models/Vocabulary')


router.get('/',(req,res)=>{

    Vocabulary.find()
    .then((vocabularies)=>{
        console.log(vocabularies);
        res.render('home', {title: 'Home', vocabularies})
    })
    .catch(()=>{
        res.send('Something went wrong!!')
    })
    
});

router.get('/add',(req,res)=>{
    res.render('addWords',{title:'Add a Word'})
})

router.post('/',
[
    check('word').isLength({min:1}).withMessage('Please enter a Word'),
    check('meaning').isLength({min:1}).withMessage('please enter meaning to the word')

],(req,res)=>{

    const errors = validationResult(req);

    if (errors.isEmpty()){
        console.log(req.body);

        const vocabulary = new Vocabulary(req.body);
        vocabulary.save()
        .then(()=>{
            res.send("Word is added to your vocabulary!!");

        })
        .catch(()=>{
            res.send("Sorry, something went wrong!!")
        })
        
        
    }

    else{

        //render and pass title of page, body of the request and array of errors
        // as objects
        console.log(req.body);
        res.render('addWords', {title: "Add Word", errors: errors.array(), data:req.body});
        
    }

    
});

module.exports = router;