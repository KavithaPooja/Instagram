// design an express backend for instagram posts
//Initialize express and mongoose

const express = require('express');

const app = express();

app.use(express.json());

const mongoose = require('mongoose');

// Create a schema for posts
const postSchema = new mongoose.Schema({
    image:String,
    caption:String,
    comments:{
        type:[String],
        default:[]
    },
    likes:{
        type:Number,
        default:0
    }
});

//create a model for posts
const Post = mongoose.model('Post',postSchema);


//1) create a route for getting all posts

app.get('/posts',async(req,res)=>{
    const post = await Post.find({});
    res.send(post);
});


//2) create a route for getting a single post

app.get('/posts/:id', async(req,res)=>{
    const id = req.params.id;
    const post = await Post.findById(IDBRequest);
    res.send(post);
});

//3) create a route for creating a post

app.post('/posts', async(req,res)=>{
    const image  = req.body.image;
    const caption = req.body.caption;
    const post = new Post({
        image:image,
        caption:caption
    });

    await post.save();
    res.send(post);
});

//4) create a route for updating a post

app.put('/posts/:id', async(req,res)=>{
    const id =req.params.id;
    const caption = req.body.caption;
    const post = await Post.findById(id);
    post.caption = caption;
    await post.save();
    res.send(post);

});

//5) create a route for deleting a post

app.delete('/posts/:id',async (req,res)=>{
    const id = req.params.id;
    await Post.findByIdAndDelete(id);
    res.send('posts Deleted Successfully');
}
);

//6) create a route for liking a post

app.put('/posts/:id/likes', async(req,res)=>{
    const id =req.params.id;
    
    const post = await Post.findById(id);
    post.likes = post.likes+1;
    await post.save();
    res.send(post);

});

//7) create a route for unliking a post
app.put('/posts/:id/unlikes', async(req,res)=>{

    const id =req.params.id;
    
    const post = await Post.findById(id);
    post.likes = post.likes-1;
    await post.save();
    res.send(post);

});


//8) create a route for commenting on a post

app.put('/posts/:id/comment', async(req,res)=>{
    const id =req.params.id;
    const comment = req.body.comment;
    const post = await Post.findById(id);
    post.comments.push(comment);
    await post.save();
    res.send(post);

});

//9) create a route for getting all comments on a post

app.get('/posts/:id/comments', async (req,res)=>{
    const id = req.params.id;
    const post = await Post.findById(id);
    res.send(post.comments);
});
//10) create a route for getting all likes on a post

app.get('/posts/:id/likes', async (req,res)=>{
    const id = req.params.id;
    const post = await Post.findById(id);
    res.status(200).send(post.likes);
});

//listen on port 3000, start the server and connect to the database

app.listen(3000,()=>{
    console.log('Server Started on port 3000');
    mongoose.connect("mongodb+srv://Kavitha_T:Kavitha%40212005@kavitha.ua92bgn.mongodb.net/ ").then(() => {
        console.log("Connected to the database!");
    })
});