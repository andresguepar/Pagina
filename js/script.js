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

const cards = document.getElementById('cards');
const items = document.getElementById('items');
const footer = document.getElementById('footer');
const templateCard = document.getElementById('template-card').content;
const templateFooter = document.getElementById('template-footer').content;
const templateCart = document.getElementById('template-cart').content;
const fragment = document.createDocumentFragment();
let cart = {};

document.addEventListener('DOMContentLoaded', e => { 
    fetchData();
    if(localStorage.getItem('cart')){
        cart=JSON.parse(localStorage.getItem('cart'));
        paintCart();
    }

});
cards.addEventListener('click', e => {
    addCart(e);

});

items.addEventListener('click', e => {
    btnAction(e);
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
    cards.appendChild(fragment);
}

const addCart = e => {
    //console.log(e.target);
    //console.log(e.target.classList.contains('btn'))
    if(e.target.classList.contains('btn')){
         setCart(e.target.parentElement);

    }
    e.stopPropagation();
}

const setCart = Object => {
    //console.log(Object);
    const product = {
        id: Object.querySelector('.btn').dataset.id,
        title: Object.querySelector('h3').textContent,
        price: Object.querySelector('p').textContent,
        cant: 1
    }

    if(cart.hasOwnProperty(product.id)) {
        product.cant = cart[product.id].cant + 1;
    }

    cart[product.id] = {...product}
    paintCart();


}

const paintCart = () => {
    //console.log(cart);
    items.innerHTML='';
    Object.values(cart).forEach(product => {
        templateCart.querySelector('th').textContent = product.id
        templateCart.querySelectorAll('td')[0].textContent = product.title
        templateCart.querySelectorAll('td')[1].textContent = product.cant
        templateCart.querySelector('span').textContent = product.cant*product.price

        templateCart.querySelector('.btn-info').dataset.id = product.id
        templateCart.querySelector('.btn-danger').dataset.id = product.id
        

        const clone = templateCart.cloneNode(true);
        fragment.appendChild(clone);
    });

    items.appendChild(fragment);

    paintFooter();

    localStorage.setItem('cart',JSON.stringify(cart));


}

const paintFooter = () => {
    footer.innerHTML =''

    if(Object.keys(cart).length === 0){
        footer.innerHTML = 
        `<th scope="row" colspan="5">cart empty!</th> 
        `
        return
    }

    const nCant = Object.values(cart).reduce((acc, {cant}) => acc + cant,0);
    const nPrice = Object.values(cart).reduce((acc,{cant,price}) => acc + cant * price,0);

    templateFooter.querySelectorAll('td')[0].textContent = nCant;
    templateFooter.querySelector('span').textContent = nPrice;

    const clone = templateFooter.cloneNode(true);
    fragment.appendChild(clone);
    footer.appendChild(fragment);

    const btnDelete = document.getElementById('delete-cart');
    btnDelete.addEventListener('click',() => {
        cart = {};
        paintCart();
    });
}

const btnAction = e => {
    
    if(e.target.classList.contains('btn-info')){
        const product = cart[e.target.dataset.id]
        product.cant = cart[e.target.dataset.id].cant + 1
        cart[e.target.dataset.id] = {...product}
        paintCart();
    }

    if(e.target.classList.contains('btn-danger')){
        const product = cart[e.target.dataset.id]
        product.cant--
        if(product.cant === 0) {
            delete cart[e.target.dataset.id]
        }
        paintCart();
    }
    e.stopPropagation();
}


//Login-admin

function security() {
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	
	if(email == '123' && password == '123'){
	    location.href= "admin.html"
	}else{
        alert("No registrado")
    }
	
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