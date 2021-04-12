---
postId: 2
title: Markdown! (Not a Sales Pitch)
date: April 5, 2021
author: lonesome-coder
summary: Markdown is the simplest way to add content to a website. There are a few things to learn to use it with React...
keywords: markdown parse-md react-markdown firestore
filename: 02_CB-using-markdown.md
---

![markdown logo](../assets/markdown-mark.png)

One of the first topics I researched when building the blog was how to create the blog posts. Writing HTML or JSX is clumsy, and I like simple.

It became clear that Markdown was the way to go. It's used in writing _readme.md_ files that you store with your repositories. There are special characters that are used to format Markdown, but they are easier to type than tags. [Here](https://commonmark.org/help/) is a cheatsheet to help you get started.

## Loading a Markdown File in React

React prevents the use the Nodejs filesystem. But, you can read files using the Javascript FileReader class. I use hooks and functional components, so this is the setup:

```js
function Admin() {
  const [mData, setMData] = useState('')
  const [markdownFile, setMarkdownFile] = useState('')
  const [postContent, setPostContent] = useState('')

  const metadataFileSelectedHandler = async (event) => {
    setFile(event.target.files[0])
    let rawFile = (event.target.files[0])
    let reader = new FileReader()

    reader.readAsText(rawFile)
    reader.onload = await function () {
      let text = reader.result
      setMarkdownFile(text)
    };
    reader.onerror = await function () {
      console.log(reader.error);
    };
  };

    const parseHandler = async () => {
    const { metadata, content } = parseMD(markdownFile)
    setMData(metadata)
    setPostContent(content)
    const linesArray = markdownFile.split('\n')
    linesArray.splice(0, 10)
    let contentString = linesArray.join("\n")
    console.log(contentString)
    setPost(contentString)
  };

```

## How to Render Markdown in React

So how do you get the Markdown-formatted content to render on the brower? I use two techniques.

For each post, I write a _\*.md_ file. What's great about this is that code editors like VS Code let you open a view that shows what the rendered content looks like.

A trick I picked up is to add metadata to the files. Start the file with _`---`_, and anything entered until the next line with _`---`_ is interpreted as metadata by the _parse\-.md_ package (see [npm parse\_.md](https://www.npmjs.com/package/parse-md)). Here's an example:

```js
---
postId: 1
TItle: Post Title
Date:  April 1, 2021
summary: Write an attention-getting summary here...
keywords: markdown parse-md react-markdown firestore
filename: filename.md
---
## Start the Content Here
...
```

The posts are saved to Firestore, and retrieved as an array of objects. I use the `postId` to sort the posts in descending order so the most recent post is shown first.

The _parse_md_ package makes it easy to separate the metadata from the content. Just do this:

```js
const { metadata, content } = parseMD(string);
```
