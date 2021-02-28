// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const mongoose = require("mongoose");

const isBoardOwner = async (context) => {
  let boardId = context.params.query.boardId || context.data.boardId;

  if (!boardId) {
    return context;
  }

  const _id = context.params.user._id;

  const boards = mongoose.model("boards");
  const board = await boards.findOne({ _id: boardId });

  if (board) {
    if (board.ownerId.toString() === _id.toString()) {
      return context;
    } else {
      throw new Error("Un-authorized");
    }
  }
  return context;
};

module.exports = {
  isBoardOwner,
};
