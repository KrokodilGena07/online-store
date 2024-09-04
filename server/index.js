const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
require('dotenv/config');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/errorMiddleware');
const db = require('./config/db');
const compression = require('compression');
const compressionMiddleware = require('./middlewares/compressionMiddleware');
require('./models/index');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({}));
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(compression({filter: compressionMiddleware}));
app.use('/api', router);
app.use(errorMiddleware);

async function start() {
    try {
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
        await db.authenticate();
        await db.sync();
    } catch (e) {
        console.log(e);
    }
}

start().then();