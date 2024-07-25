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

const { setUpTestUser } = require("../testUtilities/setup.testUtility");

const supertest = require("supertest");
const { app } = require("../../app");
const api = supertest(app);

const { Comment } = require("../../models/comment.model");
const {
  getMockDataList,
  dataInDB,
} = require("../testUtilities/db.testUtility");
const commentModel = "Comment";
const userModel = "User";
const commentBaseUrl = "/api/comment/";

const commentMockData = getMockDataList(commentModel);
const userMockData = getMockDataList(userModel);

describe("Comment Api Test", async () => {
  let mongoServer;
  let serverConnection;
  let commentList = [];
  let commentSampleData;
  const testUserData = _.cloneDeep(userMockData[0]);
  let testUser;
  let testUserAuthToken;
  const targetUserData = _.cloneDeep(userMockData[1]);
  let targetUser;
  let targetUserAuthToken;
  let testComment;

  before(async () => {
    const serverInfo = await setUpTestServer();
    mongoServer = serverInfo.mongoServer;
    serverConnection = serverInfo.serverConnection;

    const testUserInfo = await setUpTestUser(testUserData);
    testUser = testUserInfo.user;
    testUserAuthToken = testUserInfo.userAuthToken;

    const targetUserInfo = await setUpTestUser(targetUserData);
    targetUser = targetUserInfo.user;
    targetUserAuthToken = targetUserInfo.userAuthToken;
  });
  after(async () => {
    await tearDownTestServer(mongoServer, serverConnection);
  });
  beforeEach(async () => {
    commentSampleData = _.cloneDeep(commentMockData);
    const promises = [];
    for (let comment of commentSampleData) {
      comment.user = testUser.id;
      comment.target = targetUser.id;
      promises.push(Comment.create(comment));
    }
    commentList = await Promise.all(promises);
    testComment = commentList[0];
  });
  afterEach(async () => {
    await Comment.deleteMany({});
    commentList = [];
  });
  describe("Authorized Access Tests", async () => {
    test("create comment test", async () => {
      const payload = {
        content: commentSampleData[2].content,
        target: targetUser.id,
      };
      const response = await api
        .post(commentBaseUrl)
        .set("Authorization", testUserAuthToken)
        .send(payload)
        .expect(201);
      const dataDb = await dataInDB(commentModel);
      assert.strictEqual(dataDb.length, commentList.length + 1);
    });
  });
});
