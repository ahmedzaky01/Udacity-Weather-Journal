let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();
//make a GET request to the weather page 
// the URL for the weather Forecast
const appUrl = `https://api.openweathermap.org/data/2.5/weather?`;
// the variable to get the tempereture in fahrenheit degrees
let fahrenheit = 'imperial';
//genrated API for my credentials
const apiKey = 'cb7e9d6bba1c7e734e653e08446d1bb0';

//add event listener for the entered zip code for the required city
document.getElementById('generate').addEventListener('click', getForecast);

// create getforecast function to handle event listener for the city
function getForecast(){
    // add the user entry in the Feeling text area to a variable
    let feelings = document.getElementById("feelings").value;
    let zipCode = document.getElementById("zip").value;
    getEntry(zipCode,apiKey,fahrenheit)
    .then(function (newData){
        // add data to the POST request
       postEntry('/addtemp', {date: newDate, temperature: newData.main.temp , feelings})     
    }).then(function(newEntry){
        updateUI();
    })
}

//GET URL data
async function getEntry(zipCode,apiKey,fahrenheit) {
    const res = await fetch (`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=imperial`);
    try{
        const newData = await res.json();
        return newData
    }catch(error){
        console.log("error", error);
        //show error if it exists
    }
}

//POST data
async function postEntry  (url = '', data= {}){
    const request = await fetch(url, {
        method: 'POST',
        headers:{
            'content-type' : 'application/json'
        },
        body: JSON.stringify(data)
    });
try{
    const newEntry = await request.json();
    return newEntry;
} catch(error){
    console.log("Error", error)
};
};

//update UI with the new data
async function updateUI (){
    const request = await fetch('/allinfo')
    try{
        const allData = await request.json()
        console.log(allData)
        document.getElementById("date").innerHTML = "Today is " + allData.date;
        document.getElementById("temp").innerHTML= "Weather is " + allData.temperature + " F˚";
        document.getElementById("content").innerHTML= "I feel " + allData.content;
    }catch(error){
        console.log("error", error);
        document.getElementById("content").innerHTML= "Error happened, Try again later";
    }
};