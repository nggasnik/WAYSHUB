// Libraries
import { Link } from 'react-router-dom'
import { API } from '../config/api'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

// CSS External
import '../css/SignUp.css'

// Icons
import WaysHub from '../Images/WaysHub.png'

// Bootstrap CSS
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import 'bootstrap/dist/css/bootstrap.min.css'

const SignUp = () => {

  const navigation = useNavigate()

  const [form, setForm] = useState({
    email: "",
    password: "",
    channelName: "",
    description: ""
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = useMutation(async (e) => {
    e.preventDefault()
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const body = JSON.stringify(form)
      await API.post('/register', body, config)
      navigation('/sign-in')
    } catch (err) {
      alert('Register Failed')
      console.log(err)
    }
  })

  return (
      <div className='container'>

        <div className='wrapper'>
          <div className='left-side'>

            <div className='leftSide-container'>
              <img src={WaysHub} alt="WaysHub" />
              <div className='text-1'>
                <p>&</p>
                <p>Chill</p>
                <p>Chill</p>
              </div>
              <div className='description'>
                Join now, share your creations with another people and enjoy other creations
              </div>
              <Link to="/sign-in" className="sign-in" >Sign In</Link>
            </div>

          </div>

          <div className='right-side'>
            <div className='form-cont'>
              <h2>Sign Up</h2>
              <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                <Form.Group className='mb-4'>
                  <Form.Control 
                  className='control' 
                  type='email' 
                  placeholder="Email"
                  onChange={handleChange}
                  name="email"
                  />
                </Form.Group>
                <Form.Group className='mb-4'>
                  <Form.Control 
                  className='control' 
                  type='password' 
                  placeholder="Password"
                  onChange={handleChange}
                  name="password"
                  />
                </Form.Group>
                <Form.Group className='mb-4'>
                <Form.Control 
                className='control' 
                type='text' 
                placeholder="Name Channel"
                onChange={handleChange}
                name="channelName"
                />
                </Form.Group>

                <FloatingLabel controlId="floatingTextarea2" label="Description Channel">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: '180px' }}
                  className='control'
                  onChange={handleChange}
                  name="description"
                />
                </FloatingLabel>
                <button className='button' type='submit'>Sign Up</button>
              </Form>
            </div>
          </div>
        </div>

      </div>
  )
}

export default SignUp