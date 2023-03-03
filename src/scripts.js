import './css/styles.css';
import './images/turing-logo.png'
import fetchData from '/dist/apiCalls'
import Room from './classes/Room'
import Booking from './classes/Booking'
import Customer from './classes/Customer';
import Hotel from './classes/Hotel';
// Promise retrieval:
let hotelData, availableRooms;
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
  // Current iteration is using loginCustomer() below on ~ln 60

  // Document Selectors //
  const loginView = document.querySelector('#loginWindow')

  const bookRoomLabel = document.querySelector('#bookingLabel')
  const bookRoomInput = document.querySelector('#bookingInput')
  const bookRoomBtn = document.querySelector('#bookingBtn')

  const userNameInput = document.querySelector('#loginName')
  const userPassInput = document.querySelector('#loginPass')
  const userNav = document.querySelector('#userInfo')

  const mainBucket = document.querySelector('#mainBookingsBrowser')
  const savedBucket = document.querySelector('#savedBookingsBrowser')

  const defaultMainView = document.querySelector('#defaultMainView')
  const filteredMainView = document.querySelector('#filteredMainView')
  const defaultSavedView = document.querySelector('#defaultSavedView')
  const filteredSavedView = document.querySelector('#filteredSavedView')

  const rewardsWords = document.querySelector('#rewardsText')
  // Event Listeners // 
bookRoomBtn.addEventListener('click', (event)=> {
  checkThisDate(event)
})
userNameInput.addEventListener('change', () => {
  loginCustomer();
})
// window.addEventListener('load', () => {

// })
  // Event Handlers // 
  function checkThisDate () {
    let reformatClick = bookRoomInput.value.replaceAll('-', '/')
    let bookedRoomNumbers = hotelData.bookings.filter(booking=> booking.date === reformatClick).map(booking => booking.roomNumber)
    availableRooms = hotelData.rooms.filter(room => !bookedRoomNumbers.includes(room.number))
    console.log(`75: These rooms are available for ${reformatClick}`,availableRooms)
    renderRooms(availableRooms, defaultMainView);

  }

  function loginCustomer() {
    rewardsWords.innerText = ''
    let idNum = Number(userNameInput.value.split('customer')[1])
    let thisCustomer = hotelData.customers.find(customer => customer.id === idNum)
    console.log('84', thisCustomer)
    rewardsWords.innerText = `Welcome back ${thisCustomer.name.split(' ')[0]}! You have ${thisCustomer.rewardsPoints} rewards points! Thank you for your continued loyalty.`
    let myRooms = thisCustomer.bookings.map(booking=>booking.roomDetails);
    renderRooms(myRooms, defaultSavedView)
    hide([loginView])
    show([mainBucket, savedBucket, bookRoomLabel, userNav])
  }
  function renderRooms(array, element) {
    element.innerHTML = ""
    array.forEach(item => {
      element.innerHTML += `
      <div class="room-card">
        <span class="room-card-detail">Room ${item.number}</span>
        <span class="room-card-detail">🛌${item.bedSize}</span>
        <span class="room-card-detail">⛲️${item.bidet}</span>
        <span class="room-card-detail">💰${item.costPerNight}</span>
        <span class="room-card-detail">Beds: ${item.numBeds}</span>
        <span class="room-card-detail">Style: ${item.roomType}</span>
      </div>
      `
    })
  }
  
  // function filterRooms(roomsArray, filterValue) {
  //   let filtered = roomsArray.filter(room => room.roomType === filterValue)
  //   renderRooms(filtered, mainBucket)
  // }
  
  // function renderSmallView(array, element){
    // This should be a reusable function that enables us to render the saved rooms that a user has upcoming or from past bookings. This should also be usable to filter in a similar way to renderMainView. This function and main view might end up being one larger function with a check for where the event was started.
  // }

  // function bookDate(currentUserId) {
    // This is intended to be the function that actually triggers the fetch / POST request that adds a new booking to our API endpoint.
  // }

  function show(array){
    const showElements = array.map(element => element.classList.remove('hidden'));
    return showElements;
  }
    
  function hide(array) {
    const hideElements = array.map(element => element.classList.add('hidden'));
    return hideElements;
  }