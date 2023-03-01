import './css/styles.css';
import './images/turing-logo.png'
import fetchData from '/dist/apiCalls'
import testRoom from './data/roomsTestData';
import Room from './classes/Room'
import Booking from './classes/Booking'
// Promise retrieval:
let customersData, roomsData, bookingsData;
let testRoomSummon, testBookingSummon;
Promise.all([fetchData('customers'), fetchData('rooms'), fetchData('bookings')])
  .then((hotelArray)=> {
    customersData = hotelArray[0].customers;
    roomsData = hotelArray[1].rooms;
    bookingsData = hotelArray[2].bookings;
    hotelArray.forEach(hotelAspect => console.log(hotelAspect))
    testRoomSummon = new Room(roomsData[0])
    testBookingSummon = new Booking(bookingsData[0])
    console.log('api room:', testRoomSummon);
    console.log('api booking:', testBookingSummon);
    return hotelArray
  })