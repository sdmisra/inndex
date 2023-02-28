import './css/styles.css';
import './images/turing-logo.png'
import fetchData from '/dist/apiCalls'
import testRoom from './data/roomsTestData';
// Promise retrieval:
let customersData, roomsData, bookingsData;
Promise.all([fetchData('customers'), fetchData('rooms'), fetchData('bookings')])
  .then((hotelArray)=> {
    customersData = hotelArray[0];
    roomsData = hotelArray[1];
    bookingsData = hotelArray[2];
    hotelArray.forEach(hotelAspect => console.log(hotelAspect))
    return hotelArray
  })

  console.log('this is the test room object:', testRoom[0])