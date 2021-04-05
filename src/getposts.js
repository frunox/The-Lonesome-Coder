const parseMD = require("parse-md")
const path = require("path")
const fs = require("fs")

const postPath = path.join(__dirname, "../src/posts")

let postlist = []

const getPosts = async () => {
  await fs.readdir(postPath, (err, files) => {
    if (err) {
      return console.log("Failed to get files in posts folder:  " + err)
    }
    // console.log(files)
    files.forEach((file, i) => {
      let postObj = {}
      let post
      fs.readFile(`${postPath}/${file}`, 'utf8', (err, contents) => {
        if (err) {
          return console.log("Failed to read files in posts folder:  " + err)
        }
        console.log(contents)
      })
    })


  })
}

getPosts()