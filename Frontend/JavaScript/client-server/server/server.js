import oExpress from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import bodyParser from 'body-parser';
import { spawn } from 'node:child_process';
//import session, { MemoryStore } from 'express-session';
import session from 'cookie-session';
import {randomUUID} from 'crypto';

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

// Use TEMPORARY COOKIES for sessions
app.use(session({
    name: 'CSCsession', 
    keys: ['secret-key', 'old-key'], // OR use secret, for only one option
    maxAge: 1000 * 60 * 60 * 12 //expires after 12 hours or on browser close
}))

// Generate a unique session ID if one doesn't exist
app.use((req, res, next) => {
    if (!req.session.id) {
      req.session.id = randomUUID();
    }
    next();
  });

// Use PERSISTING COOKIES for recognizing sessions
// FROM https://expressjs.com/en/resources/middleware/session.html
// app.use(session({
//     secret: 'secret-key', // Set in container env variables. should be an array where top is current secrets and older ones further down (to not close active sessions on change)
//     name: 'CSCsessionID', // ID-name, same for all
//     resave: false, //check with storage if it implements the touch method. If it does, set resave: false. If it does not and your store sets an expiration date on stored sessions, you likely need resave: true
//     saveUninitialized: true, //should be false, gdpr need permissions for cookies on client-side
//     cookie: { 
//         secure: false, // secure: true means cookies are only sent over https.
//         maxAge: 1000 * 60 * 60 * 12 // Expires after 12 hours
//     },
//     //store: // default MemoryStore leaky and unsafe
// }));

// Future function when login implemented
// app.get('/logout', (req, res) => {
//     req.session.destroy((err) => { // Destroys cookie/session on logout
//         if (err) {
//             console.log(err);
//         }
//         res.redirect('/login');
//     });
// });

// // OR Use HEADER to identify the session for all calls
// app.use((req, res, next) => {
//     const sessionId = req.headers['X-session-ID'];
//     next();
// });

// app.mkactivity("/", (req, res) => {
//     writeToFile(req.body)
//     res.send(`handled request: (${res.statusCode})`)
//     console.log(req.body)
//     runPython()
// })

app.post("/", (req, res) => {
    console.log('Session data:', req.session);
    console.log('req.sessionID: ', req.session.id)
    console.log('req.params: ', req.params)

    writeToFile(req)
    res.send(`handled request: (${res.statusCode})`)
    console.log(req.body)
//    runPython()
})

import oFileStream from 'fs';
let writeToFile = (req) => {
    let lang = 1 //1 = python3.12 
    let dataToContainerStarter = {
        "sent": { 
            "id": req.session.id, 
            "language": lang,
            "installs": ["numpy", "pandas", "jquery"], 
            "code": req.body,
            "data": "exempel-data testdata-länk osv"
    }}
    
    oFileStream.writeFile(`codefiles/${req.session.id}.json`, JSON.stringify(dataToContainerStarter), (err) =>
    {
        if(err) console.log(err)
        else console.log("Data written to file.... ", dataToContainerStarter)
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

//From https://nodejs.org/api/child_process.html#child-process

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