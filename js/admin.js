let formEl = document.querySelector('.admin-form');

formEl.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);

    const saveData = (i) =>{
        const finished = (error) =>{
            if(error){
                console.error(error)
                return;
            }
        }
        const jsonData = JSON.stringify(i)
        console.log(jsonData)

    }

    saveData(data);
})