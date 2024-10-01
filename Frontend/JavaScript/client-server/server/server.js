import oExpress from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import bodyParser from 'body-parser';

import { spawn } from 'node:child_process';

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
//app.use('/server', oExpress.static(path.join(__dirname, 'server')));

app.use(bodyParser.text({ type: 'text/plain'}))

// app.get('/', (req, res) => {
//     res.sendFile("./pages/index.html", { root: __dirname })
// })

//From https://nodejs.org/api/child_process.html#child-process

app.mkactivity("/", (req, res) => {
    writeToFile(req.body)
    res.send(`handled request: (${res.statusCode})`)
    console.log(req.body)
    runPython()
})

app.post("/", (req, res) => {
    writeToFile(req.body)
    res.send(`handled request: (${res.statusCode})`)
    console.log(req.body)
    runPython()
})

import oFileStream from 'fs';
let writeToFile = (aText) => {
    oFileStream.writeFile("codefiles/recievedText.txt", aText, (err) =>
    {
        if(err) return console.error(err)
        else console.log("Data written to file....")
    })
}

let connectToBackend =()=>
{
    //från https://dev.to/g33konaut/reading-local-files-with-javascript-25hn
    filePath = "./files/testText.txt";
    const reader = new FileReader();
    reader.onload = function fileReadCompleted() {
        // when the reader is done, the content is in reader.result.
        console.log(reader.result);
    };
    reader.readAsText(this.files[0]);
}


let runPython =()=> {
    const ls = spawn('sh', ['server/python.sh']);
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