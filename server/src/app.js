const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const accountRouter = require('./routes/accountRouter');
const tokensRouter = require('./routes/tokensRouter');
const catRouter = require('./routes/catRouter');
const quizRouter = require('./routes/quizRouter');
const lkRouter = require('./routes/lkRouter')
const progressRouter = require('./routes/progressRouter')


const app = express();

app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/account/', accountRouter);
app.use('/api/tokens/', tokensRouter);
app.use('/api/cat/', catRouter);
app.use('/api/quiz/', quizRouter);
app.use('/api/lk/', lkRouter);
app.use('/api/progress/', progressRouter);


module.exports = app;

