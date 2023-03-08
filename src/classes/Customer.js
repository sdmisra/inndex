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

  retrieveMyRooms() {
    if (this.bookings.length === 0) {
      return `No bookings found for current user`
    }
    let userRooms = this.bookings.map(booking=>booking.roomDetails)
    return userRooms
  }
  
  calcTotalCost() {
    let totalPrice = 0;
    if (!this.bookings) {
      return 'No bookings found for user'
    }
    else {
      this.bookings.forEach(booking => totalPrice += booking['cost'])
    }
    this.rewardsPoints = Number(totalPrice.toFixed(0))
    return this.rewardsPoints;
  }
}

export default Customer;