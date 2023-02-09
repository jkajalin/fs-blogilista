// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, blogitem) => sum + blogitem.likes, 0)
  console.log(total)
  return total
}

const favouriteBlog = (blogs) => {
  const mostlikedItem = blogs.reduce((previousItem, blogitem) => {
    let mostLiked = previousItem
    if (blogitem.likes >= mostLiked.likes) {
      mostLiked = blogitem
    }
    return mostLiked
  })
  console.log(mostlikedItem)
  return mostlikedItem
}

module.exports = {
  dummy, totalLikes, favouriteBlog,
}
