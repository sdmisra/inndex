import Room from "./Room";

class Booking {
  constructor(bookingData) {
    this.id = bookingData.id;
    this.userId = bookingData.userID
    this.date = bookingData.date;
    this.roomNumber = bookingData.roomNumber;
    this.roomDetails;
    this.cost;
    // console.log('Initial Booking:', this);
  }
  retrieveRoomInfo(roomsData) {
    let foundRoom = roomsData.find(room => room.number === this.roomNumber)
    this.cost = foundRoom.costPerNight
    this.roomDetails = new Room(foundRoom);
    // console.log('made a room and put it here:', this.roomDetails)
  }
}

export default Booking;