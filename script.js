function opentab(tabName) {
   
    document.querySelectorAll('.tab-content').forEach(function(content) {
        content.style.display = 'none';
    });

   
    document.querySelectorAll('.tab-links').forEach(function(link) {
        link.classList.remove('active-link');
    });

    document.getElementById(tabName).style.display = 'block';

    document.querySelector(`.tab-links[onclick="opentab('${tabName}')"]`).classList.add('active-link');
}


let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector ('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x')
    navbar.classList.toggle('active');
}

