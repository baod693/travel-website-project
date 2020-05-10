// UI Variables
const statsCity = document.querySelector('.stats-city');
const statsCountry = document.querySelector('.stats-country');
const statsScore = document.querySelector('.stats-score');
const statsAbout = document.querySelector('.about p');
const showcaseImage = document.querySelector('#showcase img');
const btnSubmit = document.querySelector('#btn-submit');
const userInput = document.querySelector('#search');
const submitForm = document.querySelector('#main-form');
const cardDiv = document.querySelector('.info-cards');
const container = document.querySelector('.container');

// handle user submit
function handleButtonClick(e) {
  e.preventDefault();
  let searchInputValue = userInput.value
    .replace(/ /g, '_')
    .replace(/\./g, '2e')
    .replace(/,/g, '2C');
  // capitalize first letter of user input value
  searchInputValue =
    searchInputValue.charAt(0).toUpperCase() + searchInputValue.slice(1);

  function titleCase(str) {
    const splitStr = str.toLowerCase().split('_');

    for (let i = 0; i < splitStr.length; i += 1) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join('_');
  }
  titleCase(searchInputValue);
  const magicCaps = titleCase(searchInputValue);

  // Call vars to fetch api request and pass user input value
  eatInfo(magicCaps);
  hotelInfo(magicCaps);
  tourInfo(magicCaps);
  nightlifeInfo(magicCaps);
  sightSeeingInfo(magicCaps);

  // API request: location
  const endpoint = `https://www.triposo.com/api/20200405/location.json?id=${magicCaps}&fields=all&account=3XPHWAVV&token=ubjfil8myjnlk6z1t6m3dehs96y9upct`;
  const searchPromise = fetch(endpoint);
  searchPromise
    .then(response => response.json())
    .then(data => {
      const userSelectionJSON = JSON.stringify(data);
      sessionStorage.setItem('userInformation', userSelectionJSON);
      const bgImg = data.results[0].images[1].source_url;
      container.style.backgroundImage = `url(${bgImg})`;
      btnSubmit.textContent = 'LOADING.........';
      setTimeout(function() {
        window.location.href = 'info.html';
      }, 2000);
    })
    .catch(err => {
      const alertDiv = document.querySelector('.alert');
      alertDiv.classList += ' show';
      alertDiv.style.opacity = 1;
      setTimeout(function() {
        alertDiv.style.opacity = 0;
        alertDiv.classList.remove('show');
      }, 3000);
    });
}

// API request: eats
function eatInfo(cardInformation) {
  const endpoint = `https://www.triposo.com/api/20200405/poi.json?location_id=${cardInformation}&tag_labels=eatingout&count=3&fields=id,name,score,price_tier&order_by=-eatingout_score&account=3XPHWAVV&token=ubjfil8myjnlk6z1t6m3dehs96y9upct`;
  const searchPromise = fetch(endpoint);
  searchPromise
    .then(response => response.json())
    .then(data => {
      const eatInfoJSON = JSON.stringify(data);
      sessionStorage.setItem('eatInfo', eatInfoJSON);
    })
    .catch(err => console.log(err));
}

// API request: hotels
function hotelInfo(cardInformation) {
  const endpoint = `https://www.triposo.com/api/20200405/poi.json?location_id=${cardInformation}&tag_labels=hotels&count=3&fields=id,name,score,price_tier&account=3XPHWAVV&token=ubjfil8myjnlk6z1t6m3dehs96y9upct`;
  const searchPromise = fetch(endpoint);
  searchPromise
    .then(response => response.json())
    .then(data => {
      const hotelInfoJSON = JSON.stringify(data);
      sessionStorage.setItem('hotelInfo', hotelInfoJSON);
    })
    .catch(err => console.log(err));
}

// API request: tours
function tourInfo(cardInformation) {
  const endpoint = `https://www.triposo.com/api/20200405/tour.json?location_ids=${cardInformation}&count=3&fields=id,name,score,price,price_is_per_person,vendor,intro,tag_labels&order_by=-score&account=3XPHWAVV&token=ubjfil8myjnlk6z1t6m3dehs96y9upct`;
  const searchPromise = fetch(endpoint);
  searchPromise
    .then(response => response.json())
    .then(data => {
      const tourInfoJSON = JSON.stringify(data);
      sessionStorage.setItem('tourInfo', tourInfoJSON);
    })
    .catch(err => console.log(err));
}

// API request: nightlife
function nightlifeInfo(cardInformation) {
  const endpoint = `https://www.triposo.com/api/20200405/poi.json?location_id=${cardInformation}&tag_labels=nightlife&count=3&fields=id,name,score,price_tier&account=3XPHWAVV&token=ubjfil8myjnlk6z1t6m3dehs96y9upct`;
  const searchPromise = fetch(endpoint);
  searchPromise
    .then(response => response.json())
    .then(data => {
      const nightlifeInfoJSON = JSON.stringify(data);
      sessionStorage.setItem('nightLifeInfo', nightlifeInfoJSON);
    })
    .catch(err => console.log(err));
}

// API request: sightseeing
function sightSeeingInfo(cardInformation) {
  const endpoint = `https://www.triposo.com/api/20200405/poi.json?location_id=${cardInformation}&tag_labels=sightseeing&count=3&fields=all&account=3XPHWAVV&token=ubjfil8myjnlk6z1t6m3dehs96y9upct`;
  const searchPromise = fetch(endpoint);
  searchPromise
    .then(response => response.json())
    .then(data => {
      const sightSeeingInfoJSON = JSON.stringify(data);
      sessionStorage.setItem('sightSeeingInfo', sightSeeingInfoJSON);
    })
    .catch(err => console.log(err));
}

// listens for user submit event,
btnSubmit.addEventListener('click', handleButtonClick);
