let imageId = 3857//Enter the id from the fetched image here
const IMAGE_URL = `https://randopic.herokuapp.com/images/${imageId}`
const LIKE_URL = `https://randopic.herokuapp.com/likes/`
const COMMENTS_URL = `https://randopic.herokuapp.com/comments/`
let CURRENT_IMAGE = {}

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  init()

})

function init(){
  let commentForm = document.getElementById("comment_form")
  commentForm.addEventListener('submit', (ev) => {
    ev.preventDefault()
    addNewComment()
  })
  let likeButton = document.getElementById("like_button")
  likeButton.addEventListener('click', (ev) => {
    ev.preventDefault()
     addLikes()
  })
  fetchData()
}

function fetchData(){
  fetch(IMAGE_URL)
  .then(resp => resp.json())
  .then(json => {
    CURRENT_IMAGE = json
    console.log(CURRENT_IMAGE)
    displayImage()
  })
}

function displayImage(){
  let image = document.getElementById("image_card").querySelector("img")
  image.src = "http://blog.flatironschool.com/wp-content/uploads/2017/06/IMAG2936-352x200.jpg"
  let title = document.getElementById("name")
  title.textContent = CURRENT_IMAGE.name
  let span = document.getElementById("likes")
  span.textContent = CURRENT_IMAGE.like_count
  let comments = document.getElementById("comments")
  for(const comment of CURRENT_IMAGE.comments){
    let commentLi = document.createElement("li")
    commentLi.textContent = comment.content
    comments.append(commentLi)
  }
};

function addLikes(){
  let span = document.getElementById("likes")
  CURRENT_IMAGE.like_count++
  let totalLikes = CURRENT_IMAGE.like_count
  span.textContent = totalLikes
    fetch(_URL, {
    method: 'POST',
    headers: {
      'Content-Type': "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      like_count: totalLikes
    })
  })
};

function addNewComment(){
    let newComment = document.getElementById("comment_input")
    console.log(newComment)
    let comments = document.getElementById("comments")
    let commentLi = document.createElement("li")
    commentLi.textContent = newComment.value
    comments.append(commentLi)


    // return fetch(COMMENTS_URL + CURRENT_IMAGE.id {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': "application/json",
    //     Accept: "application/json"
    //   },
    //   body: JSON.stringify({
    //     content: newCommentText
    //   })
    // })
    // .then(resp => resp.json())
    // .then(json => {
    //   CURRENT_IMAGE = json
    //   console.log(CURRENT_IMAGE)
    //   displayImage()
    // })
};
