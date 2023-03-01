import Room from "./Room";
import Customer from "./Customer";
import Booking from "./Booking";

class Hotel {
  constructor(hotelData) {
    this.customers = hotelData.customers
    this.rooms = hotelData.rooms
    this.bookings = hotelData.bookings
  }
  retrieveManagerInfo() {
    // This function might allow the Hotel class to initialize all three arrays into arrays filled with instances of their respective classes. This will prevent redundancy in class creation that happens with each step of the Customer's track of experience.
  }
}

export default Hotel;