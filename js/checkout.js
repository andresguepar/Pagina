let loginForm = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () =>{
    loginForm.classList.toggle('active');
  
}

const form = document.getElementById("checkout");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Purchase processed',
        showConfirmButton: false,
        timer: 2500,
      })
      
    
}
)

function security() {
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	
	if(email == '123' && password == '123'){
	    location.href= "admin.html"
	}else{
        alert("No registrado")
    }
	
}