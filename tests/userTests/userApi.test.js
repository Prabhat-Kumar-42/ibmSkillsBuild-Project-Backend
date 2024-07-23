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
const {
  getMockDataList,
  dataInDB,
} = require("../testUtilities/db.testUtility");
const userMockData = getMockDataList(userModel);

describe("User Api Test", () => {
  let mongoServer;
  let serverConnection;
  let userList = [];
  let userSampleData = [];
  let testUser;
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
    testUser = userSampleData[0];
    const res = await api.post(loginUrl).send(testUser);
    authToken = `${res.body.authorization.scheme} ${res.body.authorization.authToken}`;
  });

  afterEach(async () => {
    await User.deleteMany({});
    userList = [];
  });

  describe("Login and SignUp Tests", async () => {
    test("user login", async () => {
      const user = testUser;
      const response = await api.post(loginUrl).send(user).expect(200);
      assert.ok(response.body.hasOwnProperty("authorization"));
    });
    test("user signup", async () => {
      const user = { ...testUser, email: "tempmail.com" };
      await api.post(signupUrl).send(user).expect(201);
      const dataDb = await dataInDB(userModel);
      assert.strictEqual(dataDb.length, userList.length + 1);
    });
  });
  describe("User Tests", async () => {
    test("get user", async () => {
      const userUrl = baseUrl + userList[0]._id.toString();
      await api.get(userUrl).expect(200);
    });
    test("delete user", async () => {
      await api
        .delete(baseUrl)
        .set("Authorization", authToken)
        .send(testUser)
        .expect(204);
    });
    test("update user", async () => {
      const user = {
        ...testUser,
        name: "Orochimaru",
        dob: "1905-5-23",
      };
      const response = await api
        .put(baseUrl)
        .set("Authorization", authToken)
        .send(user)
        .expect(200);
      const updatedUser = response.body.user;
      delete updatedUser.id;
      delete user.password;
      user.dob = new Date(user.dob).toJSON();
      assert.deepStrictEqual(updatedUser, user);
    });
  });
});
