import {assert} from 'chai';
import hotelTestData from '../src/data/hotelTestData'
import Hotel from '../src/classes/Hotel'
import Customer from '../src/classes/Customer'
import Booking from '../src/classes/Booking';
import Room from '../src/classes/Room';


describe('Hotel tests are running', function() {
  let testHotel

  beforeEach(()=> {
    testHotel = new Hotel();
    testHotel.retrieveHotelInfo(hotelTestData)
  })

  it('should be a function', function() {
    assert.isFunction(Hotel);
  })

  it('should be an instance of the Hotel class', ()=> {
    assert.instanceOf(testHotel, Hotel)
  })

  it('should be able to retrieve the data associated with the hotel', () => {

    assert.equal(testHotel.bookings.length, 3);
    assert.equal(testHotel.rooms.length, 3);
    assert.equal(testHotel.customers.length, 4);
  })

  it('after data retrieval, each hotel property should contain instances of their named classes', ()=> {

    assert.instanceOf(testHotel.bookings[0], Booking)
    assert.instanceOf(testHotel.rooms[0], Room)
    assert.instanceOf(testHotel.customers[0], Customer)
  })

  it('should enable a customer to log in', ()=> {
    let iAmFaustino = testHotel.loginCustomer(9)

    assert.equal(iAmFaustino.name, 'Faustino Quitzon')
    assert.equal(iAmFaustino.id, 9)
  })

  it('should return an error when a user cannot be found by id number', ()=> {
    let unknownEntity = testHotel.loginCustomer(99)
    assert.equal(unknownEntity, 'Error during login')
  })
  
  it('should enable searching to find available rooms, given a date', ()=> {
    let testQuery = testHotel.getAvailableRooms('2022/04/22')

    assert.equal(testQuery.length, 3)
    assert.instanceOf(testQuery[0], Room)
  })

});