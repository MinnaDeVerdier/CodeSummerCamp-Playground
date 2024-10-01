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

import { spawn } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = oExpress();
const port = 3000;

//include folders in running server
app.use('/css', oExpress.static(path.join(__dirname, '../css')));
app.use(oExpress.static(path.join(__dirname, '../pages')));
app.use('/files', oExpress.static(path.join(__dirname, '../files')));
app.use('/node_modules', oExpress.static(path.join(__dirname, 'node_modules')));

//app.use(oExpress.json())

app.use(bodyParser.text({ type: 'text/plain'}))

// app.get("/", (aRequire, aResponse) =>
// {
//     aResponse.sendFile("./pages/index.html", { root: __dirname })
// })

//From https://nodejs.org/api/child_process.html#child-process

let runPython =()=> {
    const ls = spawn('sh python.sh');
    ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    ls.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}

app.post("/", (aRequire, aResponse) =>
{
    writeToFile(aRequire.body)
   // console.log("POSTED!!!")
    console.log(aRequire.body)
    aResponse.send(`handled request: (${aResponse.statusCode})`)
})

app.get("./", (bRequire, bResponse) => {
    console.log(bRequire)
    console.log("rtyiurityurtyiou")
    createContainer()
    console.log("dfgdfjghdfkgh")
    bResponse.send("ertueruthdjkgdjkfg")
})

import oFileStream from 'fs';
let writeToFile = (aText) =>
{
    oFileStream.writeFile("files/recievedText.txt", aText, (err) =>
    {
        if(err) return console.error(err)
        else console.log("Data written to file....")
    })
}

app.listen(port, () => {
    console.log("server running at http://localhost:%s", port)
}) 

function createContainer(){
    console.log("export log here")
    //Taget från https://nodejs.org/api/child_process.html#child_processspawncommand-args-options
    const ls = spawn('ls', ['-lh', '/usr']);

    ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    ls.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}