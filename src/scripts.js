import './css/styles.css';
import './images/turing-logo.png'
import fetchData from '/dist/apiCalls'
import testRoom from './data/roomsTestData';
import Room from './classes/Room'
import Booking from './classes/Booking'
import Customer from './classes/Customer';
import Hotel from './classes/Hotel';
// Promise retrieval:
let customersData, roomsData, bookingsData, hotelData;
let testRoomSummon, testBookingSummon, testFaustino;
Promise.all([fetchData('customers'), fetchData('rooms'), fetchData('bookings')])
  .then((data)=> {
    let apiData = {
      customers: data[0].customers,
      rooms: data[1].rooms,
      bookings: data[2].bookings
    }
    testFaustino = new Customer(apiData.customers[8])
    testFaustino.retrieveMyBookings(apiData.bookings, apiData.rooms);
    testFaustino.calcTotalCost();
    console.log(testFaustino);
    return apiData
  })
  .then(allHotelData => {
    hotelData = new Hotel(allHotelData);
    hotelData.customers = hotelData.customers.map(customer => {
      let thisCust = new Customer(customer)
      thisCust.retrieveMyBookings(allHotelData.bookings, allHotelData.rooms)
      thisCust.calcTotalCost()
      return thisCust
      // console.log(`'Welcome, ${thisCust.name}'`, thisCust)
    })
    // hotelData.bookings.forEach(booking => booking.retrieveRoomInfo(allHotelData.rooms))
    console.log(hotelData)
  })