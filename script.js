// ***** Filter the menu ***** //
// Get all options in the menu and put them in an array
let optionsMenu = Array.from(document.querySelectorAll('.menu-list')[0].childNodes);
optionsMenu = optionsMenu.filter((node) => {
    return node.nodeType === 1;
})

let options = [];
optionsMenu.forEach((elem) => {
    let splitElem = elem.classList.value.split(" ");
    splitElem.forEach((item) => {
        if (!options.includes(item))
            options.push(item);
    })
})
options = options.sort();

// Add all options to the filter
let filterSelector = document.getElementById('menu-filter');
options.forEach((elem) => {
    let option = document.createElement('option');
    option.value = elem;
    option.innerHTML = elem;
    filterSelector.appendChild(option);
});

// Filter the menu
filterSelector.addEventListener('change', (event) => {
    let selectedOption = event.target.value;
    if (selectedOption == 'all') {
        optionsMenu.forEach((elem) => {
            elem.style.display = 'list-item';
        });
    } else {
        optionsMenu.forEach((elem) => {
            if (elem.classList.value.includes(selectedOption)) {
                elem.style.display = 'list-item';
            } else {
                elem.style.display = 'none';
            }
        })
    }
});

// ***** Shopping cart ***** //
// Display or not the shopping cart
const toggleButton = document.getElementById('toggleButton');
let shoppingCartDiv = document.querySelector('#shoppingCartDiv');

toggleButton.addEventListener('click', () => {
    shoppingCartDiv.classList.toggle('none');
});

// Add to cart
const addCartButtons = document.querySelectorAll('.button-order');
let totalAmount = 0;

addCartButtons.forEach(button => {    
    button.addEventListener('click', () => {
        /* Remove 'Empty' text */
        let textEmpty = document.querySelector('.cart-empty');
        textEmpty.style.display = 'none';

        /* Add selected dish */
        let selectedDish = button.parentElement.parentElement;

        let orderedDish = document.createElement('div');
        orderedDish.classList.add('ordered-dish');

        let orderedDishImg = document.createElement('div');
        orderedDishImg.classList.add('ordered-dish-img');
        orderedDishImg.innerHTML = selectedDish.childNodes[1].innerHTML;

        let orderedDishInfo = document.createElement('div');
        orderedDishInfo.classList.add('ordered-dish-info');

        // Clone the menu-item-info div to avoid modifying the original content
        let clonedInfoDiv = selectedDish.childNodes[3].cloneNode(true);

        // Remove price from the cloned div
        let priceDish = clonedInfoDiv.querySelector('.price');
        if (priceDish) {
            clonedInfoDiv.removeChild(priceDish);
        }
        // Remove the button from the cloned div
        let removeButton = clonedInfoDiv.querySelector('.button-order');
        if (removeButton) {
            clonedInfoDiv.removeChild(removeButton);
        }

        // Set the innerHTML of the orderedDishInfo div to the innerHTML of the cloned div
        orderedDishInfo.innerHTML = clonedInfoDiv.innerHTML;

        orderedDish.appendChild(orderedDishImg);

        let addOrderedDish = document.querySelector('.ordered-dishes-list');
        addOrderedDish.appendChild(orderedDish);

        /* Calculate total amount */
        let price = button.parentElement.querySelector('.price').innerHTML;
        totalAmount += parseFloat(price.replace(/\€$/, ''));

        let totalAmountDiv = document.querySelector('.total-amount');
        totalAmountDiv.textContent = `${totalAmount}`;

        /* Add a remove button */
        // let priceDeleteButtonDiv = document.createElement('div');
        // priceDeleteButtonDiv.classList.add('price-delete-button');
        let deleteButton = document.createElement('a');
        deleteButton.classList.add('button');
        deleteButton.classList.add('button-remove');
        deleteButton.textContent = 'Remove';
        // // priceDeleteButtonDiv.appendChild(priceDish);
        // priceDeleteButtonDiv.appendChild(deleteButton);

        // Add div with info and button
        let orderedDishInfoDiv = document.createElement('div');
        orderedDishInfoDiv.classList.add('ordered-dish-info-price-button');
        let orderedDishPriceButton = document.createElement('div');
        orderedDishPriceButton.classList.add('ordered-dish-price-button');

        orderedDishPriceButton.appendChild(priceDish);
        orderedDishPriceButton.appendChild(deleteButton);

        orderedDishInfoDiv.appendChild(orderedDishInfo);
        orderedDishInfoDiv.appendChild(orderedDishPriceButton);


        orderedDish.appendChild(orderedDishInfoDiv);
        
        // Delete dish
        deleteButton.addEventListener('click', () => {
            let orderedDish = deleteButton.parentElement.parentElement.parentElement;
            let price = orderedDish.querySelector('.price').innerHTML;
            totalAmount -= parseFloat(price.replace(/\€$/, ''));
            totalAmount = totalAmount.toFixed(2);
            totalAmountDiv.textContent = `${totalAmount}`;
            orderedDish.remove();
        });

    });
});

/* You should create a dark mode switch, to toggle your design between a light and a dark mode*/
let darkModeButton = document.getElementById('dark-mode');
let lightModeButton = document.getElementById('light-mode');

// Elements to change
let body = document.querySelector('body');
let cardList = document.querySelectorAll('li');
console.log(cardList);

darkModeButton.addEventListener('click', () => {
    darkModeButton.style.display = 'none';
    lightModeButton.style.display = 'block';
    body.style.backgroundColor = '#9B9C6D';
    cardList.forEach((card) => {
        card.style.backgroundColor = '#841F26';
    });
    shoppingCartDiv.style.backgroundColor = '#841F26';
});

lightModeButton.addEventListener('click', () => {
    lightModeButton.style.display = 'none';
    darkModeButton.style.display = 'block';
    body.style.backgroundColor = '#FFFFEE';
    cardList.forEach((card) => {
        card.style.backgroundColor = '#D8333E';
    });
    shoppingCartDiv.style.backgroundColor = '#D8333E';
});

// TODO ***** Effect on header *****//
// let lastScrollTop = 0;
// window.addEventListener("scroll", function() { 
//     let currentScroll = window.scrollY || document.documentElement.scrollTop; 
//     if (currentScroll > lastScrollTop) { 
//       // Scrolling down
//       document.querySelector('header').style.top = '-100vh';
//       document.querySelector('.mobile').style.top = '-64px';
//       document.querySelector('.back-opa').style.top = '-64px';
  
//     } else { 
//       // Scrolling up 
//       document.querySelector('header').style.top = '0';
//       document.querySelector('.mobile').style.top = '64px';
//       document.querySelector('.back-opa').style.top = '64px';
//     } 
//     lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling 
//   }, false); 