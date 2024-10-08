// Run code after html-page is loaded
$(function() {
    let display = document.querySelector("#feedbackDisplay")
    let inputButton = document.querySelector("#runCodeButton")
    let resultButton = document.querySelector("#inputResultButton")
    /*
    let connectionButton = document.querySelector("#connectionButton")
    let containerButton = document.querySelector("#containerButton")
    */
    //let inputTextField = document.querySelector("#textInput")

    // Create editor
    var codeContent = ["text = ''",
        "if 1==1:",
        "    text = 'Hello World'",
        "else:",
        "    text = 'Bye World'",
        "print(text)",
        "",
        "while (true)",
        "{",
        "    //CODE HERE",
        "    console.log(\"done\");",
        "}",
        "text = ''",
        "if 1==1:",
        "    text = 'Hello World'",
        "else:",
        "    text = 'Bye World'",
        "print(text)",
        "",
        "while (true)",
        "{",
        "    //CODE HERE",
        "    console.log(\"done\");",
        "}",
        "text = ''",
        "if 1==1:",
        "    text = 'Hello World'",
        "else:",
        "    text = 'Bye World'",
        "print(text)",
        "",
        "while (true)",
        "{",
        "    //CODE HERE",
        "    console.log(\"done\");",
        "}",
        "text = ''",
        "if 1==1:",
        "    text = 'Hello World'",
        "else:",
        "    text = 'Bye World'",
        "print(text)",
        "",
        "while (true)",
        "{",
        "    //CODE HERE",
        "    console.log(\"done\");",
        "}"].join('\n')

    let editorCodeBlock = monaco.editor.create(document.getElementById('codeEditor'), {
        value: codeContent,
        language: "python",
        theme: "vs-dark",
        lineNumbers: 'on',
        glyphMargin: false,
        vertical: 'auto',
        horizontal: 'auto',
        verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
        scrollBeyondLastLine: false,
        readOnly: false,
        automaticLayout: true,
        minimap: { 
            enabled: true
        },
        lineHeight: 22,
    });

    inputButton.addEventListener("click", ()=>{ getDataFromUser(); })
    resultButton.addEventListener("click", ()=>{ getUserResult(); })

    /*
    connectionButton.addEventListener("click", ()=>{ connectToBackend(); })
    containerButton.addEventListener("click", ()=>{createContainer()})

    let createContainer =()=>{
        fetch("./", {
            method: "get",
            headers: {
                "Content-Type": "text/plain"
                }
        })
        .then( (response) =>
        {
            console.log("respons get test eirtueirtu")
            console.log(response)
        })
        .catch( (error) => { console.log(error)})
    }
    let connectToBackend =()=>
    {
        fetch("./", {
            method: "head",
            headers: {
                "Content-Type": "text/plain"
                }
        })
        .then( (response) =>
        {
            console.log("respons index head")
            console.log(response)
        })
        .catch( (error) => { console.log(error)})
    }
    */

    // 1 Läs från textfil till display
    let getUserResult =()=>
    {
        fetch("./", {
            method: "get",
            headers: {
                "Content-Type": "text/plain"
                }
        })
        .then( (response) =>
        {
            console.log("get response: ", response.text)
            display.innerText = response.text
        })
        .catch( (error) => { console.log(error)})
    }

    // 2 Skriv till textfil från input
    let getDataFromUser =()=>
    {
        let aText = editorCodeBlock.getValue()
        fetch("./", {               // use path for language selection? 
            method: "post",
            headers: {
                "Content-Type": "text/plain"
                //  'X-Session-ID': 'unique-session-identifier'    // if cookies dont work use HEADERs for session ID
                },
        // useable for installs?   params: ["para1", "para2"], 
            body: aText //modify to contain more metadata
        })
        .then(response =>
        {
            console.log("response: ",response.text())
            display.innerText += "\n\nSENT"
        })
        .catch( (error) => { console.log(error)})
    }

// // läser in vad som skrivs i inputfield
// let readDataFromUser = () =>
// {
//     let recievedData = inputTextField.value;
//     display.textContent=recievedData;
// }
});