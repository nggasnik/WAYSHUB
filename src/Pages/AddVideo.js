// Libraries
import { useMutation } from "react-query"
import { API } from '../config/api'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import { ThreeDots } from "react-loader-spinner"
import Swal from "sweetalert2"

// Components
import SideBar from "../components/SideBar"
import SearchBar from "../components/SearchBar"

// External CSS
import '../css/Edit.css'

const AddVideo = ({ setOpen, open }) => {

  const navigate = useNavigate()

  // Config API
  const [form, setForm] = useState({
    title: "",
    thumbnail: "",
    description: "",
    video: ""
  })

  const handleChange = (e) => {
    if (e.target.name === 'thumbnail') {
      setForm({
        ...form,
        [e.target.name]: e.target.files[0]
      })
    } else if (e.target.name === 'video') {
      setForm({
        ...form,
        [e.target.name]: e.target.files[0]
      })
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })
    }
  }

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      const formData = new FormData()

      formData.append("title", form.title)
      formData.append("thumbnail", form.thumbnail)
      formData.append("description", form.description)
      formData.append("video", form.video)

      if (form.title != "" && form.thumbnail != "" && form.description != "" && form.video != "") {
        await API.post('/video', formData)
        navigate('/my-channel')
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Isi semua data',
        })
      }

    } catch (err) {
      console.log(err.response.data)
      alert("Upload failed")
    }
  })

  // Styling
  const widthMin = {
    width: '1000px',
    position: 'relative',
    left: '120px',
  }
  
  const widthMax = {
    display: 'flex',
  }

  return (
    <div className="edit-container">
      <div className="side-navbar-container">
        <SideBar open={open} setOpen={setOpen}/>
      </div>
      <div className='navbar-container'>
        <SearchBar setOpen={setOpen} open={open}/>
      </div>
      <div className="edit-body">
        <div style={open ? widthMax : widthMin} className="edit-body-wrapper">

          <div className="main-edit-channel">
            <div className="header-edit">
              <h2>Add Video</h2>
            </div>
            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group className="mb-3 edit-form" controlId="formBasicEmail">
              <Form.Control 
              className="form-edit-control-top" 
              type="text" 
              placeholder="Title"
              style={{
                marginRight: '20px'
              }}
              onChange={handleChange}
              name="title"
              />
              <Form.Control 
              className="form-edit-control-top edit-file" 
              type="file"
              onChange={handleChange}
              name="thumbnail"
              />
            </Form.Group>
            <Form.Group style={{zIndex: 'inherit'}} className="mb-3" >
              <Form.Control
                as="textarea"
                className="form-edit-control-top"
                placeholder="Description"
                style={{ height: '250px' }}
                onChange={handleChange}
                name="description"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control 
                className="form-edit-control-top edit-file" 
                type="file"
                onChange={handleChange}
                name="video"
                />
            </Form.Group>
              {
                handleSubmit.isLoading ? (
                  <button 
                    className="save-button" 
                    type="submit" 
                    style={{
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                    disabled>
                    <ThreeDots
                    type="Puff"
                    color="#ffffff"
                    height={30}
                    width={30}
                    />
                  </button>
                  ) : (
                    <button className="save-button" type="submit">Add</button>
                )
              }
            </Form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AddVideo