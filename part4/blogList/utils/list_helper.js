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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}