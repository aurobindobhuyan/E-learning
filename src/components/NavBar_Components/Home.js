import React from 'react';
import { useSelector } from 'react-redux'
import image from '../../Home_Page_Images/banner-1.png'
import jsImage from '../../Home_Page_Images/javascript.png'
import reactImage from '../../Home_Page_Images/react.png'
import reduxImage from '../../Home_Page_Images/redux.png'
import mongodbImage from '../../Home_Page_Images/mongodb.jpg'
import htmlImage from '../../Home_Page_Images/HTML&CSS.png'
import expressImage from '../../Home_Page_Images/express.png'
import { Toolbar, Typography } from '@mui/material';

const Home = () => {
     const store = useSelector((store) => {
          return store.isLoggedIn
     })
     const parentDiv = { display: 'flex', flexWrap: 'wrap', width: '60%', height: '80%' }
     const childDiv = { flex: '1 1 200px', margin: '0 20px', textAlign: 'center' }
     const figureTag = { height: '60%' }
     const imageTag = { objectFit: 'cover', maxWidth: '100%' }
     const bTag = { fontSize: '20px' }

     return (
          <>
               <div className='appDiv1' >
                    <img id='backgroundImage' src={image} alt="background" />
                    {
                         store ? (
                              <div className='appDiv1'>
                                   <Toolbar />
                                   <h1 style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>POPULAR ONLINE COURSES</h1>
                                   <div style={parentDiv}>
                                        <div style={childDiv}>
                                             <figure style={figureTag}>
                                                  <img style={imageTag} src={jsImage} alt="js image" />
                                             </figure>
                                             <br />
                                             <b style={bTag}>Javascript (ES6)</b>
                                        </div>
                                        <div style={childDiv}>
                                             <figure style={figureTag}>
                                                  <img style={imageTag} src={reactImage} alt="js image" />
                                             </figure>
                                             <br />
                                             <b style={bTag}>ReactJS</b>
                                        </div>
                                        <div style={childDiv}>
                                             <figure style={figureTag}>
                                                  <img style={imageTag} src={reduxImage} alt="js image" />
                                             </figure>
                                             <br />
                                             <b style={bTag}>ReduxJS</b>
                                        </div>
                                        <div style={childDiv}>
                                             <figure style={figureTag}>
                                                  <img style={imageTag} src={htmlImage} alt="js image" />
                                             </figure>
                                             <br />
                                             <b style={bTag}>HTML & CSS</b>
                                        </div>
                                        <div style={childDiv}>
                                             <figure style={figureTag}>
                                                  <img style={imageTag} src={expressImage} alt="js image" />
                                             </figure>
                                             <br />
                                             <b style={bTag}>ExpressJS</b>
                                        </div>
                                        <div style={childDiv}>
                                             <figure style={figureTag}>
                                                  <img style={imageTag} src={mongodbImage} alt="js image" />
                                             </figure>
                                             <br />
                                             <b style={bTag}>MongoDB</b>
                                        </div>
                                   </div>
                              </div>
                         ) : (
                              <div className='appDiv1' style={{ fontFamily: 'sans-serif', paddingLeft: '50px', paddingTop: '50px' }}>
                                   <Toolbar />
                                   <Typography variant='h2'>Demo LogIn Credentials</Typography>
                                   <Typography variant='h3'>Demo details for Admin</Typography>
                                   <h3>Email - aurobindo@gmail.com</h3>
                                   <h3>Password - secret123</h3>
                                   <Typography variant='h3'>Demo details for student</Typography>
                                   <h3>Email - ananya@gmail.com</h3>
                                   <h3>Password - 12345678</h3>
                              </div>
                         )
                    }
               </div>
          </>
     );
}

export default Home;