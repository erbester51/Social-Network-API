const {User, Thought} = require('../Models');

module.exports = {
    async allThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async singleThought(req, res) {
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId})

            if (!thought) {
                return res.status(404).json({ message: 'There is no thought with that ID'});
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            await User.findOneAndUpdate(
                {_id: req.body.userId},
                {$push: { thoughts: thought._id } },
                { new: true }
            );
            res.json({ message: 'Thought added to User.' })
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true}
            );

            if (!thought) {
                return res.status(404).json({ message: 'Sorry, no thought with this id.'});
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'Sorry, no thought with that id.' });
            }
            res.json({ message: 'Thought deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'Sorry, no thought with this id.' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    
    async deleteReaction (req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: req.params.reactionId } },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'Sorry, no thought with this id.' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};