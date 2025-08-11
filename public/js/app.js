console.log("Client side js is loaded");


const weatherForm = document.querySelector('form')
const query = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = query.value;

    msg1.textContent = 'loading....'
    msg2.textContent = ''
    fetch('/weather?address=' + location).then((response => {
        response.json().then((data) => {
            if (data.error) {
                
                   return msg1.textContent = data.error
                
            }
            
                msg1.textContent = 'location is ' + data.location + ' and the forecast is ' + data.forecast
            
        })
    
    }))
    
})