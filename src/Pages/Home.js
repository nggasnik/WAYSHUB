// Libraries
import { Link } from "react-router-dom"
import { useQuery } from "react-query"
import { API } from "../config/api"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { CirclesWithBar } from "react-loader-spinner"

// Components
import SideBar from "../components/SideBar"
import SearchBar from "../components/SearchBar"

// Icons
import View from '../Images/Icons/view.png'
import Time from '../Images/Icons/time.png'

// External CSS
import '../css/Home.css'

const minWidth = {
  display: 'flex',
  justifyContent: 'start',
  width: '1100px',
  transition: '0.5s',
  position: 'relative',
  left: '280px'
}

const maxWidth = {
  display: 'flex',
  justifyContent: 'start',
  position: 'relative',
  left: '30px',
  transition: '0.5s',
}

const Home = ({ setOpen, open, subs, setSearch, search }) => {

  // React Hook
  const navigate = useNavigate()

  // Untuk mengambil id channel login
  const [state] = useContext(UserContext)

  // Mengambil semua video dari setiap channel
  const {data: getAllVideos, isFetching} = useQuery('videosCache', async () => {
    const response = await API.get('/videos')
    return response.data.data
  })

  // Kondisi ketika meng-klik channel sendiri dan channel orang lain
  const handleClick = (channelId) => {
    if (state?.user.id === channelId) {
      navigate('/my-channel')
    } else {
      navigate(`/content-creator/${channelId}`)
    }
  }

  // Function untuk meng-update view counter
  const handleViewCounter = async (videoId) => {
    try {
      await API.patch(`/UpdateViews/${videoId}`)
    } catch (err) {
      alert("Error")
      console.log(err)
    }
  }

  if (isFetching) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <CirclesWithBar
        type="Puff"
        color="#FF7A00"
        height={100}
        width={100}
        />
      </div>
    )
  }

  return (
    <div className="home-container">
      <div className="side-navbar-container">
        <SideBar open={open} setOpen={setOpen} subs={subs}/>
      </div>
      <div className='navbar-container'>
        <SearchBar setOpen={setOpen} open={open} setSearch={setSearch}/>
      </div>
      <div className="home-body">
        <div style={open ? maxWidth : minWidth} className="home-body-wrapper">

          {
            getAllVideos?.filter(video => {
              if (search == "") {
                return video
              } else if (video.title.toLowerCase().includes(search?.toLowerCase())) {
                return video
              }
            }).map(video => (
              <div className="home-card" key={video?.id}>
              <Link 
              onClick={() => handleViewCounter(video?.id)}
              to={`/detail-video/${video?.id}`}
              style={{
                textDecoration: 'none', 
                color: 'white'
              }}>
                <div className="home-card-head">
                  <img src={video?.thumbnail} alt="videothumbnail" style={{marginBottom: '10px'}}/>
                  <h4>
                    {`${video?.title.slice(0, 23)}...`}
                  </h4>
                </div>
              </Link>
                <div className="home-card-body">
                  <p
                  onClick={() => handleClick(video?.channel.id)}
                  style={{
                    textDecoration: 'none',
                    cursor: 'pointer',
                    color: '#555555'
                    }}>
                    {video?.channel.channelName}
                  </p>
                  <div className="view-time">
                    <div style={{
                      display: 'flex'
                    }}>
                      <img src={View} alt="view" style={{width: '24px', height: '24px'}}/>
                      <p>{video?.viewCount}</p>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <img src={Time} alt="time" style={{width: '18px', height: '18px'}}/>
                      <p>{video?.formatTime}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }

        </div>
      </div>
    </div>
  )
}

export default Home