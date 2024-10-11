$(function() {
    let assignmentSelect = document.getElementById("assignmentSelect")
    const title = document.getElementById("assignmentTitle")
    let codeBehind = document.getElementById("codeBehind")
    let codeBehindDiv = document.getElementById("codeBehindDiv")
   // const codeEditor = document.getElementById("codeEditor")
    let feedbackDisplay = document.getElementById("feedbackDisplay")
    const runCodeButton = document.getElementById("runCodeButton")
    const helpButton = document.getElementById("helpButton")
    const inputResultButton = document.getElementById("inputResultButton")

    // Check if Monaco is already loaded, else load it then initialize editor
    if (typeof monaco === 'undefined') {
        require.config({ paths: { 'vs': 'node_modules/monaco-editor/min/vs' } });
        require(['vs/editor/editor.main'], initMonacoEditor());
    } 
    else { initMonacoEditor() }

    
    assignmentSelect.addEventListener("change", () => { loadAssignment() })
    
    runCodeButton.addEventListener("click", ()=>{ getDataFromUser() })
    
    function loadAssignment() {
        selection = assignmentSelect.value
        fetch(`/assignmentData/${selection}`)
        // Here lies trouble. Recieves JSON-like response but cant use it in website. Will leave it for daytime. 
        .then( (response) => {
           let resjson = JSON.stringify(response, null, 2)
      //      let resjson = response.toString()
           title.innerText = resjson["title"]

            codeBehindDiv.textContent = resjson
            feedbackDisplay.textContent = resjson.title
        })
        .catch( (error) => { console.log(error)})
            
        }

    function sendUserCode() {
        let aText = editorCodeBlock.getValue()
        fetch("./", {
            method: "post",
            headers: {
                "Content-Type": "text/plain"
            },
            body: aText //modify to contain more metadata?
        })
        .then(response => {
                console.log("response: ",response.text())
                display.innerText += "\n\nSENT"
        })
        .catch( (error) => { console.log(error)})
    }

    function initMonacoEditor() {
        // Create editor
        let codeContent = ["text = ''",
            "if 1==1:",
            "    text = 'Hello World'",
            "else:",
            "    text = 'Bye World'",
            "print(text)",
            "",
            "while (true)",
        ].join('\n')

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
        //     // Ensure proper layout
        // window.addEventListener('resize', function() {
        //     editorCodeBlock.layout();
        // });
    }
})