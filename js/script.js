const apiKey = "c81cd51fa8e13ad558edd398016d0333";

const extraerButton = document.getElementById("ciudadClima")

extraerButton.addEventListener("click", async () => {

    const inputCiudad = document.getElementById("nombreCiudad").value;
    
    if (!inputCiudad){
        return alert("Digite el Nombre de una ciudad")
    }
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCiudad}&appid=${apiKey}&lang=es&units=metric&exclude=hourly,daily`;
    
    try {
        //consumiendo datos de la api
        const pet = await fetch(url);
        const res = await pet.json();

        if(res.cod=="404"){
            return alert("no hay resultados para esa busqueda");
        }

        consultarDiasSiguientes(res.coord.lat, res.coord.lon);

        const ima = asignarImagen(res.weather[0].main);

        document.getElementById("imagen").src = ima;

        document.getElementById("ciudad").innerHTML = "Ciudad: "+res.name+", "+new Date().toUTCString();
        document.getElementById("clima").innerHTML = "Clima: "+res.weather[0].main;
        document.getElementById("descripClima").innerHTML = "Descripción: "+res.weather[0].description;
        document.getElementById("viento").innerHTML = "Viento: "+res.wind.speed+" Km/h";
        document.getElementById("humedad").innerHTML = "Humedad: " +res.main.humidity + "%";
        document.getElementById("temperatura").innerHTML = `Temperatura: ${res.main.temp}°C`;
        
    } catch(e) {
        console.log(e);
    }
})

async function consultarDiasSiguientes(lat, lon){

    //segunda consulta desde api forma onecall
    try {
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,current&appid=${apiKey}&lang=es&units=metric`
        const peticion = await fetch(url);
        const res = await peticion.json();
        completarDias(res.daily);
    } catch (e) {
      console.log(e);  
    }
}

function completarDias(dias){

    let table = document.getElementById("tab")
    let diaActual = new Date()
    table.innerHTML =`<tr>
                        <th class="tableCab">Dia</th>
                        <th class="tableCab">Clima</th>
                        <th class="tableCab">Temperatura</th>
                        <th class="tableCab">Humedad</th>
                        <th class="tableCab">Vientos</th>
                    </tr>`

    dias.forEach(dia => {
        diaActual.setDate(diaActual.getDate()+1)
        table.innerHTML += `<tr>
                                <th>${diaActual.toDateString()}</th>
                                <th>${dia.weather[0].description}</th>
                                <th>${dia.temp.day}°C</th>
                                <th>${dia.humidity}%</th>
                                <th>${dia.wind_speed} Km/h</th>
                            </tr>`
    });
}

function asignarImagen(clima){

    let imagen = "";

    if (clima === "Clear sky"){
        imagen = "./recursos/imagenes/clear-day.png";
    } else if(clima === "Few clouds") {
        imagen = "./recursos/imagenes/partly-cloudy-day.png";
    } else if(clima === "Scattered clouds"){
        imagen = "./recursos/imagenes/cloudy.png";
    } else if(clima === "Broken clouds"){
        imagen = "./recursos/imagenes/cloudy.png";
    } else if(clima === "Shower rain"){
        imagen = "./recursos/imagenes/rain.png";
    } else if(clima === "Rain"){
        imagen = "./recursos/imagenes/rain.png";
    } else if(clima === "thunderstorm"){
        imagen = "./recursos/imagenes/rain.png";
    } else if(clima === "Snow"){
        imagen = "./recursos/imagenes/snow.png";
    } else if(clima === "Fog"){
        imagen = "./recursos/imagenes/fog.png";
    } else if(clima === "Drizzle"){
        imagen = "./recursos/imagenes/fog.png";
    } else if(clima === "Clear"){
        imagen = "./recursos/imagenes/clear-day.png";
    } else if(clima === "Clouds"){
        imagen = "./recursos/imagenes/cloudy.png";
    } else {
        imagen = "./recursos/imagenes/sleet.png";
    } 

    return imagen;
}