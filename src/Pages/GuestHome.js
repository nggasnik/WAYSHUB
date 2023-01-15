// Libraries
import { Link } from "react-router-dom"
import { useQuery } from "react-query"
import { API } from "../config/api"

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
  justifyContent: 'space-between',
  position: 'relative',
  left: '50px',
  transition: '0.5s',
}

const GuestHome = ({ setOpen, open }) => {

  // Untuk mengambil semua video dari setiap channel
  const {data: getAllVideos} = useQuery('videosGuestCache', async () => {
    const response = await API.get('/videos')
    return response.data.data
  })

  return (
    <div className="home-container">
      <div className="side-navbar-container">
        <SideBar open={open} setOpen={setOpen}/>
      </div>
      <div className='navbar-container'>
        <SearchBar setOpen={setOpen} open={open}/>
      </div>
      <div className="home-body">
        <div style={open ? maxWidth : minWidth} className="home-body-wrapper">

          {
            getAllVideos?.map(video => (
              <div className="home-card" key={video?.id}>
              <Link to={`/guest-detail/${video?.id}`} style={{textDecoration: 'none', color: 'white'}}>
                <div className="home-card-head">
                  <img src={video?.thumbnail} alt="videothumbnail" style={{marginBottom: '10px'}}/>
                  <h4>
                    {`${video?.title.slice(0, 23)}...`}
                  </h4>
                </div>
              </Link>
                <div className="home-card-body">
                  <Link to={`/sign-in`} style={{textDecoration: 'none', color: '#555555'}}>
                    <p>
                      {video?.channel.channelName}
                    </p>
                  </Link>
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

export default GuestHome