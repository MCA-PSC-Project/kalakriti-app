import React from 'react';
import Rating from './Rating';
import profilepicsample from "../assets/profilepicsample.jpeg";


function Review ({userName,rating}){
  return (
    <>
     <div style={{marginTop:30 ,marginRight:150}}>
              <hr class="border border-sucess border opacity-50"></hr>
              <p ><img src={profilepicsample} class="rounded-circle" alt="Cinque Terre" width="30" height="30"></img>
              &nbsp;&nbsp; &nbsp;{userName}
              <div style={{marginLeft:40, marginRight:90}}><Rating ratingValue={rating}/>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod nisi at turpis interdum facilisis. Nullam at vestibulum quam. Aliquam et mi faucibus, cursus erat eu, porttitor magna. Nullam lobortis fermentum enim quis mollis. Curabitur sed felis mauris. Duis convallis metus ex, sit amet faucibus mi tempor in. Sed eget auctor ligula, non congue lorem. Quisque venenatis, augue ac egestas sollicitudin, felis augue mollis tortor, ac luctus ante nibh ut justo.
                 Vestibulum congue orci quis metus varius pellentesque.
                  Sed vitae felis vulputate, aliquet lorem id, pharetra leo.
                </p>
              </div>
              </p>
              </div>
    </>
  )
}

export default Review;