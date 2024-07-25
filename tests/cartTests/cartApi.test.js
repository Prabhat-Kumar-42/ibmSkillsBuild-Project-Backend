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
  });
  after(async () => {
    await tearDownTestServer(mongoServer, serverConnection);
  });
  beforeEach(async () => {
    itemList = await dataInDB(itemModel);
  });
  afterEach(async () => (itemList = []));
});
