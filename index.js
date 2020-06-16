document.addEventListener("DOMContentLoaded", function(){
  loadPosts()
  loadFormListener()
  clickEvent()
  mouseOverEvent()
  buttonEvent()
  eventDelegation()
})

const formTitle =   document.getElementById("title")
const formAuthor = document.getElementById("author")
const formContent = document.getElementById("content")
const postForm = document.getElementById("blog-form")
const baseURL = "http://localhost:3000/blogs"



function likeMe(){

  const likeButtons = document.querySelectorAll(".like-button")
  for (const likeButton of likeButtons){
    likeButton.addEventListener("click", sendLike)
  }
}

async function sendLike(e){
  const postID = e.target.parentElement.id
  let likes = parseInt(e.target.parentElement.querySelector(".likes").innerText)
  likes ++

  const postObj = {
    likes: likes
  }

  const options ={
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({blog:postObj})
  }
  const url = `${baseURL}/${postID}`

  const resp = await fetch(url, options)
  const data = await resp.json()
  loadPosts()
}

// event delegation
function eventDelegation(){
  const postList = document.querySelector(".post-lists")
  postList.addEventListener("click", function(e){
    if (e.target.className === "like-button"){
      // let likes = parseInt(e.target.parentElement.querySelector(".likes").innerText)
      // let new_likes = likes+1
      // e.target.parentElement.querySelector(".likes").innerText = new_likes
    }else if (e.target.className === "update"){
      console.log("you clicked update")
      // grab the data from the card
      const [title, author, content] = e.target.parentElement.querySelectorAll("span")
      // insert the data on the form
      formTitle.value = title.innerText
      formAuthor.value = author.innerText
      formContent.value = content.innerText
      postForm.dataset.id = e.target.parentElement.id

      document.querySelector(".btn").value = "Edit Post"
      // adjust the form to be either create or edit
      // adjust the hidden values and add the id somewhere
      postForm.dataset.action = "update"
      // adjust the fetch for either create or edit
      // clean up???
    } else if (e.target.className === "delete"){
      console.log(`you clicked delete ${e.target.parentElement.id}`)
      const postID = e.target.parentElement.id
      deletePost(postID)
    }
  })
}



// add our posts to the page
function addPostsToPage(posts){
  document.querySelector(".post-lists").innerHTML = ""
  posts.forEach(function(post){
    // need to create the post in here
    attachPost(postHTML(post))
  })
}

// load our posts
function loadPosts(){
  fetch("http://localhost:3000/blogs")
  .then(resp => resp.json())
  .then(data => {
    addPostsToPage(data)
  })
  .then(()=> likeMe())
}

// grab text from each field
function getInfo(){
  return{
    title: formTitle.value,
    author: formAuthor.value,
    content: formContent.value
  }
}


// create our html elements to display the post
function postHTML(post){
  return `
  <div class="card">
    <div class="card-content" id=${post.id}>
      <span class="card-title">${post.title}</span>
      <span class="card-author"><p>${post.author}</p></span>
      <span class="card-content"><p>${post.content}</p></span>
      <span class="card-likes"><p class="likes">${post.likes}</p></span>
      <button class="like-button">Like Me!</button>
      <button class="update">Update Me!</button>
      <button class="delete">Delete me? :-(</button>
    </div>
  </div>
  
  `
}


// append the html elements onto the existing list
const attachPost = function(post){
  document.querySelector(".post-lists").innerHTML += post
}


// clear form
const clearForm = () => {
  formTitle.value = ""
  formAuthor.value = ""
  formContent.value = ""
  postForm.dataset.action = "create"
  delete postForm.dataset.id
  document.querySelector(".btn").value = "Create Post"
}


function loadFormListener(){
  // identify the element we want to target

  // add the event listener to the target (form)
  postForm.addEventListener("submit", function(event){
    event.preventDefault()

    // add functionality
    // grab text from each field
    const postResults = getInfo()
    let options
    let url
    if (postForm.dataset.action === "create"){
      options ={
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postResults)
      }
      url = baseURL
    }else if (postForm.dataset.action === "update"){
      options ={
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postResults)
      }
      url = `${baseURL}/${postForm.dataset.id}`
    }
    fetch(url, options)
    .then(resp => resp.json())
    .then(data => {
      if(!data.errors){
        loadPosts()
        clearForm()
      }else{
        throw new Error( `${data.errors}`)
      }      
    })
    .catch(alert)
  })
}


async function deletePost(id){
  const resp = await fetch(`${baseURL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await resp.json()
  loadPosts()
}



const colors = ["red", "orange", "yellow", "green", "blue", "indigo","purple"]
let index = 0
const maxIndex = colors.length

const changeColor = (title) => {   
  title.style.color = colors[index++]
  if(index == maxIndex){
      index = 0;
  }
}

// click event
function clickEvent(){
  const title = document.querySelector(".post-lists h3")
  title.addEventListener("click", function(){
      changeColor(title)
  })
}


// mouse over event
function mouseOverEvent(){
  const header = document.querySelector("h1")
  header.addEventListener("mouseover",()=>changeColor(header))
}


// button event
function buttonEvent(){
  const allPosts = document.querySelector(".post-lists")
  const colors = ["red", "orange", "yellow", "green", "blue", "indigo","purple"]
  let index = 0
  const maxIndex = colors.length
  allPosts.addEventListener("click", function(e){
      if (e.target.className === "colorButton"){
          e.target.parentElement.parentElement.style.backgroundColor = colors[index++]
          if(index == maxIndex){
              index = 0;
          }
      }
  })
}