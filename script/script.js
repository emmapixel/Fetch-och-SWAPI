
//Declare arrowfunction getPosts and use async method so that we can use await method.
const getPosts = async () => {
    //Declare a constant "response" that has the value from what fetch brings us from the swapi api.
    const response = await fetch("https://swapi.dev/api/films/");

    //Declare a constant "data" that will contain the value of the json body.
    //await the data to be saved properly in the constant before doing the next line of code.
    const data = await response.json();
    console.log(data);

    const cardContainer = document.querySelector("#card-container");

    
    //Declare constant "cards" and give it value of the whole body(data)then results gives us only the movies and map is going through all of the movies.
    data.results.map(movie => {
        /*Declare movie variable and for every movie we will create a card div. 
        The movie title will be presented inside a h2 title.
        The movie release date will be presented inside a pharagraph.
        We use map so that we can use the join method that will join all our strings together and use an empty string so that we will not get any commas inbetween*/
        const box = document.createElement("div");
        box.className = "card";
        box.addEventListener("click", function() {
            openModal(movie);
        } );
        
        /*
        window.onload = function exampleFunction() {
            console.log("hej");
        }*/

        const title = document.createElement("h2");
        title.innerText = movie.title;
        title.className = "title";

        const releaseDate = document.createElement("p");
        releaseDate.innerText = movie.release_date;
        releaseDate.className = "release-date";

        //Set the relations
        box.appendChild(title);
        box.appendChild(releaseDate);
        cardContainer.appendChild(box);
    });
};

//-------------------Open-Modal-------------------------

/*First we make modal-container visible by changing display to flex.
Then we declare constant named title and create an h2 element.
Last we set innertext to the title of the movie and show it inside the h2 element.
*/ 
const openModal = async (movie) => {
    console.log(movie);
    document.querySelector("#modal-container").style.display ="flex";
    const title = document.createElement("h2");
    title.innerText = movie.title;
    const movieInfoContainer = document.querySelector("#movie-info-container");
    movieInfoContainer.appendChild(title);
};

const getCharacters = async () => {
    const result = await fetch("https://swapi.dev/api/people/")
}

function closeModal(){
    document.querySelector("#modal-container").style.display = "none";
    const movieInfoContainer = document.querySelector("#movie-info-container");
    movieInfoContainer.childNodes.forEach(childNode => {
        movieInfoContainer.removeChild(childNode);
    })
};

          /* <h2>Stjärnornaskrig</h2>
                <ul>
                    <li>Prinsessan Leah</li>
                    <li>Darth Vader</li>
                    <li>Luke Skywalker</li>
                </ul> */

//Declare arrowfunction named getAllCharacters and use async method so that we can use await method.
const getAllCharacters = async () => {
    const response = await fetch("https://swapi.dev/api/people/");
    console.log(response);
}

//Here we call our function getPosts.
getPosts();