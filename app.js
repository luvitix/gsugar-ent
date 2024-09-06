const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.static(path.join('public')));


app.get('/:id1', (req, res) => {
    const id1 = req.params.id1;
    let dynamicHtmlPath = ""

    // 어떤 페이지로 갈 지 결정
    if (id1 == "objekt-view") {
        dynamicHtmlPath = path.join('public', 'objekt-view.html');
    } else {
        dynamicHtmlPath = path.join('public', 'server.html');
    }

    try {
        // 파일을 동기적으로 읽어옴
        let data = fs.readFileSync(dynamicHtmlPath, 'utf8')
        console.log(data); // 로깅 추가
        // id1을 직접 삽입
        const dynamicHtml = data.replace(/{{objektId}}/g, id1);
        res.send(dynamicHtml);
    } catch (err) {
        console.error(err);
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