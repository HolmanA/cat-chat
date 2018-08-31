const express = require('express');
const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');

const app = express();

app.get('/', (req, res) => {
    const token = req.query.access_token;
    if (token == null || token == '') {
        res.status(302).redirect('/login');
    } else {
        const $ = cheerio.load(fs.readFileSync(path.join(__dirname, '/dist/cat-chat/index.html')));
        $('#authentication-token').text(token);
        res.send($.html());
    }
});

app.use(express.static(path.join(__dirname, '/dist/cat-chat/')));

app.get('/login', (req, res) => {
    res.status(302).redirect(`https://oauth.groupme.com/oauth/authorize?client_id=${process.env.CLIENT_ID}`);
});

app.listen(process.env.PORT || 8080);