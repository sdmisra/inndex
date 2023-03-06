import './css/styles.css';
import './images/turing-logo.png'
import fetchData from '/dist/apiCalls'
import Room from './classes/Room'
import Booking from './classes/Booking'
import Customer from './classes/Customer';
import Hotel from './classes/Hotel';
// Promise retrieval:
let hotelData, availableRooms, reformatDate, thisCustomer, currentBooking, saveNumber, saveId, bookedRoomNumbers;

function refreshData () {
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
    hotelData.retrieveHotelInfo(allHotelData);
    console.log(hotelData);
    return hotelData
  })
}
refreshData();

  // Document Selectors //
  const loginView = document.querySelector('#loginWindow')

  const bookRoomLabel = document.querySelector('#bookingLabel')
  const bookRoomInput = document.querySelector('#bookingInput')
  const roomTypeInput = document.querySelector('#roomTypeInput')
  const bookRoomBtn = document.querySelector('#bookingBtn')
  const radioBtns = document.querySelectorAll('.radio-room-button')

  const userNameInput = document.querySelector('#loginName')
  const userPassInput = document.querySelector('#loginPass')
  const userNav = document.querySelector('#userInfo')
  const userToggleBookings = document.querySelector('#userBookingsBtn')
  const userLogOut = document.querySelector('#userLogOutBtn')
  const userLogIn = document.querySelector('#userLogInBtn')

  const mainBucket = document.querySelector('#mainBookingsBrowser')
  const savedBucket = document.querySelector('#savedBookingsBrowser')
  const fullPageView = document.querySelector('#full-page-view')
  const defaultMainView = document.querySelector('#defaultMainView')
  const defaultSavedView = document.querySelector('#defaultSavedView')
  const filteredSavedView = document.querySelector('#filteredSavedView')

  const rewardsWords = document.querySelector('#rewardsText')
  // Event Listeners // 

window.addEventListener('load', () => {
    toggleElements([fullPageView])
    })
bookRoomBtn.addEventListener('click', (event)=> {
  let roomFilter = undefined;
  for (let radioButton of radioBtns) {
    const checkedButton = radioButton.checked;
    checkedButton ? roomFilter = radioButton.id : null
  }
  checkThisDate(roomFilter)
})
userNameInput.addEventListener('keypress', (event) => {
  if (event.keyCode == 13) {
  renderCustomer();
  toggleElements([loginView])
  toggleElements([fullPageView])
  }
})
mainBucket.addEventListener('click', (event) => {
  bookRoom(event, hotelData);
})
userToggleBookings.addEventListener('click', () => {
  toggleElements([savedBucket])
})

userLogOut.addEventListener('click', () => {
  thisCustomer = undefined;
  toggleElements([loginView])
  toggleElements([fullPageView])
})
userLogIn.addEventListener('click', ()=> {
  renderCustomer();
  toggleElements([loginView])
  toggleElements([fullPageView])
})
  // Event Handlers // 
  function checkThisDate (filter) {
    reformatDate = bookRoomInput.value.replaceAll('-', '/')
    // 
    bookedRoomNumbers = hotelData.bookings.filter(booking=> booking.date === reformatDate).map(booking => booking.roomNumber)
    if (filter) {
      availableRooms = hotelData.rooms.filter(room => !bookedRoomNumbers.includes(room.number) && room.roomType == filter)
    }
    else {
      availableRooms = hotelData.rooms.filter(room => !bookedRoomNumbers.includes(room.number))
    }
    if (!availableRooms.length) {
      alert('There are no available rooms for that date and room type! Please choose a different room type or date to keep browsing.')
    }
    renderRooms(availableRooms, defaultMainView);
  }

  function renderCustomer() {
    rewardsWords.innerText = ''
    let idNum = Number(userNameInput.value.split('customer')[1])
    thisCustomer = hotelData.customers.find(customer => customer.id === idNum)
    rewardsWords.innerText = `Welcome back ${thisCustomer.name.split(' ')[0]}! You have ${thisCustomer.rewardsPoints} rewards points! Thank you for your continued loyalty.`
    let customerRooms = thisCustomer.retrieveMyRooms();
    renderRooms(customerRooms, defaultSavedView)
    toggleElements([bookRoomLabel, userNav])

  }
  function renderRooms(array, element) {
    element.innerHTML = ""
    array.forEach(item => {
      element.innerHTML += `
      <div class="room-card" id ="${item.number}" aria-role="button">
        <span class="room-card-detail" id ="${item.number}">Room #${item.number}</span>
        <span class="room-card-detail" id ="${item.number}">🛌${item.bedSize}</span>
        <span class="room-card-detail" id ="${item.number}">⛲️${item.bidet}</span>
        <span class="room-card-detail" id ="${item.number}">💰${item.costPerNight}</span>
        <span class="room-card-detail" id ="${item.number}">Beds: ${item.numBeds}</span>
        <span class="room-card-detail" id ="${item.number}">Style: ${item.roomType}</span>
      </div>
      `
    })
  }
  function bookRoom(click) {
    saveNumber = click.target.id;
    saveId = thisCustomer.id;
    console.log('clicked:', saveNumber)
    currentBooking = {"userID": `${saveId}`, "date": `${reformatDate}`, "roomNumber": `${saveNumber}`}
    postRoomBooking(currentBooking);
    checkThisDate();
    renderCustomer();
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

  // function show(array){
  //   const showElements = array.map(element => element.classList.remove('hidden'));
  //   return showElements;
  // }
    
  // function hide(array) {
  //   const hideElements = array.map(element => element.classList.add('hidden'));
  //   return hideElements;
  // }

  function toggleElements(array) {
    let toggleElements = array.map(element => element.classList.toggle('hidden'))
    return toggleElements;
  }

  function postRoomBooking(bookingObject) {
    bookingObject['roomNumber'] = parseInt(bookingObject.roomNumber)
    bookingObject['userID'] = parseInt(bookingObject.userID)
    console.log(bookingObject);
    fetch('http://localhost:3001/api/v1/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingObject),
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
      if (!response.ok) {
        console.log(response.json());
        throw new Error(response.message);
      }
      return response.json()
    })
    .then(json => refreshData())
    .catch(error => console.log('Caught error:', error));
  }