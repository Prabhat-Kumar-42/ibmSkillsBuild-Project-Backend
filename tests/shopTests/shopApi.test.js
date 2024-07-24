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
  let testShopData;
  let testShop;
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
    testShop = shopList[0];
    testShopData = _.cloneDeep(sampleShopData[0]);
  });
  afterEach(async () => {
    await Shop.deleteMany({});
    shopList = [];
  });
  describe("Public Routes Test", async () => {
    describe("Getting Shop Data Tests", () => {
      test("fetch all shop data", async () => {
        const response = await api.get(baseUrl).expect(200);
        assert.strictEqual(response.body.length, shopList.length);
      });
      test("fetch single shop data", async () => {
        const testShopUrl = baseUrl + testShop.id;
        const response = await api.get(testShopUrl).expect(200);
        const responseShop = response.body;
        assert.strictEqual(testShop._id.toString(), responseShop.id);
      });
    });
  });
  describe("Authorized Routes Tests", async () => {
    describe("Authorized Access Tests", async () => {
      test("Create Shop Test", async () => {
        testShopData.coordinates = _.cloneDeep(
          testShopData.geoLocation.coordinates,
        );
        delete testShopData.geoLocation;
        await api
          .post(baseUrl)
          .set("Authorization", testUserAuthToken)
          .send(testShopData)
          .expect(201);
        const shopDb = await dataInDB(shopModel);
        assert.strictEqual(shopDb.length, shopList.length + 1);
      });
      test("Update Shop Test", async () => {
        const testShopUrl = baseUrl + testShop.id;
        const payload = { ...testShopData, name: "bestShopInTheWorld" };
        const response = await api
          .put(testShopUrl)
          .set("Authorization", testUserAuthToken)
          .send(payload)
          .expect(200);
        const updatedShop = response.body;
        assert.strictEqual(payload.name, updatedShop.name);
      });
      test("Delete Shop Test", async () => {
        const testShopUrl = baseUrl + testShop.id;
        await api
          .delete(testShopUrl)
          .set("Authorization", testUserAuthToken)
          .expect(204);
        const shopDb = await dataInDB(shopModel);
        assert.strictEqual(shopDb.length, shopList.length - 1);
      });
    });
  });
});
