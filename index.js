import startupDebugger from "debug";
import app from "./app/v1/app";
import { options } from "./app/v1/helpers/swaggerGenerator";
const expressSwagger = require("express-swagger-generator")(app);
const port = process.env.PORT || 3000;
expressSwagger(options);

const debug = startupDebugger("minutes:start");
app.listen(port, () => debug(`taxi 24 Web API listening on port ${port}!`));
