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

const {
  setUpTestUser,
  setUpShop,
} = require("../testUtilities/setup.testUtility.js");

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
  let otherUser;
  let otherShop;
  let otherUserAuthToken;

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

    const otherUserInfo = await setUpTestUser(userSampleData[1]);
    otherUser = otherUserInfo.user;
    otherUserAuthToken = otherUserInfo.userAuthToken;
    const otherShopInfo = await setUpShop(shopMockData[1], otherUserAuthToken);
    otherShop = otherShopInfo.shop;
    otherUserAuthToken = otherShopInfo.authToken;
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
    test("create item test", async () => {
      await api
        .post(itemBaseUrl)
        .set("Authorization", testUserAuthToken)
        .send(testItemData)
        .expect(201);
    });
    test("delete item test", async () => {
      const itemUrl = itemBaseUrl + testItem._id;
      await api
        .delete(itemUrl)
        .set("Authorization", testUserAuthToken)
        .expect(204);
    });
    test("update item test", async () => {
      const itemUrl = itemBaseUrl + testItem._id;
      const payload = { name: "goodItemName", price: 432, discount: 100 };
      await api
        .put(itemUrl)
        .set("Authorization", testUserAuthToken)
        .send(payload)
        .expect(200);
    });
  });
  describe("Unauthenticated Access Test", () => {
    test("create item test will fail with status code 401", async () => {
      await api.post(itemBaseUrl).send(testItemData).expect(401);
    });
    test("delete item test will fail with status code 401", async () => {
      const itemUrl = itemBaseUrl + testItem._id;
      await api.delete(itemUrl).expect(401);
    });
    test("update item test will fail with status code 401", async () => {
      const itemUrl = itemBaseUrl + testItem._id;
      const payload = { name: "goodItemName", price: 432, discount: 100 };
      await api.put(itemUrl).send(payload).expect(401);
    });
  });
  describe("Unauthorized Access Test", () => {
    test("delete item test will fail with result 403", async () => {
      const itemUrl = itemBaseUrl + testItem._id;
      await api
        .delete(itemUrl)
        .set("Authorization", otherUserAuthToken)
        .expect(403);
    });
    test("update item test will fail with result 403", async () => {
      const itemUrl = itemBaseUrl + testItem._id;
      const payload = { name: "goodItemName", price: 432, discount: 100 };
      await api
        .put(itemUrl)
        .set("Authorization", otherUserAuthToken)
        .send(payload)
        .expect(403);
    });
  });
});
