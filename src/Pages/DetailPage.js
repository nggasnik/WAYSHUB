// Libraries
import { Link } from 'react-router-dom'
import { API } from '../config/api'
import { useMutation, useQuery } from 'react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { Form, FloatingLabel } from 'react-bootstrap'
import Swal from 'sweetalert2'

// External CSS
import '../css/Detail.css'

// Icons
import View from '../Images/Icons/view.png'
import Profile from '../Images/Icons/profile.png'

// Components
import SideBar from '../components/SideBar'
import SearchBar from '../components/SearchBar'
import Time from '../Images/Icons/time.png'

const DetailPage = ({ setOpen, open }) => {

  const navigate = useNavigate()
  const { id } = useParams()

  // Mengambil data komentar
  const {data: getAllComments, refetch: refetchComment} = useQuery('getAllComments', async () => {
    const response = await API.get(`/comments`)
    return response.data.data
  })

  let allComments = []
  getAllComments?.filter(com => {
    if (com?.video_id == id) {
      allComments.push(com)
    }
  })

  // Mengambil id channel yang login
  const [state] = useContext(UserContext)

  // Mengambil data login
  const {data: getLoginChannel} = useQuery('getLoginChannelIdCache', async () => {
    const response = await API.get(`/channel/${state?.user.id}`)
    return response.data.data
  })

  // Fetch Videos By Id
  const {data: getVideoById} = useQuery('detailVideoIdCache', async () => {
    const response = await API.get(`/video/${id}`)
    return response.data.data
  })

  // Mengambil semua video
  const {data: getAllVideos} = useQuery('getAllVideoIdCache', async () => {
    const response = await API.get(`/videos`)
    return response.data.data
  })

  // Kondisi saat meng-klik channel
  const handleClick = (channelId) => {
    if (state?.user.id === channelId) {
      navigate('/my-channel')
    } else {
      navigate(`/content-creator/${channelId}`)
    }
  }

  // Handle komentar
  const [comment, setComment] = useState({
    comment: "",
  })

  const handleChange = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = useMutation(async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("comment", comment.comment)
      const response = await API.post(`/comment/${getVideoById?.id}`, formData)
      if (response.status == 200) {
        Swal.fire(
          'Comment Added',
          'You comment can be seen by anyone else',
          'success'
        )
      }
      if (response.status == 200) {
        refetchComment()
      }
    } catch (err) {
      console.log(err)
      alert("Comment Failed")
    }
  })

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
                <div 
                onClick={() => handleClick(getVideoById?.channel.id)} 
                className='profile-in-detail' style={{
                  textDecoration: 'none',
                  cursor: 'pointer'
                }}>
                  {
                    getVideoById?.channel.photo ? (
                      <img 
                      src={getVideoById?.channel.photo}
                      alt="profile" 
                      style={{
                        width: '35px',
                        height: '35px', 
                        marginRight: '10px'
                      }}/>
                    ) : (
                      <img 
                      src={Profile} 
                      alt="profile" 
                      style={{
                        width: '35px',
                        height: '35px', 
                        marginRight: '10px'
                      }}/>
                    )
                  }
                  <p>
                    {getVideoById?.channel.channelName}
                  </p>
                </div>
              </div>
            <div className='description-detail'>
              <p>
                {getVideoById?.description}
              </p>
            </div>
            <hr style={{backgroundColor: 'white', height: '4px'}}/>
            <div className='comment-section'>
              <div className='comment-profile'>
                <div className='profile-section'>
                {
                    getLoginChannel?.photo ? (
                      <img
                      src={getLoginChannel?.photo}
                      alt="profile" 
                      style={{
                        width: '35px',
                        height: '35px', 
                        marginRight: '10px'
                      }}/>
                    ) : (
                      <img 
                      src={Profile} 
                      alt="profile" 
                      style={{
                        width: '35px',
                        height: '35px', 
                        marginRight: '10px'
                      }}/>
                    )
                  }
                  <p>
                    {getLoginChannel?.channelName}
                  </p>
                </div>
                <div>
                  <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                    <FloatingLabel
                    controlId="floatingTextarea2" 
                    label="Description Channel">
                      <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '100px' }}
                        className='comment-control'
                        onChange={handleChange}
                        name="comment"
                      />
                    </FloatingLabel>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'end'
                    }}>
                      <button className='send-button' type='submit'>Send</button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
            <hr style={{backgroundColor: 'white', height: '4px'}}/>
            <div className='comments-container'>

            {
              allComments?.map(comment => (
                <div className='comment-prof-container' style={{
                  marginBottom: '40px'
                }}>
                  <div className='profile-commented'>
                  {
                    comment?.channel.photo ? (
                      <img
                      src={comment?.channel.photo}
                      alt="profile" 
                      style={{
                        width: '35px',
                        height: '35px', 
                        marginRight: '10px'
                      }}/>
                    ) : (
                      <img 
                      src={Profile} 
                      alt="profile" 
                      style={{
                        width: '35px',
                        height: '35px', 
                        marginRight: '10px'
                      }}/>
                    )
                  }
                    <p>
                      {comment?.channel.channelName}
                    </p>
                  </div>
                  <div className='comments-value'>
                    <p>
                      {comment?.comment}
                    </p>
                  </div>
                </div>
              ))
            }

            </div>
          </div>

          <div className='random-video'>
          {
            getAllVideos?.map(video => (
              <div className="home-card-detail" style={{position: 'relative',}}>
              <Link
              to={`/detail-video/${video?.id}`}
              style={{
                textDecoration: 'none', 
                color: 'white'
              }}
              >
                <div className="home-card-head">
                  <img src={video?.thumbnail} alt="videothumbnail" style={{height: '230px', marginBottom: '5px'}}/>
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
  )
}

export default DetailPage