import Dropdown from 'react-bootstrap/Dropdown'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import Swal from 'sweetalert2'
import '../css/DropDown.css'

// Icons
import Polygon from '../Images/DropDown/Polygon.png'
import Profile from '../Images/DropDown/ProfileDropD.png'
import Logout from '../Images/DropDown/Logout.png'
import SignIn from '../Images/DropDown/SignIn.png'
import SignUp from '../Images/DropDown/SignUp.png'

const dropDown = {
  width: "200px",
  padding: "20px",
  marginTop: "25px",
  backgroundColor: '#141414',
  borderRadius: '10px'
}

const drop = {
  background: "transparent",
  border: "0px"
}

const fonts = {
  fontSize: "18px",
  fontWeight: "400",
  margin: "0",
  display: "flex",
  position: "relative",
  top: "2px"
}

const img = {
  width: "30px",
  height: "30px",
  marginRight: "10px"
}

const polygon = {
  width: '45px',
  height: '40px',
  position: "absolute",
  bottom: "120px",
  left: "140px"
}



function DropDownAll() {

  const [state, dispatch] = useContext(UserContext)
  const onClick = async () => {
    Swal.fire({
      title: 'Do you really want to logout?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token")
        dispatch({
          type: 'LOGOUT'
        })
      }
    })
  }
  
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="secondary" style={drop}>
          <img src={Profile} alt="profile" />
        </Dropdown.Toggle>

        <Dropdown.Menu style={dropDown}>
            <img style={polygon} src={Polygon} alt="img"/>
            {
              state.isLogin ? (
                <>
                  <Dropdown.Item className='dropItem1'>
                    <Link className='dropItem1' to="/my-channel">
                      <img style={img} src={Profile} alt="user" />
                      <p style={fonts}>My Channel</p>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item className='dropItem2'>
                    <Link className='dropItem2' onClick={onClick}>
                      <img style={img} src={Logout} alt="user" />
                      <p style={fonts}>Logout</p>
                    </Link>
                  </Dropdown.Item>
                </>
              ) : (
                <>
                  <Dropdown.Item className='dropItem1'>
                    <Link className='dropItem1' to="/sign-in">
                      <img style={img} src={SignIn} alt="user" />
                      <p style={fonts}>Sign In</p>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item className='dropItem2'>
                    <Link className='dropItem2' to="/sign-up">
                      <img style={img} src={SignUp} alt="user" />
                      <p style={fonts}>Sign Up</p>
                    </Link>
                  </Dropdown.Item>
                </>
              )
            }
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default DropDownAll