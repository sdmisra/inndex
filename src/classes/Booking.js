class Booking {
  constructor(bookingData) {
    console.log(bookingData)
    this.id = bookingData.id;
    this.userId = bookingData.userID
    this.date = bookingData.date;
    this.roomNumber = bookingData.roomNumber;
  }
}

export default Booking;