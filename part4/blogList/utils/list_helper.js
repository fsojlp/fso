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

module.exports = {
  dummy,
  totalLikes
}