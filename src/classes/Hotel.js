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

}

export default Hotel;