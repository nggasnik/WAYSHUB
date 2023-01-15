// Libraries
import { Link } from "react-router-dom"
import { useQuery } from "react-query"
import { API } from '../config/api'
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

// Components
import SideBar from "../components/SideBar"
import SearchBar from "../components/SearchBar"

// External CSS
import '../css/MyChannel.css'

// Images
import Banner from '../Images/banner.webp'
import Profile from '../Images/Icons/profile-100px.png'
import View from '../Images/Icons/view.png'
import Time from '../Images/Icons/time.png'

const MyChannel = ({ setOpen, open }) => {

  // Get Channel By Id
  const [state] = useContext(UserContext)
  const {data: getChannel } = useQuery('channelCache', async () => {
    const response = await API.get(`/channel/${state.user.id}`)
    return response.data.data
  })
  
  // find Comments
  const {data: getComments} = useQuery('commentCache', async () => {
    const response = await API.get(`/comments`)
    return response.data.data
  })

  return (
    <div className="my-channel-container">
      <div className="side-navbar-container">
        <SideBar open={open} setOpen={setOpen}/>
      </div>
      <div className='navbar-container'>
        <SearchBar setOpen={setOpen} open={open}/>
      </div>

      <div className="my-channel-body">
        <div className="my-channel-wrapper">
          
          <div className="my-channel-main">
            <div className="my-channel-banner">
              <img src={Banner} alt="banner" />
            </div>
            <div className="my-channel-body">
              <div className="my-channel-body-wrapper">
                
                <div className="my-channel-body-header">
                  <div className="channel-left-side">
                    {
                      getChannel?.photo ? (
                        <img src={getChannel?.photo} alt="profile" style={{
                          width: '100px',
                          height: '100px'
                        }}/>
                      ) : (
                        <img src={Profile} alt="profile" style={{
                          width: '100px',
                          height: '100px'
                        }}/>
                      )
                    }
                    <div className="channel-left-text">
                      <p>
                        {getChannel?.channelName}
                      </p>
                      <p>
                        {getChannel?.subscriber} Subscriber
                      </p>
                    </div>
                  </div>
                  <div className="channel-right-side">
                    <Link to="/edit-channel">
                      <button>Edit Channel</button>
                    </Link>
                  </div>
                </div>
                <div className="my-channel-body-body">
                  <Link to="/my-channel" style={{textDecoration: 'none'}}>
                    <p style={{color: '#FF7A00'}}>Video</p>
                  </Link>
                  <Link to="/my-channel/description" style={{textDecoration: 'none'}}>
                    <p>Description Channel</p>
                  </Link>
                </div>
                <hr style={{
                  margin: 0,
                  backgroundColor: 'white',
                  height: '4px'
                }}/>
                <div className="my-channel-videos">

                {
                  getChannel?.video.map(video => (
                    <div className="home-card" key={video?.id}>
                    <Link to={`/detail-video/${video?.id}`} style={{textDecoration: 'none', color: 'white'}}>
                      <div className="home-card-head">
                        <img src={video?.thumbnail} alt="videothumbnail" style={{marginBottom: '10px'}}/>
                        <h4>
                          {`${video?.title.slice(0, 23)}...`}
                        </h4>
                      </div>
                    </Link>
                      <div className="home-card-body">
                        <p>
                          {getChannel?.channelName}
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

        </div>
      </div>

    </div>
  )
}

export default MyChannel