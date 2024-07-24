const {
  describe,
  before,
  after,
  beforeEach,
  afterEach,
  test,
} = require("node:test");

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
  let testUser;
  let testUserAuthToken;
  before(async () => {
    userSampleData = _.cloneDeep(userMockData);
    testUser = userSampleData[0];
    const serverInfo = await setUpTestServer();
    mongoServer = serverInfo.mongoServer;
    serverConnection = serverInfo.serverConnection;
    const singUpResponse = await api.post(signupUrl).send(testUser);
    const loginResponse = await api.post(loginUrl).send(testUser);
    const authResponse = loginResponse.body.authorization;
    testUserAuthToken = `${authResponse.scheme} ${authResponse.authToken}`;
  });
  after(async () => {
    await tearDownTestServer(mongoServer, serverConnection);
  });
  beforeEach(async () => {
    sampleShopData = _.cloneDeep(shopMockData);
    for (let shop of sampleShopData) {
      const createdShop = await Shop.create(shop);
      shopList.push(createdShop);
    }
  });
  afterEach(async () => {
    await Shop.deleteMany({});
    shopList = [];
  });
});
