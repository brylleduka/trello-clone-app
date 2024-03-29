import feathersClient, {
  makeServicePlugin,
  BaseModel,
} from "../../feathers-client";

class Card extends BaseModel {
  constructor(data, options) {
    super(data, options);
  }
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = "Card";
  // Define default properties here
  static instanceDefaults() {
    return {
      title: "",
      description: "",
      order: 0,
      listId: "",
      boardId: "",
      members: [],
      archived: false,
    };
  }

  // Updates `data.list` to be an instance of the `User` class.
  static setupInstance(data, { models }) {
    if (data.listId) {
      data.list = new models.api.List({ _id: data.listId });
    }

    return data;
  }
}
const servicePath = "cards";
const servicePlugin = makeServicePlugin({
  Model: Card,
  service: feathersClient.service(servicePath),
  servicePath,
});

// Setup the client-side Feathers hooks.
feathersClient.service(servicePath).hooks({
  before: {
    all: [],
    find: [],
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
});

export default servicePlugin;
