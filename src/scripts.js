import './css/styles.css';
import './images/turing-logo.png'
import fetchData from '/dist/apiCalls';
import Hotel from './classes/Hotel';
import './images/woodedHotel.png';

let hotelData, roomFilter, customerBookings, reformatDate, thisCustomer, currentBooking, idNum;

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
    console.log('hotelData after refresh and init', hotelData)
    return hotelData
  })
}
// function reFetchData()
  // Document Selectors //
  const loginView = document.querySelector('#loginWindow')

  const bookRoomInput = document.querySelector('#bookingInput')
  const bookRoomBtn = document.querySelector('#bookingBtn')
  const userBrowseButton = document.querySelector('#userBrowseButton')
  const radioBtns = document.querySelectorAll('.radio-room-button')

  const userNameInput = document.querySelector('#loginName')
  const userPassInput = document.querySelector('#loginPass')
  const userNav = document.querySelector('#userInfo')
  const userToggleBookingsBtn = document.querySelector('#userBookingsBtn')
  const userLogOut = document.querySelector('#userLogOutBtn')
  const userLogIn = document.querySelector('#userLogInBtn')

  const mainBucket = document.querySelector('#mainBookingsBrowser')
  const savedBucket = document.querySelector('#savedBookingsBrowser')
  const fullPageView = document.querySelector('#fullPageView')
  const browserView = document.querySelector('#newBookingView')
  const defaultMainView = document.querySelector('#defaultMainView')
  const defaultSavedView = document.querySelector('#defaultSavedView')

  const rewardsWords = document.querySelector('#rewardsText')
  const announceWords = document.querySelector('#announceText')
  // Event Listeners // 

window.addEventListener('load', () => {
  refreshData();
  })

bookRoomBtn.addEventListener('click', (event)=> {
  resetFilter();
  checkThisDate(roomFilter);
})

userBrowseButton.addEventListener('click', ()=> {
  resetFilter();
  toggleElements([browserView, bookRoomBtn]);
  hideElements([mainBucket]);
})

userNameInput.addEventListener('keypress', (event) => {
  if (event.keyCode == 13) {
    logIn();
  }
})

userLogIn.addEventListener('click', ()=> {
  logIn();
})

mainBucket.addEventListener('click', (event) => {
  if (event.target.id == 'defaultMainView' || event.target.id == 'mainBookingsBrowser') {
    return
  }
   else {
    bookRoom(event, hotelData);
    resetFilter();
    toggleElements([browserView, bookRoomBtn])
    setTimeout(()=> {
      toggleElements([announceWords]);
    }, 4000)
  }
})


userToggleBookingsBtn.addEventListener('click', () => {
  renderCustomer();
  toggleElements([savedBucket, userNav])
})

userLogOut.addEventListener('click', () => {
  thisCustomer = undefined;
  showElements([loginView])
  hideElements([mainBucket, savedBucket, userLogOut, rewardsWords, userToggleBookingsBtn, userNav, userBrowseButton, browserView, bookRoomBtn])
})

// Event Handlers // 
function checkThisDate (filter) {
  refreshData();
  reformatDate = bookRoomInput.value.replaceAll('-', '/')
  let roomsForDate = hotelData.getAvailableRooms(reformatDate, filter)
  if (!roomsForDate.length) {
    denyBooking(reformatDate);
    hideElements([mainBucket]);
    setTimeout(()=> {
      hideElements([announceWords])
    }, 5000)
    }
    else {
      renderTiles(roomsForDate, defaultMainView);
      showElements([mainBucket]);
    }
  }

function renderCustomer() {
  refreshData();
  rewardsWords.innerText = '';
  idNum = Number(userNameInput.value.split('customer')[1]);
  thisCustomer = hotelData.loginCustomer(idNum);
  rewardsWords.innerText = `Welcome back ${thisCustomer.name.split(' ')[0]}! You have ${thisCustomer.rewardsPoints} rewards points! Thank you for your continued loyalty!`
  customerBookings = thisCustomer.bookings;
  renderTiles(customerBookings, defaultSavedView)
}

function renderTiles(array, element) {
  element.innerHTML = ""
  array.forEach(item => {
    if (element.id === 'defaultMainView') {
      element.innerHTML += 
      `
      <div class="room-card" id ="${item.number}">
      <span class="room-card-detail" id ="${item.number}">Room #${item.number}</span>
      <span class="room-card-detail" id ="${item.number}">Bed Size: ${item.bedSize}</span>
      <span class="room-card-detail" id ="${item.number}">Beds: ${item.numBeds}</span>
      <span class="room-card-detail" id ="${item.number}">Bidet? ${item.bidet}</span>
      <span class="room-card-detail" id ="${item.number}">$${item.costPerNight} /night</span>
      <span class="room-card-detail" id ="${item.number}">${item.roomType}</span>
      <button class="room-card-button" id="${item.number}">Book Room</button>
      </div>
      `
    }
    else {
      element.innerHTML+= 
      `
      <div class="room-card" id ="${item.roomNumber}">
      <span class="room-card-detail" id ="${item.roomNumber}">Room #${item.roomNumber}</span>
      <span class="room-card-detail" id ="${item.number}">Booking ID:</span>
      <span class="room-card-detail" id ="${item.number}">${item.id}</span>
      </div>
      `
    }
    })
  }

  function logIn() {
    renderCustomer();
    hideElements([loginView, userNav, savedBucket])
    showElements([userLogOut, rewardsWords, userToggleBookingsBtn, userBrowseButton])
  }

  function bookRoom(click) {
    let saveNumber = click.target.id;
    let saveId = thisCustomer.id;
    currentBooking = {"userID": `${saveId}`, "date": `${reformatDate}`, "roomNumber": `${saveNumber}`}
    postRoomBooking(currentBooking);
    confirmBooking(reformatDate, saveNumber);
  }

  function confirmBooking(date, room) {
    showElements([announceWords])
    hideElements([mainBucket, userNav])
    announceWords.innerText = `You have made a successful booking for room #${room} on ${date.replaceAll('/','-')}! We will be looking forward to your visit.`
  }

  function denyBooking(date) {
    showElements([announceWords]);
    announceWords.innerText = `Unfortunately, there are no available rooms for those search parameters for the selected date (${date}). Please select 'All Rooms' to see all available options for selected date.`
  }

  function toggleElements(array) {
    let toggleElements = array.map(element => element.classList.toggle('hidden'))
    return toggleElements;
  }

  function showElements(array) {
    let showElements = array.map(element => element.classList.remove('hidden'))
    return showElements;
  }

  function hideElements(array) {
    let hideElements = array.map(element => element.classList.add('hidden'))
    return hideElements
  }

  function resetFilter() {
    roomFilter = undefined;
    for (let radioButton of radioBtns) {
      const checkedButton = radioButton.checked;
      checkedButton ? roomFilter = radioButton.id : null
    }
    roomFilter === 'all rooms' ? roomFilter = undefined : null;
  }

  function displayUserBookings(id) {
    fetch(`http://localhost:3001/api/v1/bookings`)
      .then(res => res.json())
      .then(data => {
        const userData = data.bookings.filter(booking => booking.userID == id);
        renderTiles(userData, defaultSavedView);
      });
  }

  function postRoomBooking(bookingObject) {
    bookingObject['roomNumber'] = parseInt(bookingObject.roomNumber)
    bookingObject['userID'] = parseInt(bookingObject.userID)
    fetch('http://localhost:3001/api/v1/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingObject),
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.message);
      }
      return response.json()
    })
    .then(json => {
      displayUserBookings(bookingObject.userID)
    })
    .catch(error => console.log('Caught error:', error));
  }