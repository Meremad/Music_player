const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

router.get('/catalog', async (req, res) => {
    const posts = await Post.find();
    res.render('catalog', { posts: posts });
});

router.get('/catalog/:id', async (req, res) => {
    const post_id = req.params.id;
    const username = req.session.username;
    const post = await Post.findById(post_id);
    const post_author = post.username;

    if (username == post_author) {
        res.render('post', { post: post, isAuthor: true });
    } else {
        res.render('post', { post: post, isAuthor: false });
    }
});

router.get('/create', (req, res) => {
    res.render('create');
});

module.exports = router;