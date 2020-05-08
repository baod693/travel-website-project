// UI Vars
const infoCards = document.querySelector('.info-cards');

// Vars to get data from local storage and parse
const userInformation = sessionStorage.getItem('userInformation');
const travelInfo = JSON.parse(userInformation);
const eatInfoPassJSON = sessionStorage.getItem('eatInfo');
const eatInfoParse = JSON.parse(eatInfoPassJSON);
const hotelInfoPassJSON = sessionStorage.getItem('hotelInfo');
const hotelInfoParse = JSON.parse(hotelInfoPassJSON);
const tourInfoPassJSON = sessionStorage.getItem('tourInfo');
const tourInfoParse = JSON.parse(tourInfoPassJSON);
const nightlifeInfoPassJSON = sessionStorage.getItem('nightLifeInfo');
const nightlifeInfoParse = JSON.parse(nightlifeInfoPassJSON);
const sightSeeingInfoPassJSON = sessionStorage.getItem('sightSeeingInfo');
const sightSeeingInfoParse = JSON.parse(sightSeeingInfoPassJSON);

// Dynamically adds location info in location status section
(function locationStatus(travelData) {
  const data = travelData.results[0];
  statsCity.innerHTML = data.id;
  statsCountry.innerHTML = data.country_id;
  statsScore.innerHTML = data.score.toFixed(1);
  statsAbout.innerHTML = data.intro;
  showcaseImage.setAttribute('src', data.images[0].source_url);
})(travelInfo);

// creates html for cards
function createCards(data, title) {
  const renderCards = data.results.map(
    card => `
        <div class="card-info">
        <ul class="info-1">
        <li>Name: <span>${card.name}</span></li>
        <li>Price Tier: <span>${card.price_tier}</span></li>
        <li>Score: <span>${card.score.toFixed(1)}</span></li>
        </ul>
        </div>
        `
  );
  return `
    <div class="card">
      <h3>${title}</h3>
      ${renderCards.join('')}
    </div>
    `;
}

// titles for each card
const titleEats = 'Top3: Restaurants';
const titleHotels = 'Top3: Hotels';
const titleTours = 'Top3: Tours';
const titleNightlife = 'Top3: Nightlife';
const titleSights = 'Top3: Sightseeing';

// Call create cards function to create html for each card
infoCards.innerHTML = createCards(eatInfoParse, titleEats);
infoCards.innerHTML += createCards(hotelInfoParse, titleHotels);
infoCards.innerHTML += createCards(tourInfoParse, titleTours);
infoCards.innerHTML += createCards(nightlifeInfoParse, titleNightlife);
infoCards.innerHTML += createCards(sightSeeingInfoParse, titleSights);

// latitude and Longitude from location data to enter into google maps
const lat = travelInfo.results[0].coordinates.latitude;
const lng = travelInfo.results[0].coordinates.longitude;

// google maps
let map;
function initMap(data) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat, lng },
    zoom: 8,
  });
}
