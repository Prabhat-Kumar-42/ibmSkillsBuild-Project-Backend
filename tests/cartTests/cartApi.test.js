const {
  describe,
  test,
  before,
  after,
  beforeEach,
  afterEach,
} = require("node:test");

const assert = require("assert");
const _ = require("lodash");

const {
  setUpTestServer,
  tearDownTestServer,
} = require("../../utility/mongoMemoryServer");

const { Cart } = require("../../models/cart.model");
const {
  getMockDataList,
  dataInDB,
} = require("../testUtilities/db.testUtility");
const {
  setUpTestUser,
  setUpShop,
  setUpItemsInShop,
} = require("../testUtilities/setup.testUtility");

const supertest = require("supertest");
const { app } = require("../../app");
const api = supertest(app);

const cartBaseUrl = "/api/cart/";
const cartModel = "Cart";
const itemModel = "Item";
const userModel = "User";
const shopModel = "Shop";
const itemMockData = getMockDataList(itemModel);
const userMockData = getMockDataList(userModel);
const shopMockData = getMockDataList(shopModel);

describe("Cart Api Tests", async () => {
  let mongoServer;
  let serverConnection;
  let sampleItemData;
  const shopOwnerData = _.cloneDeep(userMockData[0]);
  let shopOwner;
  let shopOwnerAuthToken;
  const testShopData = _.cloneDeep(shopMockData[0]);
  let testShop;
  let itemList = [];
  const buyerData = userMockData[1];
  let buyer;
  let buyerAuthToken;
  before(async () => {
    const serverInfo = await setUpTestServer();
    mongoServer = serverInfo.mongoServer;
    serverConnection = serverInfo.serverConnection;

    const shopOwnerInfo = await setUpTestUser(shopOwnerData);
    shopOwner = shopOwnerInfo.user;
    shopOwnerAuthToken = shopOwnerInfo.userAuthToken;

    const testShopInfo = await setUpShop(testShopData, shopOwnerAuthToken);
    testShop = testShopInfo.shop;
    shopOwnerAuthToken = testShopInfo.authToken;

    await setUpItemsInShop(itemMockData, shopOwnerAuthToken);
    const buyerInfo = await setUpTestUser(buyerData);
    buyer = buyerInfo.user;
    buyerAuthToken = buyerInfo.userAuthToken;
  });
  after(async () => {
    await tearDownTestServer(mongoServer, serverConnection);
  });
  beforeEach(async () => {
    itemList = await dataInDB(itemModel);
  });
  afterEach(async () => (itemList = []));
  test("test create cart", async () => {
    await api.get(cartBaseUrl).set("Authorization", buyerAuthToken).expect(200);
  });
  test("test get cart items and cart total is item added in list's total", async () => {
    const response = await api
      .get(cartBaseUrl)
      .set("Authorization", buyerAuthToken)
      .expect(200);
    const createdCart = response.body.cart;
    const cart = await Cart.findById(createdCart.id);
    const itemIdList = itemList.map((item) => item.id);
    cart.itemList = itemIdList;
    await cart.save();
    const res = await api
      .get(cartBaseUrl)
      .set("Authorization", buyerAuthToken)
      .expect(200);
    let total = itemList.reduce((acc, item) => acc + item.finalPrice, 0);
    assert.strictEqual(total, res.body.cart.total);
  });
});
