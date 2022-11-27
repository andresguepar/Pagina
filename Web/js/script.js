let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
    shopCart.classList.remove('active');
    
}

let shopCart = document.querySelector('.shopping-cart');

document.querySelector('#cart-btn').onclick = () =>{
    shopCart.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
    
}

let loginForm = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () =>{
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    navbar.classList.remove('active');
    shopCart.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    shopCart.classList.remove('active');
}

window.onscroll = () =>{
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
    shopCart.classList.remove('active');
  
}


//Products

const items = document.getElementById('items');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();
let cart = {};

document.addEventListener('DOMContentLoaded', () =>{
    fetchData();
})
items.addEventListener('click', e => {
    addCart(e);

});

const fetchData = async () => {
    try {
        const res = await fetch('/json/api.json');
        const data = await res.json();
        //console.log(data);
        paint(data);
    }catch(error) {
        console.log(error);
    }
}

const paint = data => {
    data.forEach(product =>{
        templateCard.querySelector('h3').textContent = product.title;
        templateCard.querySelector('p').textContent = product.price;
        templateCard.querySelector('img').setAttribute("src",product.thumbnailUrl);
        templateCard.querySelector('.btn').dataset.id = product.id;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    });
    items.appendChild(fragment);
}

const addCart = e => {
    //console.log(e.target);
    //console.log(e.target.classList.contains('btn'))
    if(e.target.classList.contains('btn')){
         setCart(e.target.parentElement);

    }
    e.stopPropagation();
}

const setCart = object => {
    //console.log(object);
    const product = {
        id: object.querySelector('.btn').dataset.id,
        title: object.querySelector('h3').textContent,
        price: object.querySelector('p').textContent,
        cant: 1
    }

    if(cart.hasOwnProperty(product.id)) {
        product.cant = cart[product.id].cant + 1;
    }

    cart[product.id] = {...product}

    console.log(cart);

}
/*var swiper = new Swiper(".product-slider", {
    loop:true,
    spaceBetween: 20,
    autoplay: {
        delay:7500,
        disableOnInteraction: false,
    },
    centeredSlides: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1020: {
        slidesPerView: 3,

      },
    },
  });*/