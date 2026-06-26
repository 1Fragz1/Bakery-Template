    const totalItemsInCart = document.getElementById("cart-count");
    const totalPrice = document.getElementById("total");

let cart = [];
let quantity = 0;

let total = 0;
let totalItems = 0;
document.addEventListener("DOMContentLoaded", () => {
    const menuItems = [
        bread = {
            img: "https://via.placeholder.com/150",
            name: "Bread",
            description: "Freshly baked bread with a crispy crust and soft interior.",
            price: 3.99,
        } ,
        cupcakes = {
            img: "https://via.placeholder.com/150",
            name: "Cupcakes",
            description: "Delicious cupcakes with a variety of flavors and toppings.",
            price: 5.49,
        } ,
        cookies = {
            img: "https://via.placeholder.com/150",
            name: "Cookies",
            description: "Classic cookies with a chewy texture and rich flavor.",
            price: 2.99,
        } ,
        doughnuts = {
            img: "https://via.placeholder.com/150",
            name: "Doughnuts",
            description: "Sweet and fluffy doughnuts with a variety of glazes and fillings.",
            price: 4.99,
        } ,
        dough = {
            img: "https://via.placeholder.com/150",
            name: "Dough",
            description: "Soft and versatile dough for making a variety of baked goods.",
            price: 1.99,
        
        },
        cake = {
            img: "https://via.placeholder.com/150",
            name: "Cake",
            description: "Moist and flavorful cakes with a variety of frostings and fillings.",
            price: 799.99,
        },
        danish = {
            img: "https://via.placeholder.com/150",
            name: "Danish",
            description: "Flaky and buttery danishes with a variety of fruit and cream fillings.",
            price: 4.49,
        },
        brownies = {
            img: "https://via.placeholder.com/150",
            name: "Brownies",
            description: "Rich and fudgy brownies with a variety of mix-ins and toppings.",
            price: 3.49,
        }
    ]
    let menuItemsHTML = '';

    
    let amountInCart = 0;

    menuItems.forEach(element => {
        menuItemsHTML += `
        <div class="item">
            <a onclick="popup('${element.img}', '${element.name}', '${element.description}', ${element.price})">
                <img src="${element.img}" alt="Item">
                <h3>${element.name}</h3>
                <p>${element.description}</p>
                <p>$${element.price}</p>
            </a>
        </div>
        `
    });


    const menuItem = document.querySelector(".menu");

    menuItem.innerHTML = menuItemsHTML;
});

function popup(img, name, description, price) {
    if (!document.getElementById("pop-up").style.display || document.getElementById("pop-up").style.display === "none") {
        openpopup();
        currentPopupItem = name;
    } else if (currentPopupItem === name) {
        closePopup();
        currentPopupItem = null;
    } else {
        
        closePopup();
        setTimeout(() => {
            currentPopupItem = name;
            openpopup();
        }, 500);
    }
    setTimeout(() => {
        const popup = document.getElementById("pop-up");
        const popupContent = document.getElementById("pop-up-content");
        popupContent.innerHTML = `<img src="${img}" alt="Item">
            <h2>${name}</h2>
            <p>${description}</p>
            <p>Price: $${price}</p> 
            <button class = "pop-up-btn" id="add-to-cart" onclick="addToCart('${name}', ${price})">Add to Cart</button>
            <button class = "pop-up-btn" id="close-popup" onclick="closePopup()">Close</button>`;
    }, 500);


}

function openpopup() {
    const popup = document.getElementById("pop-up");
    popup.style.display = "inherit";
    popup.style.animation = "slideIn 0.5s forwards";
}
 
function closePopup() {
    const popup = document.getElementById("pop-up");
    popup.style.animation = "popAndShrink 0.5s forwards";
       setTimeout(() => {
        popup.style.display = "none"; 
    }, 500);
}


/*==============================================================================
================================================================================
                                    Shopping cart 
================================================================================    
================================================================================  */



    


function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    let isNew = false;

    if (existingItem) {
        existingItem.quantity++;
    } else {
        const newItem = {
            name: name,
            price: price,
            quantity: 1
        };
        cart.push(newItem);
        isNew = true; // mark as new for animation
    }

    updateCartDisplay(); 
    closePopup();

    if (isNew) animateCartItem(name);
}

function animateCartItem(name) {
    // grab the specific new cart item using data-name
    const cartItem = document.querySelector(`.cart-item[data-name="${name}"]`);
    if (!cartItem) return;

    cartItem.style.animation = "cart-item-added 0.5s forwards";
    cartItem.addEventListener("animationend", () => {
        cartItem.style.animation = ""; // reset for future animations
    }, { once: true }); // ensures listener runs only once
}

function updateCartDisplay() {
    const cartContainer = document.querySelector(".cart-items");
    let cartHTML = '';

    total = 0;
    quantity = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        quantity += item.quantity;

        cartHTML += `
        <li class="cart-item" data-name="${item.name}">
            <div class="item-name">
                <p>${item.name} - $${item.price}</p>
            </div>

            <div class="quantity">
                <p class="item-quantity">AMOUNT: ${item.quantity}</p>
                <div class="buttons">
                    <button class="remove-item" onclick="removeFromCart('${item.name}')">REMOVE</button>
                    <button class="add-item" onclick="addToCart('${item.name}', ${item.price})">ADD</button>
                </div>
            </div>
        </li>`;
        });

    cartContainer.innerHTML = cartHTML;

    totalItemsInCart.textContent = quantity;
    totalPrice.textContent = total.toFixed(2);
    }





function removeFromCartAnimation() {
    const cartItem = document.querySelector(".cart-item");
    cartItem.style.animation = "cart-item-added 0.5s reverse fowards";
    cartItem.addEventListener("animationend", () => {
        cartItem.style.animation = "";
    });
}

function removeFromCart(name) {
    const itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex === -1) return;

    const item = cart[itemIndex];
    const el = document.querySelector(`.cart-item[data-name="${name}"]`);
    
    if (!el) return;

    if (item.quantity > 1) {
        item.quantity--; quantity--;
        el.querySelector(".item-quantity").textContent = `AMOUNT: ${item.quantity}`;
        
    } else {
        el.style.transition = "0.5s";
        el.style.opacity = 0;
        el.style.transform = "translateX(-100%)";
        cart.splice(itemIndex, 1);
        quantity--;
        setTimeout(() => {el.remove();updateCartDisplay()}, 500);
        
    }

}




const openCart = () => {
    document.querySelector(".container")?.classList.toggle("cart-open");
};