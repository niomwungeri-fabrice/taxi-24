import startupDebugger from "debug";
import app from './app/v1/app';

const port = process.env.PORT || 3000;
const debug = startupDebugger("minutes:start");
app.listen(port, () => debug(`taxi 24 Web API listening on port ${port}!`));
