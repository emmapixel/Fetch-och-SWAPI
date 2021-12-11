//Declare arrowfunction getPosts and use async method so that we can use await method.
const getPosts = async () => {
    //Declare a constant "response" that has the value from what fetch brings us from the swapi api.
    const response = await fetch("https://swapi.dev/api/films/");

    //Declare a constant "data" that will contain the value of the json body.
    //await the data to be saved properly in the constant before doing the next line of code.
    const data = await response.json();

    //Create the container which will hold all the cards representing the movies
    const cardContainer = document.querySelector("#card-container");
    
    //Loop through each movie
    data.results.map(movie => {
        //Create a container for the movie information
        const box = document.createElement("div");
        box.className = "card";
        //When we click on the container, we call our openModal function
        box.addEventListener("click", function() {
            openModal(movie);
        } );

        //Create h2 representing the movie title
        const title = document.createElement("h2");
        title.innerText = movie.title;
        title.className = "title";

        //Create p representing the release date
        const releaseDate = document.createElement("p");
        releaseDate.innerText = movie.release_date;
        releaseDate.className = "release-date";

        //Set the parent-child relations
        box.appendChild(title);
        box.appendChild(releaseDate);
        cardContainer.appendChild(box);
    });
};

//-------------------Open-Modal-------------------------

const openModal = async (movie) => {
    //When opening the modal, our modal container and loader becomes visible
    document.querySelector(".loader").style.display = "flex";
    document.querySelector("#modal-container").style.display ="flex";

    //Create h2 for the movie title
    const h2Title = document.createElement("h2");
    h2Title.id = "movieTitle";
    h2Title.innerText = movie.title;
    const movieInfoContainer = document.querySelector("#movie-info-container");
    movieInfoContainer.appendChild(h2Title);

    //Create an unordered list representing all the movie characters
    const characterList = document.createElement("ul");
    characterList.id = "characterList";

    //Create an array that will hold our character names.
    const characterNames = [];

    //Remember that the movie.characters can look like this:
    //[0]: https://swapi.dev/api/people/1
    //[1]: https://swapi.dev/api/people/4
    //[2]: https://swapi.dev/api/people/23

    //Loop through each characterURL in the array movie.characters
    //For each characterURL, we will get the full character by calling our
    //function getCharacter.
    for (const characterURL of movie.characters) {
        //The full character is saved to the constant character.
        //It can look a little like this:
        //{
        //  name: 'Luke'
        //  age: '29'
        //  eyeColor: 'Blue'
        //}
        const character = await getCharacter(characterURL);

        //We push the character's name to the array, for example we push
        //the name Luke to the array.
        characterNames.push(character.name);
    }
    //Now we have populated the array with a couple of names. It can look like this now:
    // ['Luke','Chewbacca','Darth Vader']
    //But this array isn't sorted alphabetically. 
    //We can sort it by calling the sort function on our array.
    characterNames.sort();

    //Now the character names are sorted:
    //['Chewbacca','Darth Vader','Luke']

    //Loop through each character name.
    //Each name should generate a new li-element
    characterNames.forEach(characterName => 
        {
            //Create a new constant representing the new li-element
            const characterListItem = document.createElement("li");
            //The innerText of the li-element should be the character name
            characterListItem.innerText = characterName;
            //We add it to the DOM by defining the parent-child relation
            //In our case, the newly created li-element is the child of our
            //ul-element created earlier.
            characterList.appendChild(characterListItem);
            //The HTML can now for example look like this:
            /*
                <ul>
                    <li>Chewbacca</li>
                </ul>
            */
        })
    
    //Once we have all our li-elements, the ul-element is finished
    //and we can add it to the DOM. 
    //The parent of the ul-element is our movieInfoContainer div.
    movieInfoContainer.appendChild(characterList);
    
    //For example:
    /*
        <div class="movieInfoContainer">
            <ul>
                <li>Chewbacca</li>
                <li>Darth Vader</li>
                <li>Luke</li>
            </ul>
        </div>
    */

    //When everything is finished, our loader should be disabled.
    document.querySelector(".loader").style.display = "none";
};

//Fetching a specific character given an URL
//For example https://swapi.dev/api/people/1
const getCharacter = async (characterURL) => {
    const response = await fetch(characterURL);
    const characterInfo = await response.json(); 

    return characterInfo;
}

/*
When we close the modal, we remove all children of our movie info container
except the loader.
*/
function closeModal(){
    document.querySelector("#modal-container").style.display = "none";
    const movieInfoContainer = document.querySelector("#movie-info-container");
    const movieTitle = document.querySelector("#movieTitle");
    const characterList = document.querySelector("#characterList");
    movieInfoContainer.removeChild(movieTitle);
    movieInfoContainer.removeChild(characterList);
};

//Here we call our function getPosts.
getPosts();