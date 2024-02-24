

const image = document.querySelectorAll('.js-image');
    image.forEach(function (image) {
        setTimeout(function () {
    image.classList.add('show');
}, 1000);
});

window.fetch('https://api.openweathermap.org/data/2.5/weather?lat={6987}&lon={895}&appid={2f0f4079754d83526e9417b02516b9b0}')
    .then(response => response.json)

    .then(responsejson => console.log(responsejson));



    // fetch('https://api.openweathermap.org/data/2.5/weather?lat={50}&lon={98}&appid={2f0f4079754d83526e9417b02516b9b0}')
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data)
    // }).catch(error => alert(error));
