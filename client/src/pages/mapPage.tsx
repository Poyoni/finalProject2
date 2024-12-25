import React from 'react'
import MapComponent from '../components/Map/MapComponent'
import FilterSelect from '../components/FilterSelect/FilterSelect'
import Navbar from '../components/Navbar/Navbar'
import EventForm from '../components/EventForm/EvevtForm'
import './mapPage.css'
import { ThemeProvider } from '@emotion/react'
import  theme  from '../../src/theme'
import GraphComponent from '../components/Gtaph/GraphComponent'


const MapPage: React.FC = () => {

  return (
    <ThemeProvider theme={theme}>
      <div className='mapPage'>
        <div className='navbar'>
          <Navbar />
        </div>
        <div className='center'>
        <div className='mapAndGraph'>
          <div className='map'>
          <MapComponent />
          </div>
          <div className='graph'>
            <GraphComponent />
          </div>
        </div>
        {/* <div className='eventDetails'>

          // <EventForm />
          </div>  */}
          <div className='filterSelect'>
          <FilterSelect />
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default MapPage;


