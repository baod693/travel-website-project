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

// handle user submit
function handleButtonClick(e) {
  e.preventDefault();
  let searchInputValue = userInput.value; // assigned user input value to searchInputValue
  // cardInfo(cardInformation);
  // console.log(searchInputValue);
  searchInputValue =
    searchInputValue.charAt(0).toUpperCase() + searchInputValue.slice(1);
  // passing the input value ${searchInputValue} to the function eatInfo
  eatInfo(searchInputValue);
  hotelInfo(searchInputValue);
  tourInfo(searchInputValue);
  nightlifeInfo(searchInputValue);
  sightSeeingInfo(searchInputValue);
  // const urlEncoded = encodedURIComponent(searchInputValue);  //urlEncoded will not work due to api search input New_York_City
  const endpoint = `https://www.triposo.com/api/20200405/location.json?id=${searchInputValue}&fields=all&account=3XPHWAVV&token=ubjfil8myjnlk6z1t6m3dehs96y9upct`;
  const searchPromise = fetch(endpoint);
  searchPromise
    .then(response => response.json())
    .then(data => {
      // console.log(searchInputValue); //testing to console log searchinputvalue
      const userSelectionJSON = JSON.stringify(data);
      sessionStorage.setItem('userInformation', userSelectionJSON); // takes the fetched data and save in the session storage
      window.location.href = 'info.html';
    })
    .catch(err => console.log(err));
}

function eatInfo(cardInformation) {
  console.log(cardInformation);
  // top 3 interesting finds
  const endpoint = `https://www.triposo.com/api/20200405/poi.json?location_id=${cardInformation}&tag_labels=eatingout&count=3&fields=id,name,score,price_tier&order_by=-eatingout_score&account=3XPHWAVV&token=ubjfil8myjnlk6z1t6m3dehs96y9upct`;
  const searchPromise = fetch(endpoint);
  searchPromise
    .then(response => response.json())
    .then(data => {
      const eatInfoJSON = JSON.stringify(data);
      sessionStorage.setItem('eatInfo', eatInfoJSON); // takes the poi data and save in the session storage
    })
    .catch(err => console.log(err));
}
// listens for user submit event,
btnSubmit.addEventListener('click', handleButtonClick);

function hotelInfo(cardInformation) {
  // top 3 hotels
  const endpoint = `https://www.triposo.com/api/20200405/poi.json?location_id=${cardInformation}&tag_labels=hotels&count=3&fields=id,name,score,price_tier&account=3XPHWAVV&token=ubjfil8myjnlk6z1t6m3dehs96y9upct`;
  const searchPromise = fetch(endpoint);
  searchPromise
    .then(response => response.json())
    .then(data => {
      const hotelInfoJSON = JSON.stringify(data);
      sessionStorage.setItem('hotelInfo', hotelInfoJSON); // takes the poi data and save in the session storage
    })
    .catch(err => console.log(err));
}

function tourInfo(cardInformation) {
  // top 3 tours
  const endpoint = `https://www.triposo.com/api/20200405/tour.json?location_ids=${cardInformation}&count=3&fields=id,name,score,price,price_is_per_person,vendor,intro,tag_labels&order_by=-score&account=3XPHWAVV&token=ubjfil8myjnlk6z1t6m3dehs96y9upct`;
  const searchPromise = fetch(endpoint);
  searchPromise
    .then(response => response.json())
    .then(data => {
      const tourInfoJSON = JSON.stringify(data);
      sessionStorage.setItem('tourInfo', tourInfoJSON); // takes the poi data and save in the session storage
    })
    .catch(err => console.log(err));
}

function nightlifeInfo(cardInformation) {
  // top 3 night life
  const endpoint = `https://www.triposo.com/api/20200405/poi.json?location_id=${cardInformation}&tag_labels=nightlife&count=3&fields=id,name,score,price_tier&account=3XPHWAVV&token=ubjfil8myjnlk6z1t6m3dehs96y9upct`;
  const searchPromise = fetch(endpoint);
  searchPromise
    .then(response => response.json())
    .then(data => {
      const nightlifeInfoJSON = JSON.stringify(data);
      sessionStorage.setItem('nightLifeInfo', nightlifeInfoJSON); // takes the poi data and save in the session storage
    })
    .catch(err => console.log(err));
}

function sightSeeingInfo(cardInformation) {
  // top 3 sightSeeing information
  const endpoint = `https://www.triposo.com/api/20200405/poi.json?location_id=${cardInformation}&tag_labels=sightseeing&bookable=1&count=3&fields=id,name,score,intro,booking_info&order_by=-score&account=3XPHWAVV&token=ubjfil8myjnlk6z1t6m3dehs96y9upct`;
  const searchPromise = fetch(endpoint);
  searchPromise
    .then(response => response.json())
    .then(data => {
      console.log(cardInformation);
      const sightSeeingInfoJSON = JSON.stringify(data);
      sessionStorage.setItem('sightSeeingInfo', sightSeeingInfoJSON); // takes the poi data and save in the session storage
    })
    .catch(err => console.log(err));
}
