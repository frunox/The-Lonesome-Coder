---
postUid: postUid3
postId: 3
title: Creating the Blog - Back End
date: April 8, 2021
author: lonesome-coder
summary: How did I decide what back end to use
keywords: firebase firestore cloud storage
filename: 03_thirdpost.md
---

In considering how to create this blog project, I stuck with familiar for the front end: Reactjs, JavaScript, and a few additional packages.

For the back end, I wanted mostly to simplify my life. I went with a Backend-as-a-Service (BAAS), a cloud provider. I had dabbled in Amazon Web Services (AWS), but I found it too complex. There is a good reason that AWS is the biggest BAAS provider: Their services are comprehensive, and they have great infrastructure. But for a small application like this, there seemed to be more setup than necessary.

I went with Google's Firebase becuase getting started is simple. You don't have to deal with any hardware setup. Just create a project, select an authentication method and the database. Cloud storage is available by default.
