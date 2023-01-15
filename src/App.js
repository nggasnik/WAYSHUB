// Libararies
import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { API } from "./config/api"
import { UserContext } from "./context/UserContext"
import { setAuthToken } from "./config/api"
import { useContext } from "react"

// Components
import PrivateRoute from "./components/PrivateRoutes"

// Pages
import SignUp from "./Pages/SignUp"
import SignIn from "./Pages/SignIn"
import Home from "./Pages/Home"
import DetailPage from "./Pages/DetailPage"
import EditChannel from "./Pages/EditChannel"
import AddVideo from "./Pages/AddVideo"
import MyChannel from "./Pages/MyChannel"
import Description from "./Pages/Description"
import ContentCreator from "./Pages/ContentCreator"
import GuestHome from "./Pages/GuestHome"
import GuestDetail from "./Pages/GuestDetail"

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  // SideBar State
  const [open, setOpen] = useState(false)

  const navigate = useNavigate()

  const [state, dispatch] = useContext(UserContext)
  
  useEffect(() => {

    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }

    if (state.isLogin === false) {
      navigate('/guest-home')
    } else if (state.user.token) {
      navigate('/home')
    }

  }, [state])
  
  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth')

      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR'
        })
      }

      let payload = response.data.data
      payload.token = localStorage.token
      
      dispatch({
        type: 'LOGIN_SUCCES',
        payload,
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if(localStorage.token) {
      checkUser()
    }
  }, [])

  return (
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/guest-home/" element={
            <GuestHome setOpen={setOpen} open={open}/>
          }/>
          <Route path="/guest-detail/:id" element={
            <GuestDetail setOpen={setOpen} open={open}/>
          } />

          <Route element={<PrivateRoute />}>
            <Route path="/home" element={
              <Home setOpen={setOpen} open={open}/>
            }/>
            <Route path="/detail-video/:id" element={
              <DetailPage setOpen={setOpen} open={open}/>
            }/>
            <Route path="/edit-channel" element={
              <EditChannel setOpen={setOpen} open={open}/>
            }/>
            <Route path="/addvideo" element={
              <AddVideo setOpen={setOpen} open={open}/>
            }/>
            <Route path="/my-channel" element={
              <MyChannel setOpen={setOpen} open={open}/>
            } />
            <Route path="/my-channel/description" element={
              <Description setOpen={setOpen} open={open}/>
            } />
            <Route path="/content-creator/:id" element={
              <ContentCreator setOpen={setOpen} open={open}/>
            } />
          </Route>
        </Routes>
  )
}

export default App
