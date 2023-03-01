import './css/styles.css';
import './images/turing-logo.png'
import fetchData from '/dist/apiCalls'
import testRoom from './data/roomsTestData';
import Room from './classes/Room'
// Promise retrieval:
let customersData, roomsData, bookingsData;
let testApiPull;
Promise.all([fetchData('customers'), fetchData('rooms'), fetchData('bookings')])
  .then((hotelArray)=> {
    customersData = hotelArray[0].customers;
    roomsData = hotelArray[1].rooms;
    bookingsData = hotelArray[2].bookings;
    hotelArray.forEach(hotelAspect => console.log(hotelAspect))
    testApiPull = new Room(roomsData[0])
    return hotelArray
  })

  console.log('this is the test room object:', testRoom[0])