// асинхронные запросы
async function getCountries(){
    const resp = await fetch('https://date.nager.at/api/v3/AvailableCountries');
    const countries = await resp.json();
    showCountries(countries);
} 
getCountries();
function showCountries(countries){
    for(let country of countries){
        const card = document.createElement('div');
        card.classList.add('card');

        card.addEventListener('click',() => showHolidays(country.countryCode))

        const img =document.createElement('img');
        img.src = `https://date.nager.at/images/circle-flags/flags/${country.countryCode}.svg`;
        card.appendChild(img);

        const name =document.createElement('p');
        name.innerText= country.name;
        card.appendChild(name);

        document.body.appendChild(card);
    }
}

async function showHolidays(countryCode){
    const overLay = document.createElement('div');
    overLay.classList.add('overLay');
    document.body.appendChild(overLay);
    overLay.addEventListener('click', () => overLay.remove());

    const d = new Date();
    const year = d.getFullYear();

    const resp = await fetch(`https://date.nager.at/api/v3/publicholidays/${year}/${countryCode}`); 
    const holidays = await resp.json();

    const dialog = document.createElement('div');
    dialog.classList.add('dialog') ;
    dialog.addEventListener('click', (event) => event.stopPropagation());//останавливает поиск вглубь элементов клика

    for (let holiday of holidays){
        const raw = document.createElement('div')
        const date = document.createElement('span');
        date.classList.add('date');
        date.innerText = holiday.date;

        const name = document.createElement('span');
        name.innerText= `${holiday.name}(${holiday.localName})`;

        raw.append(date, name);
        dialog.appendChild(raw);
    }
    overLay.appendChild(dialog);

}
//создать тег видео
const video = document.createElement('video');
video.controls = true;
const source = document.createElement('source');
source.src = 'http://techslides.com/demos/sample-videos/small.webm';
video.appendChild(source);
document.body.appendChild(video)