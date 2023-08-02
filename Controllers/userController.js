const { User, Thought} = require('../models');

createPromptModule.exports = {
    async allUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async singleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .select('-_v')
            .populate({
                path: "friends",
            })
            .populate({
                path: "thoughts",
            })
            console.log(req.params.userId)
            if (!user) {
                return res.status(404).json({ message: 'Sorry, no user with that ID.' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
            console.log("Hello?");
        } catch (err) {
            res.status(500).json({ error: 'User not created.' });
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                {runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'Sorry, no user with this id.' });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'Sorr, no user with that id.' });
            }

            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User thoughts deleted.' })
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { frineds: req.params.friendId } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'Sorry, no user with this id.' });
            }

            res.json(user);
        } catch( err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'Sorry, no friend with this id.' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};