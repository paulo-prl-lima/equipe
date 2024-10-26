// Chaves das APIs
const openWeatherMapApiKey = '7bac0b6502db56e243caae91f988e1ae';
const advisorApiKey = '23a50f95d9a562afa902d6357ba76262';

// Função que inicializa o Google Maps
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -30.034647, lng: -51.217659 },
        zoom: 7,
    });

    const infowindow = new google.maps.InfoWindow();

    // Função para buscar dados climáticos de uma cidade e mostrar na infowindow
    function getWeatherData(lat, lng, circle) {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${openWeatherMapApiKey}&units=metric&lang=pt_br`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const weatherInfo = 
                    `Cidade: ${data.name}<br>
                    Temperatura: ${data.main.temp} °C<br>
                    Clima: ${data.weather[0].description}<br>
                    Umidade: ${data.main.humidity}%`;
                infowindow.setContent(weatherInfo);
            })
            .catch(error => {
                console.error('Erro ao obter dados do clima:', error);
                infowindow.setContent("Erro ao carregar o clima.");
            });
    }

    // Função para adicionar eventos de mouse em círculos
    function addCircleEvent(circle, lat, lng) {
        circle.addListener('mouseover', () => {
            getWeatherData(lat, lng, circle);
            infowindow.setPosition(circle.getCenter());
            infowindow.open(map);
        });

        circle.addListener('mouseout', () => {
            infowindow.close();
        });
    }

    const cities = [
        { name: "Estrela", lat: -29.4879, lng: -51.9633, color: "red", risk: "Muito Alta Probabilidade" },
        { name: "Muçum", lat: -29.3679, lng: -51.9052, color: "orange", risk: "Alta Probabilidade" },
        { name: "Lajeado", lat: -29.4598, lng: -51.9520, color: "orange", risk: "Alta Probabilidade" },
        { name: "Montenegro", lat: -29.6886, lng: -51.4661, color: "yellow", risk: "Moderada a Alta Probabilidade" },
        { name: "Encantado", lat: -29.1569, lng: -51.9482, color: "orange", risk: "Alta Probabilidade" },
        { name: "Novo Hamburgo", lat: -29.6864, lng: -51.1103, color: "red", risk: "Muito Alta Probabilidade" },
        { name: "Porto Alegre", lat: -30.0346, lng: -51.2177, color: "red", risk: "Muito Alta Probabilidade" },
        { name: "Canoas", lat: -29.9994, lng: -51.1865, color: "lightgreen", risk: "Baixa a Moderada Probabilidade" },
        { name: "São Leopoldo", lat: -29.7684, lng: -51.2253, color: "yellow", risk: "Moderada Probabilidade" },
        { name: "Erechim", lat: -27.6346, lng: -52.2734, color: "lightgreen", risk: "Baixa a Moderada Probabilidade" },
        { name: "Gravataí", lat: -29.9412, lng: -50.9869, color: "yellow", risk: "Moderada Probabilidade" },
        { name: "Taquari", lat: -29.7947, lng: -51.8647, color: "yellow", risk: "Moderada Probabilidade" },
        { name: "Cruzeiro do Sul", lat: -29.5147, lng: -51.9928, color: "yellow", risk: "Moderada Probabilidade" },
        { name: "Roca Sales", lat: -29.2883, lng: -51.8675, color: "red", risk: "Muito Alta Probabilidade" },
        { name: "Passo Fundo", lat: -28.2576, lng: -52.4091, color: "yellow", risk: "Moderada Probabilidade" },
    ];

    cities.forEach(city => {
        const circle = new google.maps.Circle({
            strokeColor: city.color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: city.color,
            fillOpacity: 0.35,
            map: map,
            center: { lat: city.lat, lng: city.lng },
            radius: 8000, // 20 km
        });

        addCircleEvent(circle, city.lat, city.lng);
    });
}

// Função para mostrar/ocultar o menu
function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

// Chamar funções para buscar dados adicionais
function fetchAdditionalData() {
    // Exemplo para buscar dados de previsão do tempo
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=-30.0346&lon=-51.2177&appid=${openWeatherMapApiKey}&units=metric&lang=pt_br`)
        .then(response => response.json())
        .then(data => {
            const forecast = data.list.map(item => `Data: ${new Date(item.dt * 1000).toLocaleDateString()}, Temp: ${item.main.temp} °C`).join('<br>');
            document.getElementById('forecastData').innerHTML = forecast;
        });

    // Aqui você pode adicionar chamadas para outras APIs para obter dados adicionais
}

// Chamar a função ao carregar a página
window.onload = () => {
    fetchAdditionalData();
};
// para as vagas:
function showVagas(city) {
    // Oculta todas as seções de vagas
    var vagas = document.querySelectorAll('.vagas');
    vagas.forEach(function(vaga) {
        vaga.classList.remove('active');
    });

    // Exibe a seção de vagas correspondente
    document.getElementById(city).classList.add('active');
}
// Função para mostrar ou ocultar o conteúdo
function toggleConteudo(id) {
    var conteudo = document.getElementById(id);
    if (conteudo.style.display === "none") {
        conteudo.style.display = "block";
    } else {
        conteudo.style.display = "none";
    }
}