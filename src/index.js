const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

let toyCollection = document.querySelector('#toy-collection')
let toyFormSubmit = document.querySelector('.add-toy-form')


toyFormSubmit.addEventListener('submit', (event) => {
  event.preventDefault()
  console.log('Form Submitted')
  let newToyName = toyFormSubmit.name.value
  let newToyImage = toyFormSubmit.image.value
  console.log(newToyName, newToyImage)
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'name': newToyName,
      'image': newToyImage,
      'likes': 0
    })
  }).then(res => res.json())
  .then(toy => toyCollection.innerHTML += makeToyCardHtml(toy))
})

const fetchToys = () => {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then((arrayOfToys) => {
    arrayOfToys.forEach((toy) => {
      toyCollection.innerHTML += makeToyCardHtml(toy)
    })
  })
}
fetchToys()



// Helper function, returns the specific HTML
const makeToyCardHtml = (toy) => {
  return `<div class="card" data-id="${toy.id}">
  <h2>${toy.name}</h2>
  <img src='${toy.image}' class="toy-avatar" />
  <p>${toy.likes} Likes </p>
  <button class="like-btn" data-likes="${toy.likes}" data-id="${toy.id}">Like <3</button>
  <button class="delete-btn" data-id="${toy.id}">Throw Away Toy</button>
  </div>`
}

toyCollection.addEventListener('click', (event) => {
  if (event.target.className === 'delete-btn') {
    let toyId = event.target.dataset.id
    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(toyCollection.innerHTML = '')
    .then(fetchToys)
  }
})


toyCollection.addEventListener('click', (event) => {
  if (event.target.className === 'like-btn') {
    let toyId = event.target.dataset.id
    let likeCount = event.target.dataset.likes
    let newLikes = parseInt(likeCount) + 1
    event.target.dataset.likes++
    let pTag = event.target.parentElement.querySelector("p")
    pTag.innerText = `${newLikes} Likes`
    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        likes: newLikes
      })
    }).then(res => res.json())
  }
})


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
