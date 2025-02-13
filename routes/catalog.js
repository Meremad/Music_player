const express = require('express');
const Post = require('../models/Post');
const router = express.Router();


router.get('/catalog', (req, res) => {
    post = Post.find()
  res.render('catalog', {posts: post});
});

router.get('/catalog/:id', (req, res) => {
    const post_id = req.params.id;
    const username = req.session.username;
    const post = Post.findById(post_id);
    const post_author = post.author;

    if (username == post_author) {
        res.render('post', {post: post, isAuthor: true});
    } else {
        res.render('post', {post: post, isAuthor: false});
    }
});

router.get('/create', (req, res) => {
    res.render('create');
});

module.exports = router;