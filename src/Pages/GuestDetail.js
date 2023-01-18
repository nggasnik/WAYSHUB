// Libraries
import { Link } from 'react-router-dom'
import { API } from '../config/api'
import { useQuery } from 'react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { CirclesWithBar } from 'react-loader-spinner'

// External CSS
import '../css/Detail.css'

// Icons
import View from '../Images/Icons/view.png'
import Profile from '../Images/Icons/profile.png'

// Components
import SideBar from '../components/SideBar'
import SearchBar from '../components/SearchBar'
import Time from '../Images/Icons/time.png'

const GuestDetail = ({ setOpen, open }) => {

  const navigate = useNavigate()

  // Mengambil video berdasarkan id
  const { id } = useParams()
  const {data: getVideoById, isFetching} = useQuery('videoGuestIdCache', async () => {
    const response = await API.get(`/video/${id}`)
    return response.data.data
  })

  // Mengambil semua data video dari setiap channel
  const {data: getAllVideos} = useQuery('getAllVideoGuestIdCache', async () => {
    const response = await API.get(`/videos`)
    return response.data.data
  })

  // HandleClick untuk channel
  const handleClick = () => {
    navigate('/sign-in')
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
    <div className="detail-container">
      <div className="side-navbar-container">
        <SideBar open={open} setOpen={setOpen}/>
      </div>
      <div className='navbar-container'>
        <SearchBar setOpen={setOpen} open={open}/>
      </div>

      <div className='detail-body'>
        <div className='detail-body-wrapper'>
          
          <div className='main-detail-video'>
            <div className='detail-video-head'>
              <video controls muted autoplay loop>
                <source src={getVideoById?.video} type="video/mp4"/>
              </video>
            </div>
            <h2>
              {getVideoById?.title}
            </h2>
            <div className='detail-body-video'>
              <img src={View} alt="view" className='view-detail'/>
              <p>
                {getVideoById?.viewCount}
              </p>
              <img src={Time} alt="view" className='view-detail' style={{width: '18px'}}/>
              <p>
                {getVideoById?.formatTime}
              </p>
            </div>
            <hr style={{backgroundColor: 'white', height: '4px'}}/>
              <div className='profile-in-detail'>
                <Link className='profile-in-detail' to="/sign-in" style={{textDecoration: 'none'}}>
                  <img src={Profile} alt="profile" style={{width: '35px', marginRight: '10px'}}/>
                  <p>
                    {getVideoById?.channel.channelName}
                  </p>
                </Link>
              </div>
            <div className='description-detail'>
              <p>
                {getVideoById?.description}
              </p>
            </div>
          </div>

          <div className='random-video'>
          {
            getAllVideos?.map(video => (
              <div className="home-card-detail" style={{position: 'relative',}}>
              <Link 
              to={`/detail-video/${video?.id}`} 
              style={{
                textDecoration: 'none', color: 'white'
              }}>
                <div className="home-card-head">
                  <img src={video?.thumbnail} alt="videothumbnail" style={{height: '230px', marginBottom: '5px'}}/>
                  <h4>
                    {video?.title}
                  </h4>
                </div>
              </Link>
                <div className="home-card-body">
                  <p
                  onClick={() => handleClick()}
                  style={{
                    cursor: 'pointer'
                  }}
                  >
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
    </div>
  )
}

export default GuestDetail