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

router.post('/add',
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
            res.render("msgLayout", {title:"Message",msg:'Word is added to your vocabulary!!'});

        })
        .catch(()=>{
            res.render("msgLayout", {title:'message', msg:'Sorry, something went wrong!!'});
        })
        
        
    }

    else{

        //render and pass title of page, body of the request and array of errors
        // as objects
        console.log(req.body);
        res.render('addWords', {title: "Add Word", errors: errors.array(), data:req.body});
        
    }
});

router.post('/delete',
[

    check("deleteWord").isLength({min:1}).withMessage("Please enter a Word to delete")
],(req,res)=>{

    //validation if user entered a word
    const errors = validationResult(req);
    if(errors.isEmpty()){

        console.log(req.body.deleteWord);
        Vocabulary.deleteMany({word:req.body.deleteWord},(error,response)=>{

            console.log(response);
            if (error){
                res.render('msgLayout',{msg:"Something went wrong"})
            }

            else{

                if(response.deletedCount < 1){
                    res.render('msgLayout',{msg: `DELETE FAILED: ${req.body.deleteWord} is not in vocabulary`})
                }

                else{
                    res.render('msgLayout',{msg: ` ${req.body.deleteWord} is deleted from vocabulary`})
                }
                
            }
        })
        // .then(()=>{


        //     res.render('msgLayout',{msg: ` ${req.body.deleteWord} is deleted from vocabulary`})

        // })

        // .catch((error)=>{
        //     console.log("This is error" + error);
        //     res.render('msgLayout',{msg:"delete error"})
        // })

    }

    else{
        res.render("msgLayout", {msg:"Please enter a word to delete"})
    }
    

});
module.exports = router;