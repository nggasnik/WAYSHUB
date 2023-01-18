// Libraries
import { Link } from "react-router-dom"
import { useQuery } from "react-query"
import { API } from '../config/api'
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { CirclesWithBar } from "react-loader-spinner"

// Components
import SideBar from "../components/SideBar"
import SearchBar from "../components/SearchBar"

// External CSS
import '../css/MyChannel.css'

// Images
import Banner from '../Images/banner.webp'
import Profile from '../Images/Icons/profile-100px.png'

const Description = ({ setOpen, open }) => {

  const [state] = useContext(UserContext)
  const {data: getUserChannel, isFetching} = useQuery('channelDescCache', async () => {
    const response = await API.get(`/channel/${state.user.id}`)
    return response.data.data
  })

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
                      getUserChannel?.photo ? (
                        <img src={getUserChannel?.photo} alt="profile" style={{
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
                        {getUserChannel?.channelName}
                      </p>
                      <p>
                        {getUserChannel?.subscriber} Subscriber
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
                    <p>Video</p>
                  </Link>
                  <Link to="/my-channel/description" style={{textDecoration: 'none'}}>
                    <p style={{color: '#FF7A00'}}>Description Channel</p>
                  </Link>
                </div>
                <hr style={{
                  margin: 0,
                  backgroundColor: 'white',
                  height: '4px'
                }}/>
                <div className="my-channel-description">
                  <p style={{
                    fontSize: '17px',
                    color: 'white',
                    fontWeight: '400'
                  }}>
                    {getUserChannel?.description}
                  </p>
                </div>
                
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Description