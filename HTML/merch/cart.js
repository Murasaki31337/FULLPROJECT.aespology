let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartSound = document.getElementById('cart-sound');

function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart);
    alert(product.title + ' добавлен в корзину');
    cartSound.play();
    updateCartCount();
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cart.length;
}

document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', () => {
        console.log("Button clicked!");
        const productCard = button.closest('.product-card');
        const product = {
            title: productCard.querySelector('.product-title').textContent,
            price: productCard.querySelector('.product-price').textContent,
            image: productCard.querySelector('.product-image').src
        };
        addToCart(product);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    displayCartItems();
});

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                <p>${item.title} - ${item.price}</p>
                <button onclick="removeItem(${index})" class="btn btn-danger">Удалить</button>
            </div>
        `;
        total += parseInt(item.price.replace('₸', '').trim());
    });

    cartTotalElement.textContent = total + '₸';
}

function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}
