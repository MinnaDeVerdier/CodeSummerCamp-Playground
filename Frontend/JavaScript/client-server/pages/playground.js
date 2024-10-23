$(function() {
    const assignmentSelect = document.getElementById("assignmentSelect")
    const title = document.getElementById("assignmentTitle")
    const codeDescription = document.getElementById("codeDescription")
    const codeEditor = document.getElementById("codeEditor")
    const feedbackDisplay = document.getElementById("feedbackDisplay")
    const runCodeButton = document.getElementById("runCodeButton")
    const testFeedback = document.getElementById("testFeedback")
    
    // Make sure languages as set in html attribute 'page-lang' are the same as available in monaco-editor
    langList= {
        'python': 1,
        'csharp': 2
    }
    let codingLanguage = runCodeButton.getAttribute('page-lang')
    let languageID = langList[codingLanguage]
    
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
            codeDescription.innerText = "select assignment"
            if (!data.exists) title.innerText = "Assignment doesn't exist"
            else {
                title.innerText = data.title
                editorCodeBlock.getModel().setValue(data.existingCode.join('\n'))
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
            for (test in data.testresult) {
                feedbackDisplay.innerText += `${test}:\n${data.testresult[test]}\n`
            }
            // testFeedback.innerText = data.output
            // testFeedback.style.visibility = "visible"
//            testFeedback.innerHTML = data.replace(/\n/g, '<br>')           
        })
        .catch( (error) => { console.log(error)})
    }

    function initMonacoEditor() {
        // Create new editor with codestart-value
        let editor = monaco.editor.create(codeEditor, {
            value: "",
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