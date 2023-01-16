// Libraries
import { API } from '../config/api'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useMutation } from 'react-query'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

// Components
import SideBar from "../components/SideBar"
import SearchBar from "../components/SearchBar"
import Form from 'react-bootstrap/Form'

// External CSS
import '../css/Edit.css'

const widthMin = {
  width: '1000px',
  position: 'relative',
  left: '120px',
}

const widthMax = {
  display: 'flex',
}

const EditChannel = ({ setOpen, open }) => {

  const navigate = useNavigate()

  // Mengambil Id dari state
  const [state] = useContext(UserContext)

  // function untuk meng-handle perubahan dalam form
  const [form, setForm] = useState({
    channelName: "",
    description: "",
    thumbnail: "",
    photo: ""
  })

  const handleChange = (e) => {
    if (e.target.name == "thumbnail") {
      setForm({
        ...form, 
        [e.target.name]: e.target.files[0]
      })
    } else if (e.target.name == "photo") {
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

  // function untuk meng-update channel
  const handleUpdate = useMutation(async (e) => {
    e.preventDefault()
    try {

      const formData = new FormData()

      formData.append("channelName", form.channelName)
      formData.append("description", form.description)
      formData.append("thumbnail", form.thumbnail)
      formData.append("photo", form.photo)

      const response = await API.patch(`/channel/${state?.user.id}`, formData)
      if (response.status == 200) {
        Swal.fire(
          'Change Saved',
          'Update Success',
          'success'
        )
      }
      navigate('/my-channel')
    } catch (err) {
      alert("Update Failed")
      console.log(err)
    }
  })

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
              <h2>Edit Channel</h2>
            </div>
            <Form onSubmit={(e) => handleUpdate.mutate(e)}>
            <Form.Group className="mb-3 edit-form" controlId="formBasicEmail">
              <Form.Control 
              className="form-edit-control-top" 
              type="text" 
              placeholder="Name Channel"
              style={{
                marginRight: '20px'
              }}
              onChange={handleChange}
              name="channelName"
              />
              <Form.Control 
              className="form-edit-control-top edit-file" 
              type="file"
              onChange={handleChange}
              name="photo"
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
                name="thumbnail"
                />
            </Form.Group>
            <button className="save-button" type="submit">Save</button>
            </Form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default EditChannel