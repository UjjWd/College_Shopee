import React from 'react';
import {Link} from 'react-router-dom'
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter className='text-center text-white' style={{ backgroundColor: '#000000c4' }}>
      <MDBContainer className='pt-4'>
        <section className='mb-4'>
          <h5>About Campus Bazaar</h5>
          <p>Campus Bazaar website has emerged as indispensable platform within college community, offering students a convenient and cost-effective way to buy, sell, and exchange various items and services.  Students benefit from the affordability and accessibility of essential items such as textbooks, electronics, and furniture, while also enjoying the opportunity to earn extra income by selling unused items.</p>
        </section>
      </MDBContainer>

      <div className='text-center text-dark p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',color:'white' }}>
        
        <p style={{color:'white'}}> &#9400; 2024 Copyright: <Link to='/' >Campus Bazaar</Link></p>
      </div>
    </MDBFooter>
  );
}