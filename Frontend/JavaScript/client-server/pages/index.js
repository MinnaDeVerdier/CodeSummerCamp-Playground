// Run code after html-page is loaded
$(function() {
    let navLinks = document.querySelectorAll('.nav-links a')
    let pageContainer = document.getElementById('page-container')
    let windowTitle = document.getElementById('window-title')

    // Make every assignment-link load the corresponding HTML-body
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if(link.getAttribute('href') == 'index.html') { 
                windowTitle.innerText = link.firstChild.innerText; 
                return;
            }

            let script = document.createElement('script');
            if(link.getAttribute('href') == '/playground') {
                script.src = 'playground.js';
            }
            e.preventDefault()
            windowTitle.innerText = link.innerHTML
            let page = link.getAttribute('page-name')
            // Fetch the page content from server as a html-file and paste into container
            fetch(`/${page}`)
                .then(response => response.text())
                .then(content => { 
                    pageContainer.innerHTML = content;
                    if(script.src) document.body.appendChild(script);
                    })
                .catch(err => { console.log('Failed fetching page: ', err) })
        })
    })
});