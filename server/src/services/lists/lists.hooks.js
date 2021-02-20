const { authenticate } = require("@feathersjs/authentication").hooks;
const mongoose = require("mongoose");

async function isBoardOwner(context) {
  const { boardId } = context.params.query;
  const _id = context.params.user._id;

  const boards = mongoose.model("boards");
  const board = await boards.findOne({ _id: boardId });

  if (board) {
    if (board.ownerId.equals(_id)) {
      return context;
    } else {
      return Promise.reject(new Error("Unauthorized"));
    }
  }

  return context;
}

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [isBoardOwner],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
