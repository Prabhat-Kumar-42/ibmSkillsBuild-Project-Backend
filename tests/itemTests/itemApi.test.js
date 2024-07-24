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

const {
  getMockDataList,
  dataInDB,
} = require("../testUtilities/db.testUtility");
const { userSampleData } = require("../testUtilities/mockData/userSampleData");

const itemModel = "Item";
const shopModel = "Shop";
const userModel = "User";
const itemMockData = getMockDataList(itemModel);
const shopMockData = getMockDataList(shopModel);
const userMockData = getMockDataList(userModel);

const itemBaseUrl = "/api/item/";
const shopBaseUrl = "/api/shop/";
const signupUrl = "/api/user/signup";
const loginUrl = "/api/user/login";

const setUpTestUser = async (userData) => {
  const singUpResponse = await api.post(signupUrl).send(userData).expect(201);
  const loginResponse = await api.post(loginUrl).send(userData).expect(200);
  const authResponse = loginResponse.body.authorization;
  const user = loginResponse.body.user;
  const userAuthToken = `${authResponse.scheme} ${authResponse.authToken}`;
  return { user, userAuthToken };
};

const setUpShop = async (shopData, authToken) => {
  shopData.coordinates = _.cloneDeep(shopData.geoLocation.coordinates);
  delete shopData.geoLocation;

  const createShopResponse = await api
    .post(shopBaseUrl)
    .set("authorization", authToken)
    .send(shopData)
    .expect(201);
  const authorization = createShopResponse.body.authorization;
  const newToken = `${authorization.scheme} ${authorization.authToken}`;
  return newToken;
};

describe("Item Api Test", async () => {
  let mongoServer;
  let serverConnection;
  let itemList = [];
  let testUser;
  let testUserAuthToken;

  before(async () => {
    const serverInfo = await setUpTestServer();
    mongoServer = serverInfo.mongoServer;
    serverConnection = serverInfo.serverConnection;
    const testUserInfo = await setUpTestUser(userSampleData[0]);
    testUser = testUserInfo.user;
    testUserAuthToken = testUserInfo.userAuthToken;
    testUserAuthToken = await setUpShop(shopMockData[0], testUserAuthToken);
  });
  after(async () => {
    await tearDownTestServer(mongoServer, serverConnection);
  });
});
