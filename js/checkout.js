let loginForm = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () =>{
    loginForm.classList.toggle('active');
  
}

function alertar(mixin){  
}

const form = document.getElementById("checkout");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Purchase completed',
        showConfirmButton: false,
        timer: 1500
      })
      
}
)