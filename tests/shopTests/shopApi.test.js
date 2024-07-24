const {
  describe,
  before,
  after,
  beforeEach,
  afterEach,
  test,
} = require("node:test");
const assert = require("assert");
const supertest = require("supertest");
const { app } = require("../../app");
const api = supertest(app);
const {
  setUpTestServer,
  tearDownTestServer,
} = require("../../utility/mongoMemoryServer");

const _ = require("lodash");

const { getMockDataList } = require("../testUtilities/db.testUtility");
const { Shop } = require("../../models/shop.model");
const shopModel = "Shop";
const userModel = "User";
const shopMockData = getMockDataList(shopModel);
const userMockData = getMockDataList(userModel);

const baseUrl = "/api/shop/";
const signupUrl = "/api/user/signup";
const loginUrl = "/api/user/login";

describe("Shop Api Test", async () => {
  let mongoServer;
  let serverConnection;
  let shopList = [];
  let sampleShopData = [];
  let userSampleData = [];
  let testUserData;
  let testUser;
  let testUserAuthToken;
  before(async () => {
    userSampleData = _.cloneDeep(userMockData);
    testUserData = userSampleData[0];
    const serverInfo = await setUpTestServer();
    mongoServer = serverInfo.mongoServer;
    serverConnection = serverInfo.serverConnection;
    const singUpResponse = await api
      .post(signupUrl)
      .send(testUserData)
      .expect(201);
    const loginResponse = await api
      .post(loginUrl)
      .send(testUserData)
      .expect(200);
    const authResponse = loginResponse.body.authorization;
    testUser = loginResponse.body.user;
    testUserAuthToken = `${authResponse.scheme} ${authResponse.authToken}`;
  });
  after(async () => {
    await tearDownTestServer(mongoServer, serverConnection);
  });
  beforeEach(async () => {
    sampleShopData = _.cloneDeep(shopMockData);
    for (let shop of sampleShopData) {
      shop.ownerId = testUser.id;
      const createdShop = await Shop.create(shop);
      shopList.push(createdShop);
    }
  });
  afterEach(async () => {
    await Shop.deleteMany({});
    shopList = [];
  });
  describe("Getting Shop Data Tests", () => {
    test("fetch all shop data", async () => {
      const response = await api.get(baseUrl).expect(200);
      assert.strictEqual(response.body.length, shopList.length);
    });
  });
});
