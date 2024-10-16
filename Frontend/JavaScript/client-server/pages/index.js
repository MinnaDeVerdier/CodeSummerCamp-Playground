// Run code after html-page is loaded
$(function() {
    let navLinks = document.querySelectorAll('.nav-links a')
    let pageContainer = document.getElementById('page-container')
    let windowTitle = document.getElementById('window-title')
    const pythonButton = document.getElementById('python-button')
    const csharpButton = document.getElementById('csharp-button')


    // Make every assignment-link load the corresponding HTML-body
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if(link.getAttribute('href') == 'index.html') { 
                windowTitle.innerText = link.firstChild.innerText; 
                return;
            }
            // e.preventDefault();
            // goToPage(link, windowTitle, pageContainer);
            
        })
    })
    pythonButton.addEventListener('click', (e) => goToPage(pythonButton, windowTitle, pageContainer))
    csharpButton.addEventListener('click', (e) => goToPage(csharpButton, windowTitle, pageContainer))

    function goToPage(link, windowTitle, pageContainer) {
        windowTitle.innerText = link.innerHTML;
        let page = link.getAttribute('page-type');
        let lang = link.getAttribute('lang-name')
        // Add script-file to container-content
        let script = document.createElement('script');
        if (page == "playground") {
            script.src = 'playground.js';
        }
        // Fetch the page content from server as a html-file and paste into container
        fetch(`/${page}/${lang}`)
            .then(response => response.text())
            .then(content => {
                pageContainer.innerHTML = content;
                if (script.src) document.body.appendChild(script);
            })
            .catch(err => { console.log('Failed fetching page: ', err); });
    }
    
});