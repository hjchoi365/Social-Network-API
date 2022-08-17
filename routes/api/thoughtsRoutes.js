const router = require('express').Router();
const {
  getThoughts,
  createThoughts,
  getThoughtById,
  updateThoughts,
  deleteThoughts,
  createReaction,
  removeReaction
  
} = require('../../controllers/thoughtController');



router.route('/').get(getThoughts).post(createThoughts);

router.route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThoughts)
  .delete(deleteThoughts);

router.route('/:thoughtId/reactions').post(createReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
