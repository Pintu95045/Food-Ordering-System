// Function to fetch and display menu items
async function getMenu() {
    try {
        let response = await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json');
        let menuItems = await response.json();
        displayMenu(menuItems);
    } catch (error) {
        console.error('Error fetching menu:', error);
    }
}

// Function to display menu items in the UI
function displayMenu(items) {
    const menu = document.getElementById('food-items');
    menu.innerHTML = ''; // Clear previous menu items
    items.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('food-item');
        menuItem.innerHTML = `
            <img src="${item.imgSrc}" alt="${item.name}" class="food-img">
            <h3 class="food-name">${item.name}</h3>
            <p class="food-price">$${item.price}</p>
            <button class="order-btn">Order Now</button>
        `;
        menu.appendChild(menuItem);
    });
}

// Function to simulate taking an order
function takeOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const burgers = ['Cheeseburger', 'Chicken Burger', 'Veggie Burger'];
            const order = {
                items: burgers.sort(() => 0.5 - Math.random()).slice(0, 3) // Randomly pick 3 burgers
            };
            resolve(order);
        }, 2500);
    });
}

// Function to simulate preparing the order
function orderPrep() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: false });
        }, 1500);
    });
}

// Function to simulate paying for the order
function payOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: true });
        }, 1000);
    });
}

// Function to show a thank you message after payment
function thankyouFnc() {
    alert('Thank you for dining with us!');
}

// Function to handle the complete order process
async function handleOrder() {
    try {
        const order = await takeOrder();
        console.log('Order:', order);
        const prep = await orderPrep();
        console.log('Order Status:', prep);
        const payment = await payOrder();
        console.log('Payment Status:', payment);
        if (payment.paid) {
            thankyouFnc();
        }
    } catch (error) {
        console.error('Error during order process:', error);
    }
}

// Event listener to trigger order process on button click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('order-btn')) {
        handleOrder();
    }
});

// Initialize menu on page load
getMenu();
