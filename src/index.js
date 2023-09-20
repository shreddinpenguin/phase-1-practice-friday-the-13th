let currentMovie
let bloodCount
const movieTitle = document.querySelector("#title")
const release = document.querySelector("#year-released")
const description = document.querySelector("#description")
const movieImage = document.querySelector("#detail-image")
const watchedStatus = document.querySelector("#watched")
const bloodQ = document.querySelector("#amount")
const movieList = document.querySelector("#movie-list")
const bloodForm = document.querySelector("#blood-form")
document.addEventListener("DOMContentLoaded", ()=>{
    fetch("http://localhost:3000/movies")
    .then(res => res.json())
    .then(data => {
        data.forEach(movie => {
            displayImage(movie)
        })
        showDetails(data[0])
        toggleButton()
    })
})

function displayImage(movie) {
    let img = document.createElement("img")
    img.src = movie.image
    img.addEventListener("click", ()=>{
        showDetails(movie)
    })
    movieList.appendChild(img)
}

function showDetails(movie){
    currentMovie = movie
    movieTitle.textContent = movie.title
    release.textContent = movie.release_year
    description.textContent = movie.description
    movieImage.src = movie.image
    watchedStatus.textContent = movie.watched ? "watched": "unwatched" 
    bloodQ.textContent = movie.blood_amount
}

function toggleButton(){
    watchedStatus.addEventListener("click", (e)=>{
        currentMovie.watched = !currentMovie.watched
        watchedStatus.textContent = currentMovie.watched ? "watched": "unwatched" 
    })
    
}

bloodForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    const amountToAdd = e.target["blood-amount"].value
    currentMovie.blood_amount += parseInt(amountToAdd)
    bloodQ.textContent = currentMovie.blood_amount
})