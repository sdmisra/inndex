import Room from "./Room";
import Customer from "./Customer";
import Booking from "./Booking";

class Hotel {
  constructor(hotelData) {
    this.customers = hotelData.customers
    this.rooms = hotelData.rooms
    this.bookings = hotelData.bookings
  }

  retrieveHotelInfo(hotelData) {
    this.customers = hotelData.customers.map(customer => {
      let thisCust = new Customer(customer)
      thisCust.retrieveMyBookings(hotelData.bookings, hotelData.rooms)
      thisCust.calcTotalCost()
      return thisCust
    })
    this.bookings = hotelData.bookings.map(booking => {
      let thisBooking = new Booking(booking);
      thisBooking.retrieveRoomInfo(hotelData.rooms);
      return thisBooking
    })
    this.rooms = hotelData.rooms.map(room => new Room(room));
  }

  loginCustomer(num) {
    let ensureNum = Number(num)
    let foundCustomer = this.customers.find(customer => customer.id === ensureNum)
    if (foundCustomer === undefined) {
      console.log('Error during login')
      return 'Error during login'
    }
    return foundCustomer
  }
  
  getAvailableRooms(date, filter = undefined) {
    let dateToCheck = date;

    let bookedRoomNumbers = this.bookings.filter(booking=> booking.date === dateToCheck).map(booking => booking.roomNumber)
    let availableRooms;
    if (filter) {
      availableRooms = this.rooms.filter(room => !bookedRoomNumbers.includes(room.number) && room.roomType == filter)
    }
    else {
      availableRooms = this.rooms.filter(room => !bookedRoomNumbers.includes(room.number))
    }
    this.openRooms = availableRooms;
    return availableRooms
  }
}

export default Hotel;