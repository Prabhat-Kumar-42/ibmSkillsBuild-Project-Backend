const {
  describe,
  test,
  before,
  after,
  beforeEach,
  afterEach,
} = require("node:test");

const assert = require("assert");
const supertest = require("supertest");
const { app } = require("../../app");
const api = supertest(app);

const baseUrl = "/api/user/";
const loginUrl = baseUrl + "login";
const signupUrl = baseUrl + "signup";

const userModel = "User";
const { User } = require("../../models/user.model");
const {
  setUpTestServer,
  tearDownTestServer,
} = require("../../utility/mongoMemoryServer");
const { getMockDataList } = require("../testUtilities/db.testUtility");
const userMockData = getMockDataList(userModel);

describe("User Api Test", () => {
  let mongoServer;
  let serverConnection;
  let userList = [];
  let userSampleData = [];
  let authToken;

  before(async () => {
    const serverInfo = await setUpTestServer();
    mongoServer = serverInfo.mongoServer;
    serverConnection = serverInfo.serverConnection;
  });

  after(async () => {
    await tearDownTestServer(mongoServer, serverConnection);
  });

  beforeEach(async () => {
    userSampleData = userMockData.map((user) => user);
    for (let user of userSampleData) {
      const createdUser = await User.create(user);
      userList.push(createdUser);
    }
    const res = api.post(loginUrl).post(userSampleData[0]);
    authToken = `${res.body.authorization.scheme} ${res.body.authorization.authToken}`;
  });

  afterEach(async () => {
    await User.deleteMany({});
    userList = [];
  });

  describe("Login and SignUp Tests", async () => {
    test("user login", async () => {
      const user = userSampleData[0];
      const response = await api.post(loginUrl).send(user).expect(200);
      assert.ok(response.body.hasOwnProperty("authorization"));
    });
    test("user signup", async () => {
      const user = { ...userSampleData[0], email: "tempmail.com" };
      await api.post(signupUrl).send(user).expect(201);
    });
  });
});
