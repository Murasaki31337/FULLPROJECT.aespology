let isStyled = false;

function changeStyles() {
    if (isStyled) {
        document.body.style.backgroundColor = "";

        let paragraphs = document.getElementsByTagName('p');
        for (let i = 0; i < paragraphs.length; i++) {
            paragraphs[i].style.fontSize = "";
        }

        let headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        for (let i = 0; i < headings.length; i++) {
            headings[i].style.fontSize = "";
        }

        let container = document.querySelector('.container');
        container.style.position = "";
        container.style.left = "";
        container.style.top = "";

        let audioElements = document.getElementsByTagName('audio');
        for (let i = 0; i < audioElements.length; i++) {
            audioElements[i].style.width = "";
            audioElements[i].style.borderRadius = "";
            audioElements[i].style.boxShadow = "";
        }
    } else {
        document.body.style.backgroundColor = "lightblue";

        let paragraphs = document.getElementsByTagName('p');
        for (let i = 0; i < paragraphs.length; i++) {
            paragraphs[i].style.fontSize = "20px";
        }

        let headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        for (let i = 0; i < headings.length; i++) {
            headings[i].style.fontSize = "24px";
        }

        let container = document.querySelector('.container');
        container.style.position = "relative";
        container.style.left = "50px";
        container.style.top = "50px";

        let audioElements = document.getElementsByTagName('audio');
        for (let i = 0; i < audioElements.length; i++) {
            audioElements[i].style.width = "100%";
            audioElements[i].style.borderRadius = "10px";
            audioElements[i].style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
        }
    }

    isStyled = !isStyled;
}
document.addEventListener('DOMContentLoaded', () => {
    const ratings = document.querySelectorAll('.rating');
    ratings.forEach(rating => {
        for (let i = 5; i > 0; i--) {
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `rating${rating.dataset.id}`;
            input.id = `rating${rating.dataset.id}-${i}`;
            input.value = i;
            
            const label = document.createElement('label');
            label.htmlFor = `rating${rating.dataset.id}-${i}`;
            label.title = `${i} stars`;

            rating.appendChild(input);
            rating.appendChild(label);
        }
    });
});
