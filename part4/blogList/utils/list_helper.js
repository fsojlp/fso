const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogList) => {
    if (blogList.length === 1){
        return blogList[0].likes
    } else {
        let total = 0
        blogList.map(b => total += b.likes)
        return total
    }
}

const favoriteBlog = (blogList) => {
    const formattedBlog = (blog) => {
        return { title: blog.title, author: blog.author, likes: blog.likes }
    }

    if (blogList.length === 0){
        return 0
    }

    if (blogList.length === 1){
        return formattedBlog(blogList[0])
    } else {
        const favourite = blogList.reduce((previous, current) => {
            return current.likes > previous.likes ? current : previous
        })
        return formattedBlog(favourite)
    }
}

const mostBlogs = (blogList) => {
    let counter = []
    if (blogList.length === 0){
        return 0
    }

    if (blogList.length === 1){
        return {author: blogList[0].author, blogs: 1}
    } else {
        for(let i = 0; i < blogList.length; i++){
            let auth = blogList[i].author
            if(counter.length === 0){
                counter.push({author:auth, blogs: 1})
            } else {
              for(let j = 0; j < counter.length; j++){
                 if(counter[j].author === auth){
                    counter[j].blogs += 1
                } else {
                    if(j === (counter.length - 1)){
                        counter.push({author:auth, blogs: 0})
                    }
                }    
            }  
            }
            
        }

    }
    const result = counter.reduce((previous, current) => {
            return current.blogs > previous.blogs ? current : previous
        })
        return {author: result.author, blogs: result.blogs}
}

const mostLikes = (blogList) => {
    let counter = []
    if (blogList.length === 0){
        return 0
    }

    if (blogList.length === 1){
        return {author: blogList[0].author, likes: blogList[0].likes}
    } else {
        for(let i = 0; i < blogList.length; i++){
            let auth = blogList[i].author
            if(counter.length === 0){
                counter.push({author:auth, likes: blogList[i].likes})
            } else {
              for(let j = 0; j < counter.length; j++){
                 if(counter[j].author === auth){
                    counter[j].likes += blogList[i].likes
                } else {
                    if(j === (counter.length - 1)){
                        counter.push({author:auth, likes: 0})
                    }
                }    
            }  
            }
            
        }

    }
    const result = counter.reduce((previous, current) => {
            return current.likes > previous.likes ? current : previous
        })
        return {author: result.author, likes: result.likes}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}