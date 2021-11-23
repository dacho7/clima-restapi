
const extraerButton = document.getElementById("ciudadClima")

extraerButton.addEventListener("click", () => {
    const inputCiudad = document.getElementById("nombreCiudad").value;
    const result = document.getElementById("clima").innerHTML = inputCiudad
})

/*let extraerDatos =  function() {
    const url = "https://api.github.com/users/dacho7";
    const pet = await fetch(url);
    const res = await pet.json();
    return res;
}*/