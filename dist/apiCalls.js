function fetchData(datum) {
  return fetch(`http://localhost:3001/api/v1/${datum}`)
  .then(res => res.json())
  .catch(error => console.log('Hmmm:', error))
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
      console.log(response.json());
      throw new Error(response.message);
    }
    return response.json()
  })
  .then(json => refreshData())
  .catch(error => console.log('Caught error:', error));
}

export {fetchData, postRoomBooking};