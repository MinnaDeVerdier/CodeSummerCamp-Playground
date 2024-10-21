$(function() {
    const assignmentSelect = document.getElementById("assignmentSelect")
    const title = document.getElementById("assignmentTitle")
    const codeDescription = document.getElementById("codeDescription")
   // const codeEditor = document.getElementById("codeEditor")
    const feedbackDisplay = document.getElementById("feedbackDisplay")
    const runCodeButton = document.getElementById("runCodeButton")
    const helpButton = document.getElementById("helpButton")
    const testFeedback = document.getElementById("testFeedback")
    const codeEditor = document.getElementById('codeEditor')
    
    langList= {
        'python': 1,
        'csharp': 2
    }
    let codingLanguage = runCodeButton.getAttribute('page-lang')
    let languageID = langList[codingLanguage]
    
    let editorCodeBlock;
    let codeContent = ["text = 'Hello World'", "print(text)"]
    // Check if Monaco is already loaded, else load it then initialize editor
    if (typeof monaco === 'undefined') {
        require.config({ paths: { 'vs': 'node_modules/monaco-editor/min/vs' } });
        require(['vs/editor/editor.main'], editorCodeBlock = initMonacoEditor(codeContent));
    } 
    else { editorCodeBlock = initMonacoEditor(codeContent) }

    
    assignmentSelect.addEventListener("change", () => { loadAssignment() })
    
    runCodeButton.addEventListener("click", ()=>{ sendUserCode() })
    
    function loadAssignment() {
        selection = assignmentSelect.value
        fetch(`/assignmentData/${selection}`)
        // Parse response as JSON then use response data
        .then( response => response.json())
        .then( (data) => {
            codeDescription.innerText = "select assignment"
            if (!data.exists) title.innerText = "Assignment doesn't exist"
            else {
                title.innerText = data.title
                editorCodeBlock = initMonacoEditor(data.existingCode)
                // Turn newlines into html-linebreaks for formatting
                codeDescription.innerHTML = data.description.replace(/\n/g, '<br>')
            }
        })
        .catch( (error) => { console.log(error)})
    }

    function sendUserCode() {
        let aText = editorCodeBlock.getValue()
        // Post code to chosen language and assignment
        fetch(`/run/${languageID}/${assignmentSelect.value}`, {
            method: "post",
            headers: { "Content-Type": "text/plain" },
            body: aText
        })
        .then( response => response.json())
        .then( (data) => {
            feedbackDisplay.innerText = data.output
            for (test in data.testresult) {
                feedbackDisplay.innerText += `${test}:\n${data.testresult[test]}\n`
            }
            testFeedback.style.visibility = "visible"
//            feedbackDisplay.innerHTML = data.replace(/\n/g, '<br>')           
        })
        .catch( (error) => { console.log(error)})
    }

    function initMonacoEditor(codestart) {
        let codeContent = codestart.join('\n')
        // Remove loaded editor if exists
        while (codeEditor.childElementCount > 0)
            codeEditor.firstChild.remove()
        // Create new editor with codestart-value
        let editor = monaco.editor.create(document.getElementById('codeEditor'), {
            value: codeContent,
            language: codingLanguage,
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
        //     // Ensure proper layout?
        // window.addEventListener('resize', function() {
        //     editorCodeBlock.layout();
        // });
        return editor
    }
})