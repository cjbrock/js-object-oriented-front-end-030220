class Post{
  static all = []

  constructor({id, title, author, content, likes}){
    this.id = id
    this.title = title
    this.author = author
    this.content = content
    this.likes = likes
    Post.all.push(this)
  }

  // create our html elements to display the post
  postHTML(){
    return (`
    <div class="card">
      <div class="card-content" id=${this.id}>
        <span class="card-title">${this.title}</span>
        <span class="card-author"><p>${this.author}</p></span>
        <span class="card-content"><p>${this.content}</p></span>
        <span class="card-likes"><p class="likes">${this.likes}</p></span>
        <button class="like-button">Like Me!</button>
        <button class="update">Update Me!</button>
        <button class="delete">Delete me? :-(</button>
      </div>
    </div>
    `)
  }





}


