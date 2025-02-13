const Post = require('../models/Post.js'); 

class RestApiController {
  async getAllPosts(req, res) {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (err) {
      console.error('Error during getting posts:', err);
      res.status(500).json({ message: 'server error' });
    }
  }
  getPostById(req, res) {
    try {
      const id = req.params.id;
      const post = Post.findById(id);
      res.json(post);
    } catch (err) {
        console.error('Error during getting post:', err);
        res.status(500).json({ message: 'server error' });
    }
  }
  async createPost(req, res) {
    try {
        const { title, content } = req.body;
        const username = req.user ? req.user.username : 'anonymous';
        const imgPath = req.files.image ? `/downloads/img/${req.files.image[0].filename}` : '';
        const songPath = req.files.song ? `/downloads/song/${req.files.song[0].filename}` : '';

        const post = new Post({ title, content, username, img: imgPath, song: songPath });
        await post.save();
        console.log(`Post ${post.title} successfully added!`);
        return res.status(201).json(post);
    } catch (err) {
        console.error('Error during creating post:', err);
        res.status(500).json({ message: 'server error' });
    }
  }
  async updatePost(req, res) {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const post = await Post.findByIdAndUpdate(id, { title, content }, { new: true });
        console.log(`Post ${title} successfully updated!`);
        return res.json(post);
    } catch (err) {
        console.error('Error during updating post:', err);
        res.status(500).json({ message: 'server error' });
    }
  }
  async deletePost(req, res) {
    try {
        const { id } = req.params;
        await Post.findByIdAndDelete(id);
        console.log(`Post successfully deleted!`);
        return res.json({ message: 'Post successfully deleted!' });
    } catch (err) {
        console.error('Error during deleting post:', err);
        res.status(500).json({ message: 'server error' });
    }
  }
}

module.exports = new RestApiController();