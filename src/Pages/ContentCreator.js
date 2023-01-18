// Libraries
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { API } from "../config/api"
import { useMutation, useQuery } from "react-query"
import { CirclesWithBar } from "react-loader-spinner"

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
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

const ContentCreator = ({ setOpen, open, subs, refetch }) => {
  // Untuk mengambil id user yang login
  const [state] = useContext(UserContext)

  // Mengambil database channel berdasarkan id
  const { id } = useParams()
  const {data: getChannelById, refetch: channelRefetch, isFetching} = useQuery('channelContentByIdCache', async () => {
    const response = await API.get(`/channel/${id}`)
    return response.data.data
  })
  
  // Mengambil data subscription user yang login
  const {data: channelLogin, refetch: loginRefetch} = useQuery('channelLoginCache', async () => {
    const response = await API.get(`/channel/${state?.user.id}`)
    return response.data.data.subscription
  })

  let channel = []

  channelLogin?.filter(subs => {
    if (subs.other_id == id) {
      channel.push(subs)
    }
  })

  const [ channelId ] = channel

  // Post handle untuk mengirim data ke database
  const handleSubs = useMutation(async (e) => {
    try {
      e.preventDefault()

      const response = await API.post(`/subscribe/${id}`)
      const plusSub = await API.patch(`/plusSubs/${id}`)
      if (response.status == 200 && plusSub.status == 200) {
        channelRefetch()
        loginRefetch()
        refetch()
      }
    } catch (err) {
      alert("FAILED")
      console.log(err.data)
    }
  })

  const handleUnsub = useMutation(async (e) => {
    try {
      e.preventDefault()


      const response = await API.delete(`/subscribe`)
      const plusSub = await API.patch(`/minusSubs/${id}`)
      if (response.status == 200 && plusSub.status == 200) {
        channelRefetch()
        loginRefetch()
        refetch()
      }
    } catch (err) {
      alert("FAILED")
      console.log(err)
    }
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
        <SideBar open={open} setOpen={setOpen} subs={subs}/>
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
                        getChannelById?.photo ? (
                          <img src={getChannelById?.photo} alt="profile" style={{
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
                        {getChannelById?.channelName}
                      </p>
                      <p>
                        {getChannelById?.subscriber} Subscriber
                      </p>
                    </div>
                  </div>
                  <div className="channel-right-side">
                    <Link >
                      {
                        channelId?.other_id ? (
                          <button 
                          style={{
                            backgroundColor: 'grey',
                            padding: '10px 20px',
                            fontSize: '18px',
                            fontWeight: 600,
                            color: 'white',
                            borderRadius: '5px',
                            border: '1px solid grey',
                          }}
                          onClick={(e) => handleUnsub.mutate(e)}
                          >
                            unsubscribe
                          </button>
                        ) : (
                          <button onClick={(e) => handleSubs.mutate(e)}>
                            Subscribe
                          </button>
                        )
                      }
                    </Link>
                  </div>
                </div>
                <hr style={{
                  margin: '10px 0px',
                  backgroundColor: 'white',
                  height: '4px'
                }}/>
                <div className="my-channel-videos">
                {
                  getChannelById?.video.map(video => (
                    <div className="home-card" key={video?.id}>
                    <Link to={`/detail-video/${video?.id}`} style={{textDecoration: 'none', color: 'white'}}>
                      <div className="home-card-head">
                        <img src={video?.thumbnail} alt="videothumbnail" style={{marginBottom: '10px'}}/>
                        <h4>
                          {video?.title}
                        </h4>
                      </div>
                    </Link>
                      <div className="home-card-body">
                        <p>
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

        </div>
      </div>

    </div>
  )
}

export default ContentCreator