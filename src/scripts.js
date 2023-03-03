import './css/styles.css';
import './images/turing-logo.png'
import fetchData from '/dist/apiCalls'
import Room from './classes/Room'
import Booking from './classes/Booking'
import Customer from './classes/Customer';
import Hotel from './classes/Hotel';
// Promise retrieval:
let hotelData;
Promise.all([fetchData('customers'), fetchData('rooms'), fetchData('bookings')])
  .then((data)=> {
    let apiData = {
      customers: data[0].customers,
      rooms: data[1].rooms,
      bookings: data[2].bookings
    }
    return apiData
  })
  .then(allHotelData => {
    hotelData = new Hotel(allHotelData);
    hotelData.customers = hotelData.customers.map(customer => {
      let thisCust = new Customer(customer)
      thisCust.retrieveMyBookings(allHotelData.bookings, allHotelData.rooms)
      thisCust.calcTotalCost()
      return thisCust
    })
    hotelData.bookings = hotelData.bookings.map(booking=> {
      let thisBooking = new Booking(booking)
      thisBooking.retrieveRoomInfo(allHotelData.rooms);
      return thisBooking;
    })
    hotelData.rooms = hotelData.rooms.map(room => new Room(room));
    console.log('All Hotel Data:', hotelData)
    return hotelData
  })

  // With this promise set up, I should be able to log in as a customer and then use the hotelData global variable in order to look up their login attempt and assign them the user info that is being properly instantiated in this second part of our fetch.

  // Document Selectors //
  const bookRoomInput = document.querySelector('#bookingInput')
  const bookRoomBtn = document.querySelector('#bookingBtn')
  const userNameInput = document.querySelector('#loginName')
  const userPassInput = document.querySelector('#loginPass')
  // Event Listeners // 
bookRoomBtn.addEventListener('click', (event)=> {
  checkThisDate(event)
})
userNameInput.addEventListener('change', () => {
  loginCustomer();
})
  // Event Handlers // 
  function checkThisDate () {
    let reformatClick = bookRoomInput.value.replaceAll('-', '/')
    let bookedRoomNumbers = hotelData.bookings.filter(booking=> booking.date === reformatClick).map(booking => booking.roomNumber)
    // console.log(bookedRoomNumbers)
    let availableRooms = hotelData.rooms.filter(room => !bookedRoomNumbers.includes(room.number))
    console.log(`These rooms are available for ${reformatClick}`,availableRooms)
    // Display available rooms in the top section of the page, where a user is browsing their current options.
  }

  function loginCustomer() {
    let idNum = Number(userNameInput.value.split('customer')[1])
    let testCustomer = hotelData.customers.find(customer => customer.id === idNum)
    console.log(testCustomer)
    // Display customers current and past bookings using testCustomer.bookings
    // Display customers total amount spent using testCustomer.rewardsPoints
  }
  function displayRooms(array, destination) {

  }
  // function bookDate(currentUserId) {

  // }

