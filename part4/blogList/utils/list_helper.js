const Blog = require("../models/blog")

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

const list = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  list,
  blogsInDb
}