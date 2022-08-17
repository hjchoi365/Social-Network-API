const { Thoughts, User } = require('../models');

module.exports = {

  getThoughts(req, res) {
    Thoughts.find()
      .then(info => res.json(info))
  },

  getThoughtById(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },

  createThoughts(req, res) {
    Thoughts.create(req.body)
      .then((thoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { thoughts: thoughtData_id } },
          { new: true }
        )
      })
      .then((userData) => {
        return res.status(404).json({ message: 'No user found!' });

      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  deleteThoughts(req, res) {
    Thoughts.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: 'No thought with ID' })
          : User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
          )

      )
      .then((userData) =>
        !userData
          ? res.status(404).json({
            message: 'Thought deleted, but no user found',
          })

          : res.json({ message: 'thought deleted!' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updateThoughts(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: 'No thoughts with this id!' })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },

  createReaction(req, res) {
    console.log("reaction!");
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )

      .then((thoughtData) => {
        if (!thoughtData) {

          return res.status(404).json({ message: 'No thought found!' });
        }
        return res.status(200).json(thoughtData)

      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  removeReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: 'No reaction with this id!' })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },

};





