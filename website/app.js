/* Global Variables */







// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

/////
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey =',&appid=83472258617d8593db6ca29ef34e591c&units=metric';
const btn = document.querySelector('button');

btn.addEventListener('click',performAction);

function performAction(){
    const zipCodeBox = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    if(!zipCodeBox){
        alert("Please, enter a zip code!");
    } else {
        getData(baseURL, zipCodeBox, apiKey).then(function(data){
            console.log(data);
            postData('/data',{
                temp:data.main.temp,
                date:newDate,
                content:feelings
            })
            /* updateUI(); */
        }) .then(function(){
            updateUI();
        }); 
    }
}

const getData = async function(baseURL, zipCodeBox, apiKey) {
    

    const request = await fetch(baseURL+zipCodeBox+apiKey)
    try{
        const response = await request.json();
        console.log(response);
        return response;
    } catch(error){
        console.log("error", error);
    }
};


const postData = async function(url="", data={}){
    console.log(data);
    const request = await fetch (url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', 
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
      });
    try{
        const newData = await request.json();
        console.log(newData);
        return newData;
    } catch(error){
        console.log('error',error);
    }
};





const updateUI = async function(){
    const request = await fetch('/get')
    try{
        const response = await request.json()

        const tempDiv = document.getElementById('temp');
        tempDiv.innerHTML=`Temperture: ${response.temp} &degC`;

        const dateDiv = document.getElementById('date');
        dateDiv.innerHTML=`Date: ${response.date}`;

        const contentDiv = document.getElementById('content');
        contentDiv.innerHTML=`Feeling: ${response.content}`;
    } catch(error){
        console.log('error',error);
    }
}







