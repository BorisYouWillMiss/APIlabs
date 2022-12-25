import PostModel from '../models/Post.js';

export const getLastTags = async (req, res) => {
    try{
        const posts = await PostModel.find().limit(5).exec();

        const tags = posts.map((obj) => obj.tags).flat().slice(0, 5);

        res.json(tags);
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get tags',
        });
    }
};

export const getAll = async (req, res) => {
    try{
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts);
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get articles',
        });
    }
};

export const getOne = async (req, res) => {
    console.log("Get ogsgfsgfsne post");
    try{
        console.log("Get one post");
        const postId = req.params.id;
        
        PostModel.findOneAndUpdate(
            {
                _id: postId,
            }, 
            {
                $inc: { viewsCount: 1 },
            },
            {
                returnDocument: 'after',
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Failed to get the article try',
                    });
                }

                if (!doc) {
                    console.log("404 error");
                    return res.status(404).json({
                        message: 'Article not found',
                    });
                }

                res.json(doc);
            },
        ).populate('user');

    } 
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get the article',
        });
    }
};

export const remove = async (req, res) => {
    try{
        const postId = req.params.id;

        PostModel.findOneAndDelete({
            _id: postId,
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Failed to delete the article',
                });
            }

            if (!doc) {
                return res.status(404).json({
                    message: 'Article not found',
                });
            }

            res.json({
                success: true,
            });

        });
        
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get the article',
        });
    }
};

export const create = async (req, res) => {
    console.log("Post try");
    try{

        console.log("Post create attempt");
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(','),
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Article creation failed',
        });
    }
};

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne({
                _id: postId,
            }, 
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                user: req.userId,
                tags: req.body.tags.split(','),
            },
        );

        res.json({
            success: true,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Article update failed',
        });
    }
}