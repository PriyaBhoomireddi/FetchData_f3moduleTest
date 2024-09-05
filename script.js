let fectchBtn = document.getElementById("fetch-btn");
fectchBtn.addEventListener("click", getLocation);
let maincontainer = document.getElementsByClassName("landing-page")[0];
function getLocation() {
   
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition,showerror);
    } else { 
      alert("Geolocation is not supported by this browser.");
      
    }
    
  }
  // function createLoading2(){
  //   const newDiv = document.createElement("div");
  //   newDiv.innerText = `Dynamically created div: Lat: ${latValue}, Long: ${longValue}`;
  // }
  function showerror(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  }
// let lat = document.getElementsByClassName("lat")[0];
// let long = document.getElementsByClassName("long")[0];
let latValue = 35.856737;
let longValue =10.606619;

function showPosition(position){
  maincontainer.remove();
    latValue = position.coords.latitude;
    longValue = position.coords.longitude;

    let apiKey = "AIzaSyA9RYhyiM14O2GfwJhnHyyjFVz2wZ7scis";
    let baseUrl= `https://api.openweathermap.org/data/3.0/onecall?lat=${latValue}&lon=${longValue}&appid=${apiKey}`
    
    async function getData(){
      let responce = await fetch(baseUrl);
      let data = await responce.json();
      // To process further api asking subcription , so i am unable to do further. kindly check error and consider that. 
        console.log(data)
    }
    getData();
  
  createLoading2();

}
  
  function createLoading2(){
    let secondLanding = document.createElement("div");
    secondLanding.className="second-landing-page";
    let innerSide = document.createElement("div")
     innerSide.innerHTML = `<div class="container-2">

    <div class="map-data-container">
        <div class="map-content">
            <h3>Welcome To The Weather App</h3>
            <p>Here is your current location</p>
            <div class="lat-long">
                <div class="lat">Lat: ${latValue}</div>
                <div class="long">Long: ${longValue}</div>
            </div>
           
        </div>
        <div class="map">
            <iframe src="https://maps.google.com/maps?q=${latValue}, ${longValue}&z=15&output=embed"></iframe>
        </div>
    </div>

</div>

<div class="weather-data-container">
    <div class="weather-content">
        <h3>Your Weather Data</h3>
        <div class="weather-data">
            <div class="weather">Location: New Delhi</div>
            <div>Wind Speed:  100kmph</div>
            <div>Humidity : 10</div>
            <div>Time Zone : GMT +5:30</div>
            <div>Pressure: 10atm</div>
            <div>Wind Direction : North West</div>
            <div>UV Index : 500</div>
            <div>Feels like: 30°</div>
        </div>
    </div>
</div>`
    secondLanding.appendChild(innerSide);
    document.body.appendChild(secondLanding);
  }
