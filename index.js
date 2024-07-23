const { app } = require("./app");
const { info } = require("./utility/logger.util");
const PORT = process.env.PORT || 3001;

const startServer = () => {
  app.listen(PORT, () => {
    info(`server started at port ${PORT}`);
  });
};

startServer();
