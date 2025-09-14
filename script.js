let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('theme-switch')

const enableDarkmode = () => {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)
}

if(darkmode === "active") enableDarkmode()

themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode')
    darkmode !== "active" ? enableDarkmode() : disableDarkmode()
})

document.addEventListener('DOMContentLoaded', function() {
    checkScrollPosition();
    
    window.addEventListener('scroll', checkScrollPosition);
    
    function checkScrollPosition() {
        if (window.scrollY === 0) {
            document.body.classList.add('scrolled-to-top');
        } else {
            document.body.classList.remove('scrolled-to-top');
        }
    }
});

const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const originalContents = {};
    
    const savedAboutContent = localStorage.getItem('about-content');
    if (savedAboutContent) {
        const aboutContent = document.getElementById('about-content');
        if (aboutContent) {
            aboutContent.innerHTML = savedAboutContent;
        }
    }
    
    const editButtons = document.querySelectorAll('.edit-toggle-btn');
    
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const section = this.closest('.editable-section');
            const content = section.querySelector('.editable-content');
            const controls = section.querySelector('.edit-controls');
            const sectionId = content.id;
            
            if (!originalContents[sectionId]) {
                originalContents[sectionId] = content.innerHTML;
            }
            
            content.contentEditable = true;
            content.classList.add('editing');
            content.focus();
            
            controls.classList.add('visible');
            
            this.innerHTML = '<i class="fas fa-pen"></i> Editing...';
            this.style.backgroundColor = '#8a9ac4';
        });
    });
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('save-btn')) {
            const section = e.target.closest('.editable-section');
            const content = section.querySelector('.editable-content');
            const controls = section.querySelector('.edit-controls');
            const editButton = section.querySelector('.edit-toggle-btn');
            const sectionId = content.id;
            
            content.contentEditable = false;
            content.classList.remove('editing');
            
            controls.classList.remove('visible');
            
            originalContents[sectionId] = content.innerHTML;
            
            localStorage.setItem(sectionId, content.innerHTML);
            
            editButton.innerHTML = '<i class="fas fa-edit"></i> Edit';
            editButton.style.backgroundColor = '';
        }
    });
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('cancel-btn')) {
            const section = e.target.closest('.editable-section');
            const content = section.querySelector('.editable-content');
            const controls = section.querySelector('.edit-controls');
            const editButton = section.querySelector('.edit-toggle-btn');
            const sectionId = content.id;
            
            content.innerHTML = originalContents[sectionId];
            
            content.contentEditable = false;
            content.classList.remove('editing');
            
            controls.classList.remove('visible');
            
            editButton.innerHTML = '<i class="fas fa-edit"></i> Edit';
            editButton.style.backgroundColor = '';
        }
    });
});