// Run code after html-page is loaded
$(function() {
    let navLinks = document.querySelectorAll('.nav-links a')
    let pageContainer = document.getElementById('page-container')
    let windowTitle = document.getElementById('window-title')
    const playgroundButton = document.getElementById('playground-button')

    // Make every assignment-link load the corresponding HTML-body
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if(link.getAttribute('href') == 'index.html') { 
                windowTitle.innerText = link.firstChild.innerText; 
                return;
            }
            e.preventDefault();
            goToPlayground(link, windowTitle, pageContainer);
            
        })
    })
    playgroundButton.addEventListener('click', (e) => goToPlayground(playgroundButton, windowTitle, pageContainer))
    
    function goToPlayground(link, windowTitle, pageContainer) {
        let script = document.createElement('script');
        if (link.getAttribute('page-name') == "playground") {
            script.src = 'playground.js';
    }
    windowTitle.innerText = link.innerHTML;
    let page = link.getAttribute('page-name');
    // Fetch the page content from server as a html-file and paste into container
    fetch(`/${page}`)
        .then(response => response.text())
        .then(content => {
            pageContainer.innerHTML = content;
            if (script.src) document.body.appendChild(script);
        })
        .catch(err => { console.log('Failed fetching page: ', err); });
    }
    
});