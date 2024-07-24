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
const { itemSampleData } = require("../testUtilities/mockData/itemSampleData");
const { Item } = require("../../models/item.model");

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

const setUpShop = async (shopData, userAuthToken) => {
  shopData.coordinates = _.cloneDeep(shopData.geoLocation.coordinates);
  delete shopData.geoLocation;

  const createShopResponse = await api
    .post(shopBaseUrl)
    .set("authorization", userAuthToken)
    .send(shopData)
    .expect(201);
  const authorization = createShopResponse.body.authorization;
  const shop = createShopResponse.body.shop;
  const authToken = `${authorization.scheme} ${authorization.authToken}`;
  return { shop, authToken };
};

describe("Item Api Test", async () => {
  let mongoServer;
  let serverConnection;
  let itemList = [];
  let testUser;
  let testUserAuthToken;
  let itemSampleData = [];
  let testShop;
  let testItemData;
  let testItem;

  before(async () => {
    const serverInfo = await setUpTestServer();
    mongoServer = serverInfo.mongoServer;
    serverConnection = serverInfo.serverConnection;
    const testUserInfo = await setUpTestUser(userSampleData[0]);
    testUser = testUserInfo.user;
    testUserAuthToken = testUserInfo.userAuthToken;
    const testShopInfo = await setUpShop(shopMockData[0], testUserAuthToken);
    testShop = testShopInfo.shop;
    testUserAuthToken = testShopInfo.authToken;
  });
  after(async () => {
    await tearDownTestServer(mongoServer, serverConnection);
  });
  beforeEach(async () => {
    itemSampleData = _.cloneDeep(itemMockData);
    for (let item of itemSampleData) {
      item.shopId = testShop.id;
      const createdItem = await Item.create(item);
      itemList.push(createdItem);
    }
    testItem = itemList[0];
    testItemData = itemSampleData[0];
  });
  afterEach(async () => {
    await Item.deleteMany({});
    itemList = [];
  });

  describe("Public Routes Tests", async () => {
    test("get all items", async () => {
      const response = await api.get(itemBaseUrl).expect(200);
      assert.strictEqual(response.body.length, itemList.length);
    });
    test("get specific item", async () => {
      const itemUrl = itemBaseUrl + testItem._id;
      const response = await api.get(itemUrl).expect(200);
      assert.deepStrictEqual(response.body, testItem.toJSON());
    });
  });

  describe("Authorized Access Test", () => {
    test("item creation test", async () => {
      await api
        .post(itemBaseUrl)
        .set("Authorization", testUserAuthToken)
        .send(testItemData)
        .expect(201);
    });
  });
});
