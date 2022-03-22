import React, { useState } from 'react';
import { Link, Route, withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Badge, AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Tooltip, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import LockOpenSharpIcon from '@mui/icons-material/LockOpenSharp';
import RememberMeOutlinedIcon from '@mui/icons-material/RememberMeOutlined';
import swal from 'sweetalert';
import AdminRegister from './NavBar_Components/AdminRegister';
import Home from './NavBar_Components/Home';
import Details from './NavBar_Components/Details';
import AllStudents from './students-info/AllStudents';
import CoursesContainer from './courses_component/CoursesContainer';
import CourseDetails from './courses_component/CourseDetails';
import AboutUs from './NavBar_Components/AboutUs';
import CustomizedDialogs from './NavBar_Components/DisplayDialogue';
import LecturesContainer from './Lectures_Components/LecturesContainer';
import BackgroundLetterAvatars from './Avatar';
import { userLoggedOut } from '../redux/actions/loginAction'
import image from '../Home_Page_Images/byjus-app-removebg-preview (1).png'
import LoginForm from './NavBar_Components/LoginForm';
import LectureDetails from './Lectures_Components/LectureDetails';

const NavBar = (props) => {
     const [anchorElNav, setAnchorElNav] = useState(null); // NavBar State Variables
     const [anchorElUser, setAnchorElUser] = useState(null); // NavBar State Variables
     const [toggleLoginRegister, setToggleLoginRegister] = useState(false);

     const store = useSelector((store) => {
          return store
     })
     const dispatch = useDispatch()

     // Navbar control functions
     const handleOpenNavMenu = (event) => {
          setAnchorElNav(event.currentTarget);
     };
     const handleOpenUserMenu = (event) => {
          setAnchorElUser(event.currentTarget);
     };
     const handleCloseNavMenu = () => {
          setAnchorElNav(null);
     };
     const handleCloseUserMenu = () => {
          setAnchorElUser(null);
     };

     const handleToggleComponent = () => {
          setToggleLoginRegister(!toggleLoginRegister)
     }
     // Navbar control function

     const handleLogout = () => {
          dispatch(userLoggedOut())
          swal("Good job!", "You Loggedout Successfully!", "success", { button: "Ok!" });
          localStorage.removeItem('tokenInfo')
          localStorage.removeItem('role')
          props.history.push('/')
     }

     // Navbar Links after loggin in
     const navBarmenu = () => {
          const navBarLinks = [
               <Link to='/'>HOME</Link>, <Link to='/details'>DETAILS</Link>, <Badge color="secondary" badgeContent={store.allStudents.length}>
                    <Link to='/admin/students'>STUDENTS</Link>
               </Badge>, store.userInfo.role === 'admin' ? <Badge color="primary" badgeContent={store.allCourses.length}>
                    <Link to='/courses'>COURSES</Link>
               </Badge> : <Link to='/courses'>COURSES</Link>, , <Link to='/aboutus'>ABOUT US</Link>, <Link onClick={handleLogout} to='/'>LOGOUT</Link>
          ].filter(ele => {
               const res = Object.keys(ele).find(e => typeof ele.props.children === 'object' && ele.props.children.props.children === 'STUDENTS')
               if (localStorage.getItem('role') === 'admin') {
                    return ele
               } else if (localStorage.getItem('role') === 'student' && !res) {
                    return ele
               }
          })
          return navBarLinks
     }

     // Navbar links before login
     const initialLink = [
          (!store.isLoggedIn && toggleLoginRegister) ? (
               <CustomizedDialogs>
                    <>
                         <span>REGISTER</span>
                         <RememberMeOutlinedIcon fontSize='large' />
                    </>
                    <AdminRegister handleToggleComponent={handleToggleComponent} />
               </CustomizedDialogs>
          ) : (!store.isLoggedIn && !toggleLoginRegister) &&
          <CustomizedDialogs>
               <>
                    <span>LOG IN</span>
                    <LockOpenSharpIcon fontSize='medium' />
               </>
               <LoginForm handleToggleComponent={handleToggleComponent} />
          </CustomizedDialogs>
     ]

     return (
          <>
               <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} className='navBar'>
                    <Container maxWidth="xl">
                         <Toolbar disableGutters>
                              <Typography
                                   variant="h6"
                                   noWrap
                                   component="div"
                                   sx={{ mr: 2, display: { xs: 'none', md: 'flex', height: '4rem' } }}
                              >
                                   <img className='logo' src={image} alt='logo' />
                              </Typography>
                              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                   <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleOpenNavMenu}
                                        color="inherit"
                                   >
                                        <MenuIcon />
                                   </IconButton>
                                   <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorElNav}
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                        keepMounted
                                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                        open={Boolean(anchorElNav)}
                                        onClose={handleCloseNavMenu}
                                        sx={{ display: { xs: 'block', md: 'none' } }}
                                   >
                                        {
                                             !store.isLoggedIn ? (
                                                  initialLink.map((page, i) => (
                                                       <MenuItem key={i} onClick={handleCloseNavMenu}>
                                                            <Typography textAlign="center">{page}</Typography>
                                                       </MenuItem>
                                                  ))
                                             ) : (
                                                  navBarmenu().map((link, i) => (
                                                       <MenuItem key={i} onClick={handleCloseNavMenu}>
                                                            <Typography>{link}</Typography>
                                                       </MenuItem>
                                                  ))
                                             )
                                        }
                                   </Menu>
                              </Box>
                              <Typography
                                   variant="h6"
                                   noWrap
                                   component="div"
                                   sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                              >
                                   <img className='logo' src={image} alt='logo' />
                              </Typography>
                              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                   {
                                        !store.isLoggedIn ? (
                                             initialLink.map((page, i) => (
                                                  <MenuItem key={i} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }} >
                                                       {page}
                                                  </MenuItem>
                                             ))
                                        ) : (
                                             navBarmenu().map((link, i) => (
                                                  <MenuItem key={i} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                                                       <Typography>{link}</Typography>
                                                  </MenuItem>
                                             ))
                                        )
                                   }
                              </Box>
                              {
                                   store.isLoggedIn && (
                                        <Box sx={{ flexGrow: 0 }}>
                                             <Tooltip title="Open settings">
                                                  <IconButton
                                                       onClick={handleOpenUserMenu}
                                                       sx={{ p: 0 }}
                                                       size="large"
                                                       aria-label="account of current user"
                                                       aria-controls="menu-appbar"
                                                       aria-haspopup="true"
                                                       color="inherit"
                                                  >
                                                       {
                                                            Object.keys(store.userInfo).length > 0 && store.userInfo.role === 'admin' ? (
                                                                 <Badge anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} color="success" overlap="circular" badgeContent=" ">
                                                                      <BackgroundLetterAvatars>
                                                                           {store.userInfo.username}
                                                                      </BackgroundLetterAvatars>
                                                                 </Badge>
                                                            ) : (
                                                                 Object.keys(store.userInfo).length > 0 && store.userInfo.role === 'student') && (
                                                                 <Badge anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} color="success" overlap="circular" badgeContent=" ">
                                                                      <BackgroundLetterAvatars>
                                                                           {store.userInfo.name}
                                                                      </BackgroundLetterAvatars>
                                                                 </Badge>
                                                            )
                                                       }
                                                  </IconButton>
                                             </Tooltip>
                                             <Menu
                                                  sx={{ mt: '45px' }}
                                                  id="menu-appbar"
                                                  anchorEl={anchorElUser}
                                                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                                  keepMounted
                                                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                                  open={Boolean(anchorElUser)}
                                                  onClose={handleCloseUserMenu}
                                             >
                                                  {
                                                       navBarmenu().map((link, i) => (
                                                            <MenuItem key={i} onClick={handleCloseUserMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                                                                 <Typography>{link}</Typography>
                                                            </MenuItem>
                                                       ))
                                                  }
                                             </Menu>
                                        </Box>
                                   )
                              }
                         </Toolbar>
                    </Container>
               </AppBar>
               <Toolbar />
               <Route path='/' exact component={Home} />
               <Route path='/details' component={Details} />
               <Route path='/admin/students' component={AllStudents} />
               <Route path='/courses' exact component={CoursesContainer} />
               <Route path='/aboutus' component={AboutUs} />
               <Route path="/courses/:id" exact component={CourseDetails} />
               <Route path='/courses/:id/lectures' exact component={LecturesContainer} />
               <Route path='/courses/:id/lectures/:id' component={LectureDetails} />
          </>
     );
}

export default withRouter(NavBar);