// Libraries
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { API } from '../config/api'
import { useMutation } from 'react-query'

// CSS External
import '../css/SignUp.css'
import '../css/SignIn.css'

// Icons
import WaysHub from '../Images/WaysHub.png'

// Bootstrap CSS
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'

// Object Style
const formCont = {
  padding: '20px',
  backgroundColor: '#161616',
  width: '416px',
  borderRadius: '5px'
}

const h2 = {
  color: 'white',
  marginBottom: '25px',
  fontWeight: 700
}

const SignUp = () => {

  const navigate = useNavigate()
  const [state, dispatch] = useContext(UserContext)
  const [form, setForm] = useState({
    email: "",
    password: ""
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
        header: {
          'Content-Type': 'application/json'
        }
      }

      const body = JSON.stringify(form)
      const response = await API.post('/login', body, config)

      // Check
      if (response?.status === 200) {
        dispatch({
          type: 'LOGIN_SUCCES',
          payload: response.data.data
        })
      }

      if (response.data.data.token) {
        navigate('/home')
      } else if (!response.data.data.token) {
        alert('Login Failed')
      }

    } catch (err) {
      console.log(err)
    }
  })

  return (
      <div className='container'>

        <div className='wrapper'>
          <div className='left-side'>

            <div>
              <img src={WaysHub} alt="WaysHub" />
              <div className='text-1'>
                <p>&</p>
                <p>Chill</p>
                <p>Chill</p>
              </div>
              <div className='description'>
                Join now, share your creations with another people and enjoy other creations
              </div>
              <Link to="/sign-Up" className="sign-in" >Sign Up</Link>
            </div>

          </div>

          <div className='right-side'>
            <div style={formCont} className='formCont'>
              <h2 style={h2}>Sign In</h2>
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
                <button className='button' type='submit'>Sign In</button>
              </Form>
            </div>
          </div>
        </div>

      </div>
  )
}

export default SignUp