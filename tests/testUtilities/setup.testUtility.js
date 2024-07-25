const _ = require("lodash");
const supertest = require("supertest");
const { app } = require("../../app");
const api = supertest(app);

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

const setUpItemsInShop = async (itemList, shopOwnerAuthToken) => {
  const promises = itemList.map((item) =>
    api
      .post(itemBaseUrl)
      .set("Authorization", shopOwnerAuthToken)
      .send(item)
      .expect(201),
  );

  await Promise.all(promises);
};

module.exports = {
  setUpShop,
  setUpTestUser,
  setUpItemsInShop,
};
