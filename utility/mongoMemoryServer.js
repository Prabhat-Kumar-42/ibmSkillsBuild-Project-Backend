const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");

const spinUpMongoServer = async () => {
  const mongoServer = await MongoMemoryServer.create();
  return mongoServer;
};

const setUpTestServer = async () => {
  const mongoServer = await spinUpMongoServer();
  const serverUrl = mongoServer.getUri();
  const serverConnection = await mongoose.connect(serverUrl);
  return { mongoServer, serverConnection };
};

const tearDownTestServer = async (mongoServer, mongoConnection) => {
  if (mongoConnection) await mongoConnection.connection.close();
  if (mongoServer) await mongoServer.stop();
};

module.exports = {
  setUpTestServer,
  tearDownTestServer,
};
