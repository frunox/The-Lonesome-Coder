import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { firestore } from './firebase';
import { usePostsUpdate } from './contexts/PostContext';
import Home from './pages/Home';
import AllPostsPage from './pages/AllPostsPage';
import AboutPage from './pages/AboutPage';
import Post from './components/Post';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const savePosts = usePostsUpdate();

  useEffect(() => {
    const getPosts = async () => {
      const postsRef = firestore.collection('metadata');
      await postsRef.get().then((snapshot) => {
        const posts = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        posts.sort((a, b) => b.postId - a.postId);
        savePosts(posts);
      });
      setIsLoading(false);
    };
    getPosts();
  }, [isLoading]);

  return (
    <React.Fragment>
      {!isLoading && (
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={AboutPage} />
            <Route path="/all-posts" component={AllPostsPage} />
            <Route path="/post/:id" render={(props) => <Post {...props} />} />
            <Route path="*" component={Home} />
          </Switch>
        </Router>
      )}
    </React.Fragment>
  );
}

export default App;
