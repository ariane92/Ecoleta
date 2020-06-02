function populateUFs() {
    const ufSelector = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((response) => { return response.json()})
    .then( (states) => {
        for( state of states){
            ufSelector.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs();



function getCities(event) {
    const citySelect = document.querySelector('select[name=city]');
    const ufInput = document.querySelector('input[name=uf]')

    
    const ufValue = event.target.value;
    const indexOfSelectedUf = event.target.selectedIndex;
    ufInput.value = event.target.options[indexOfSelectedUf].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    fetch(url)
    .then((response) => { return response.json()})
    .then( (cities) => {
        for( city of cities){
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }

        citySelect.disabled = false;
    })

}


document.querySelector('select[name=uf]')
        .addEventListener('change', getCities)