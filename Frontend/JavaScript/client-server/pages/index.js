// Run code after html-page is loaded
$(function() {
    let display = document.querySelector("#feedbackDisplay")
    let inputButton = document.querySelector("#runCodeButton")
    let connectionButton = document.querySelector("#connectionButton")
    //let inputTextField = document.querySelector("#textInput")
    inputButton.addEventListener("click", ()=>{ getDataFromUser(); })

    connectionButton.addEventListener("click", ()=>{ connectToBackend(); })

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

    // 1 Läs från textfil till display
    let writeDataFromFile =()=>
    {
        fetch("./files/savefile.txt")
        .then( (response) => 
        {
            console.log("response: ",response.text)
            return response.text()
        })
        .then( (dataItem) =>
        {
            display.innerHTML = dataItem
            inputTextField.value = dataItem
            console.log("dataitem: ", dataItem)
        })
        .catch( (error) =>
        {
            console.log(error)
        })
    }

    // 2 Skriv till textfil från input
    let getDataFromUser =()=>
    {
        let aText = editorCodeBlock.getValue()
        fetch("./", {
            method: "post",
            headers: {
                "Content-Type": "text/plain"
                },
            body: aText
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