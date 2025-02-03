const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/:id1', (req, res) => {
    const id1 = req.params.id1;
    let dynamicHtmlPath = "";

    // 어떤 페이지로 갈지 결정
    if (id1 == "funding") {
        dynamicHtmlPath = path.join(__dirname, 'public', 'funding.html');
    } else if (id1 == "store") {
        dynamicHtmlPath = path.join(__dirname, 'public', 'store.html');
    } else if (id1 == "mypage") {
        dynamicHtmlPath = path.join(__dirname, 'public', 'mypage.html');
    } else if (id1 == "event") {
        dynamicHtmlPath = path.join(__dirname, 'public', 'event.html');
    } else if (id1 == "login") {
        dynamicHtmlPath = path.join(__dirname, 'public', 'login.html');
    } else if (id1 == "gsugarofficial") {
        dynamicHtmlPath = path.join(__dirname, 'public', 'gsugarofficial.html');
    } else {
        dynamicHtmlPath = path.join(__dirname, 'public', 'server.html');
    }

    try {
        // 파일을 동기적으로 읽어옴
        let data = fs.readFileSync(dynamicHtmlPath, 'utf8');
        console.log(data); // 로깅 추가
        // id1을 직접 삽입
        const dynamicHtml = data.replace(/{{id1}}/g, id1);
        res.send(dynamicHtml);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// id2가 있는 경우 처리 (예: /event/192)
app.get('/event/:id2', (req, res) => {
    const id2 = req.params.id2;
    const dynamicHtmlPath = path.join(__dirname, 'public', 'event_server.html');

    try {
        let data = fs.readFileSync(dynamicHtmlPath, 'utf8');
        // id1을 event로 하드코딩하고, id2 동적 삽입
        let dynamicHtml = data.replace(/{{id1}}/g, 'event').replace(/{{id2}}/g, id2);
        res.send(dynamicHtml);
    } catch (err) {
        console.error('파일을 읽는 중 오류 발생:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});