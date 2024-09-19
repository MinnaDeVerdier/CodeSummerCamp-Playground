// let oHttp = require('http');
// let url = require('url')
// let filesystem = require('fs')

// //Skapa http-server som aktiveras genom > node "filnamn.etx" i cmd
// oHttp.createServer( (aRequest, aResponse) =>{
//         filesystem.readFile('info.html', (err, data) => {
//                 if(err) return console.error(err)
//                 aResponse.writeHead(200, {'Content-Type': 'text/html'});
//                 aResponse.write(data);
//                 aResponse.end();        
//             })
//         }).listen(8080);
// })

import oExpress from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = oExpress();
const port = 3000;

//include folders in running server
app.use('/css', oExpress.static(path.join(__dirname, '../css')));
app.use(oExpress.static(path.join(__dirname, '../pages')));
//app.use(oExpress.static(path.join(__dirname, '../files')));


//app.use(oExpress.json())

app.use(bodyParser.text({ type: 'text/plain'}))

// app.get("/", (aRequire, aResponse) =>
// {
//     aResponse.sendFile("./pages/index.html", { root: __dirname })
// })

app.post("/", (aRequire, aResponse) =>
{
    writeToFile(aRequire.body)
    console.log("POSTED!!!")
    console.log(aRequire.body)
})

import oFileStream from 'fs';
let writeToFile = (aText) =>
{
    oFileStream.writeFile("../files/recievedText.txt", aText, (err) =>
    {
        if(err) return console.error(err)
        else console.log("Data written to file....")
    })
}

app.listen(port, () => {
    console.log("server running at http://localhost:%s", port)
})