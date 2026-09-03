async function buscarClima(cidadeparams) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidadeparams}&appid=${CHAVE_API}&units=metric&lang=pt_br`;
    const resposta = await fetch(url);
    const dados = await resposta.json();

    return dados;
}

const botaoBuscar = document.getElementById("btnBucar");
const campoCidade = document.getElementById("cidade");
const divResultado = document.getElementById("resultado");

botaoBuscar.addEventListener("click", async function(){
    const cidade = campoCidade.value;

    if(cidade === ""){
        return;
    }

    const dados = await buscarClima(cidade);

    if(dados.cod === "404"){
        divResultado.innerHTML = "<p>Cidade não encontrada.</p>";
        return;
    }

    divResultado.innerHTML = `
        <div class="card-clima">
            <h3>${dados.name}</h3>
            <p>${dados.weather[0].description}</p>
            <p><strong>${dados.main.temp}°C</strong></p>
            <p>Sensação: ${dados.main.feels_like}°C</p>
        </div>
    `;
});