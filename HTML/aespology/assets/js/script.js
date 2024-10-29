document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.enlarge-on-hover');

    elements.forEach(element => {
        element.addEventListener('mouseover', function() {
            element.style.transition = 'font-size 0.3s ease';
            element.style.fontSize = 'larger';
        });

        element.addEventListener('mouseout', function() {
            element.style.fontSize = '';
        });
    });
});
document.addEventListener('DOMContentLoaded', (event) => {
    checkUserStatus();
});



