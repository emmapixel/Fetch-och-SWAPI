
//Declare arrowfunction getPosts and use async method so that we can use await method.
const getPosts = async () => {
    //Declare variable response that has the value from what fetch brings us from the swapi api.
    const response = await fetch("https://swapi.dev/api/films/");
    //Declare variable data that has the value of the json body.
    const data = await response.json();
    console.log(data);
    //Declare variable cards and give it value of the whole body(data)then results gives us only the movies and map is going through all of the movies.
    const cards = data.results.map(movie =>
        /*Declare movie variable and for every movie we will create a card div. 
        The movie title will be presented inside a h2 title.
        The movie release date will be presented inside a pharagraph.
        We use map so that we can use the join method that will join all our strings together and use an empty string so that we will not get any commas inbetween*/
        `<div class="card" onclick="openModal(${movie.title})">
        <h2>${movie.title}</h2>
        <p>${movie.release_date}</p>
        </div>`)
    .join("");
    //We target the card container and put our cards inside out HTML code.
    document.querySelector("#card-container").innerHTML = cards;
}

function openModal(movie){
    document.querySelector("#modal-container").style.display = "flex";
    console.log(movie);
}

function closeModal(){
    document.querySelector("#modal-container").style.display = "none";
}

//Here we call our function getPosts.
getPosts();