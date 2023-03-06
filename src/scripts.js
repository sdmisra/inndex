import './css/styles.css';
import './images/turing-logo.png'
import fetchData from '/dist/apiCalls'
import Hotel from './classes/Hotel';
// Promise retrieval:
let hotelData, roomFilter, customerRooms, reformatDate, thisCustomer, currentBooking;

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
    console.log('hotel updated:',hotelData);
    return hotelData
  })
}

  // Document Selectors //
  const loginView = document.querySelector('#loginWindow')

  const bookRoomInput = document.querySelector('#bookingInput')
  const roomTypeInput = document.querySelector('#roomTypeInput')
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
  toggleElements([fullPageView])
  })
bookRoomBtn.addEventListener('click', (event)=> {
  resetFilter();
  checkThisDate(roomFilter);
})
userBrowseButton.addEventListener('click', ()=> {
  toggleElements([browserView, bookRoomBtn]);
})
userNameInput.addEventListener('keypress', (event) => {
  if (event.keyCode == 13) {
  renderCustomer();
  toggleElements([loginView])
  toggleElements([fullPageView, mainBucket])
  }
})

mainBucket.addEventListener('click', (event) => {
  bookRoom(event, hotelData);
  resetFilter();
  toggleElements([browserView, bookRoomBtn])
  setTimeout(()=> {
    renderCustomer();
    toggleElements([announceWords]);
  }, 5000)
})

userToggleBookingsBtn.addEventListener('click', () => {
  renderCustomer();
  toggleElements([savedBucket])
})
// userBrowseButton.addEventListener(
//   // toggleElements([])
// )
userLogOut.addEventListener('click', () => {
  thisCustomer = undefined;
  toggleElements([loginView])
  toggleElements([fullPageView, mainBucket, savedBucket])
})

userLogIn.addEventListener('click', ()=> {
  renderCustomer();
  toggleElements([loginView])
  toggleElements([fullPageView, mainBucket])
})

  // Event Handlers // 
  function checkThisDate (filter) {
    reformatDate = bookRoomInput.value.replaceAll('-', '/')
    let roomsForDate = hotelData.getAvailableRooms(reformatDate, filter)
    if (!roomsForDate.length) {
      denyBooking(reformatDate);
      hideElements([mainBucket]);
      setTimeout(()=> {
        toggleElements([announceWords])
      }, 3000)
      return
    }
    else {
      renderRooms(roomsForDate, defaultMainView);
      showElements([mainBucket]);
    }
  }

  function renderCustomer() {
    rewardsWords.innerText = ''
    let idNum = Number(userNameInput.value.split('customer')[1])
    thisCustomer = hotelData.loginCustomer(idNum);
    rewardsWords.innerText = `Welcome back ${thisCustomer.name.split(' ')[0]}! You have ${thisCustomer.rewardsPoints} rewards points! Thank you for your continued loyalty.`
    customerRooms = thisCustomer.retrieveMyRooms();
    renderRooms(customerRooms, defaultSavedView)
    toggleElements([userNav])
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
    let saveNumber = click.target.id;
    let saveId = thisCustomer.id;
    console.log('clicked:', saveNumber)
    currentBooking = {"userID": `${saveId}`, "date": `${reformatDate}`, "roomNumber": `${saveNumber}`}
    postRoomBooking(currentBooking);
    confirmBooking(reformatDate, saveNumber);
    console.log(hotelData)
  }

  function confirmBooking(date, room) {
    toggleElements([announceWords])
    toggleElements([mainBucket])
    announceWords.innerText = `You have made a successful booking for room #${room} on ${date.replaceAll('/','-')}! We will be looking forward to your visit.`
  }

  function denyBooking(date) {
    toggleElements([announceWords])
    hideElements([mainBucket])
    announceWords.innerText = `Unfortunately, there are no available rooms for those search parameters for the selected date (${date.replaceAll('/', '-')}). Please select 'All Rooms' to see all available suites for current date.`
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