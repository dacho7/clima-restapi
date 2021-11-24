const apiKey = "c81cd51fa8e13ad558edd398016d0333";
const consults = [];

const extraerButton = document.getElementById("ciudadClima")

extraerButton.addEventListener("click", async () => {

    const inputCiudad = document.getElementById("nombreCiudad").value;
    
    if (!inputCiudad){
        return alert("Digite el Nombre de una ciudad")
    }
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCiudad}&appid=${apiKey}`;
    
    try {

        const pet = await fetch(url);
        const res = await pet.json();

        if(res.cod=="404"){
            return alert("no hay resultados para esa busqueda")
        }
        console.log(res);

        document.getElementById("ciudad").innerHTML = res.name;
        document.getElementById("pais").innerHTML = res.sys.country;
        document.getElementById("clima").innerHTML = res.weather[0].main +", "+res.weather[0].description;
        document.getElementById("viento").innerHTML = res.wind.speed+" m/s";
        document.getElementById("humedad").innerHTML = res.main.humidity;
        document.getElementById("temperatura").innerHTML = (res.main.temp-273.15).toFixed(2)+" °C";
   
    } catch(e) {
        console.log(e);
    }
})  


const limpiarDatos = () => {
    document.getElementById("ciudad").innerHTML = "";
    document.getElementById("pais").innerHTML = "";
    document.getElementById("clima").innerHTML = "";
    document.getElementById("viento").innerHTML = "";
    document.getElementById("humedad").innerHTML = "";
    document.getElementById("temperatura").innerHTML = "";
}
/*let extraerDatos =  function() {
    const url = "https://api.github.com/users/dacho7";
    const pet = await fetch(url);
    const res = await pet.json();
    return res;
}*/