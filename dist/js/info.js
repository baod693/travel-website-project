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

function locationStatus(travelData) {
  const data = travelData.results[0];
  statsCity.innerHTML = data.id;
  statsCountry.innerHTML = data.country_id;
  statsScore.innerHTML = data.score.toFixed(1);
  statsAbout.innerHTML = data.intro;
  showcaseImage.setAttribute('src', data.images[0].source_url);
}
locationStatus(travelInfo);

function createCards(eatInfo, title) {
  // console.log("ssssssssss");
  const renderCards = eatInfo.results.map(
    card => `
        <div class="card-info">
        <ul class="info-1">
        <li>Name: <span class="name-span1">${card.name}</span></li>
        <li>Price Tier: <span class="price-span1">${card.price_tier}</span></li>
        <li>Score: <span class="score-span1">${card.score.toFixed(
          1
        )}</span></li>
        </ul>
        </div>
        `
  );
  // console.log(eatInfo);
  // building the cards here
  return `
    <div class="card">
    <h3>${title}</h3>
    ${renderCards.join('')}
    </div>
    `;
}
const infoCards = document.querySelector('.info-cards');
const title = 'Top3: Restaurants';
const titleHotel = 'Top3: Hotels';
const titleTour = 'Top3: Tours';
const titleNightlife = 'Top3: Nightlife';
const titleSightSeeingInfo = 'Top3: Sightseeing';
// add variables here........................................
infoCards.innerHTML = createCards(eatInfoParse, title);
infoCards.innerHTML += createCards(hotelInfoParse, titleHotel);
infoCards.innerHTML += createCards(tourInfoParse, titleTour);
infoCards.innerHTML += createCards(nightlifeInfoParse, titleNightlife);
infoCards.innerHTML += createCards(sightSeeingInfoParse, titleSightSeeingInfo);

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

// Create the script tag, set the appropriate attributes
// var script = document.createElement('script');
// script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
// script.defer = true;
// script.async = true;

// // Attach your callback function to the `window` object
// window.initMap = function() {
//   // JS API is loaded and available
// };

// // Append the 'script' element to 'head'
// document.head.appendChild(script);
