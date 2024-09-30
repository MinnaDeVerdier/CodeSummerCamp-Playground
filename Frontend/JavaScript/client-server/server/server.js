import oExpress from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));
const app = oExpress();
const port = 3000;

//include folders in running server
app.use('/css', oExpress.static(path.join(__dirname, 'css')));
app.use(oExpress.static(path.join(__dirname, 'pages')));
app.use('/codefiles', oExpress.static(path.join(__dirname, 'codefiles')));
app.use('/images', oExpress.static(path.join(__dirname, 'images')));
app.use('/node_modules', oExpress.static(path.join(__dirname, 'node_modules')));
app.use(bodyParser.text({ type: 'text/plain'}))

// app.get('/', (req, res) => {
//     res.sendFile("./pages/index.html", { root: __dirname })
// })

// app.get(`/${page}`, (req, res) => {
//     res.sendFile(`/files/instruction-${page}.txt`)
// })

app.post("/", (req, res) => {
    writeToFile(req.body)
    res.send(`handled request: (${res.statusCode})`)
    console.log(req.body)
})

import filestream from 'fs';
let writeToFile = (aText) => {
    filestream.writeFile("codefiles_temp/recievedText.txt", aText, (err) =>
    {
        if(err) return console.error(err)
        else console.log("Data written to file....")
    })
}

app.listen(port, () => {
    console.log("server running at http://localhost:%s", port)
})