import Room from "./Room";

class Booking {
  constructor(bookingData) {
    this.id = bookingData.id;
    this.userId = bookingData.userID
    this.date = bookingData.date;
    this.roomNumber = bookingData.roomNumber;
    this.roomDetails;
    this.cost;
  }
  retrieveRoomInfo(roomsData) {
    let foundRoom = roomsData.find(room => room.number === this.roomNumber)
    if (!foundRoom) {
      return 'Error in finding room for selected booking'
    }
    this.cost = foundRoom.costPerNight
    this.roomDetails = new Room(foundRoom);
  }
}

export default Booking;