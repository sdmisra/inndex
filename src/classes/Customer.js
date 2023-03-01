import Booking from "./Booking";

class Customer {
  constructor(customerData) {
    this.id = customerData.id;
    this.name = customerData.name;
    this.bookings;
  }
  retrieveMyBookings(bookingsData, roomsData) {
    let foundBookings = bookingsData.filter(booking => booking['userID'] === this.id)
    this.bookings = foundBookings.map(singleBookingData => new Booking(singleBookingData))
    this.bookings.forEach(booking => booking.retrieveRoomInfo(roomsData))
    // console.log('Bookings retrieved:', this.bookings)
    return this.bookings
  }
  calcTotalCost() {
    let totalPrice = 0;
    if (this.bookings === []) {
      console.log('Ln 19 Customer: User does not seem to have any saved bookings!')
    }
    else {
      this.bookings.forEach(booking => totalPrice += booking['cost'])
    }
    this.rewardsPoints = Number(totalPrice.toFixed(0))
    return this.rewardsPoints;
  }
}

export default Customer;