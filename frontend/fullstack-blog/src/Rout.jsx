
import App from './App.jsx'
import './index.css'

import { Addpost, Home, Signup,Login, Editpost, Allposts } from './components/index.js'

import Post from './components/pages/Post.jsx'
import Authlayout from './components/sections/Authlayout.jsx'
import Persistentheader from './components/persistent/Persistentheader.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Rout = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            
            <Route path="Signup" element={<Authlayout authentication={false}><Signup /></Authlayout>} />
            <Route path="Login" element={<Authlayout authentication={false}><Login /></Authlayout>} />
            <Route element={<Persistentheader />}>
            <Route index element={<Home />} />
            <Route path="Addpost" element={
        
                <Authlayout authentication><Addpost /></Authlayout>
     
            } />
            <Route path="Allposts" element={
                <Authlayout authentication><Allposts /></Authlayout>
  
            } />
            <Route path="Editpost/:postId" element={
     
                <Authlayout authentication><Editpost /></Authlayout>
        
            } />
            <Route path="Post/:postId" element={
              <Authlayout authentication>
         
                  <Post />
            
              </Authlayout>
            } />
          </Route>
          </Route>
        </Routes>
      </Router>
    );
  };
  export default Rout