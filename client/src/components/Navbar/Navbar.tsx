
import './Navbar.css'
import { Button } from '@mui/material';

const Navbar = () => {
  
  return (
    <div className="navbar">
      <Button variant="contained" color="secondary" className='button'>
          בקשת מידע
      </Button>
      <Button variant="contained" color="secondary" className='button'>
        עריכת אירוע
      </Button>
    </div>
  )
}

export default Navbar



