const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    Book.find()
     .select('_id title pages author')
      .exec()
        .then( books => {
            
            const response = {
                count: books.length,
                books: books.map(book => {
                    return {
                        _id: book._id,
                        title: book.title,
                        pages: book.pages,
                        author: book.author
                    };
                })
            };    

            res.status(200).json(response);
        })
          .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
          });
});

router.post('/', (req, res, next) => {

    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        pages: req.body.pages,
        author: req.body.author
    });

    book
      .save()
        .then(book => {
            res.status(201).json({
                message: 'Book created successfully',
                createdBook: {
                    _id: book._id,
                    title: book.title,
                    pages: book.pages,
                    author: book.author
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

router.get('/:bookId', (req, res, next) => {
    const id = req.params.bookId;
    Book.findById(id)
     .select('_id title pages author')
      .exec()
        .then(book => {
            if (book) {
                res.status(200).json({
                    book: book,
                });
            } else {
                res.status(404).json({message: 'No valid entry found with this ID'});
            }
            
        })
          .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
          });
});

router.patch('/:bookId', (req, res, next) => {

    var id = req.params.bookId;

    var updateOps = {};

    if (typeof req.body.title !== 'undefined') {
        updateOps['title'] = req.body.title;
    }

    if (typeof req.body.pages !== 'undefined') {
        updateOps['pages'] = req.body.pages;
    }

    if (typeof req.body.author !== 'undefined') {
        updateOps['author'] = req.body.author;
    }

    Book.update({_id:id}, {$set: updateOps})
      .exec()
        .then(book => {
            res.status(200).json({
                message: 'Book was updated'
            });
        })
          .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
          });
});

router.delete('/:bookId', (req, res, next) => {
    const id = req.params.bookId;
    Book.deleteOne({_id: id})
      .exec()
        .then(book => {
            res.status(200).json({
                message: 'Book was deleted',
            });
        })
          .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
          });
});

module.exports = router;