import bodyParser from 'body-parser';
import express    from 'express';

import connectDB  from './config/db.mjs';
import config     from './config/config.mjs';
import cleanup    from './config/cleanup.mjs';
import routes     from './routes.mjs';

const app = express();

cleanup();
connectDB();

app.set('port', config.port);
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use('/', routes.login);
app.listen(app.get('port'), () => console.log(`\nServer listens on ${config.port} port\n`))
