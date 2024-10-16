$(function() {
    const assignmentSelect = document.getElementById("assignmentSelect")
    const title = document.getElementById("assignmentTitle")
    const codeDescription = document.getElementById("codeDescription")
   // const codeEditor = document.getElementById("codeEditor")
    const feedbackDisplay = document.getElementById("feedbackDisplay")
    const runCodeButton = document.getElementById("runCodeButton")
    const helpButton = document.getElementById("helpButton")
    const inputResultButton = document.getElementById("inputResultButton")
    
    var language = 0
    switch (runCodeButton.getAttribute('page-lang')){
        case 'python': language = 1
        case 'csharp': language = 2
        default: language = 1
    }
    
    let editorCodeBlock;
    // Check if Monaco is already loaded, else load it then initialize editor
    if (typeof monaco === 'undefined') {
        require.config({ paths: { 'vs': 'node_modules/monaco-editor/min/vs' } });
        require(['vs/editor/editor.main'], editorCodeBlock = initMonacoEditor());
    } 
    else { editorCodeBlock = initMonacoEditor() }

    
    assignmentSelect.addEventListener("change", () => { loadAssignment() })
    
    runCodeButton.addEventListener("click", ()=>{ sendUserCode() })
    
    function loadAssignment() {
        selection = assignmentSelect.value
        fetch(`/assignmentData/${selection}`)
        // Parse response as JSON then use response data
        .then( response => response.json())
        .then( (data) => {
            if (!data.exists) title.innerText = "Assignment doesn't exist"
            else title.innerText = data.title;
            // Turn newlines into html-linebreaks for formatting
            codeDescription.innerHTML = data.description.replace(/\n/g, '<br>')       
        })
        .catch( (error) => { console.log(error)})
    }

    function sendUserCode() {
        let aText = editorCodeBlock.getValue()
        // Post code to chosen language and assignment
        fetch(`/run/${language}/${assignmentSelect.value}`, {
            method: "post",
            headers: {
                "Content-Type": "text/plain"
            },
            body: aText
        })
        .then(response => {
                console.log("response: ",response.text())
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

        let editor = monaco.editor.create(document.getElementById('codeEditor'), {
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
        return editor
    }
})