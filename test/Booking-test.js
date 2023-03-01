import {assert, expect} from 'chai';
import bookingsTestData from '../src/data/bookingsTestData';
import Booking from '../src/classes/Booking';

describe('Booking tests are running', function() {
  let testBooking;

  beforeEach(()=> {
    testBooking = new Booking(bookingsTestData);
  })

  it('should be a function', ()=> {
    assert.isFunction(Booking);
  })

  it('should be able to create an instance of Booking', () => {
    assert.instanceOf(testBooking, Booking)
  })

  it('should contain a booking id', () => {
    assert.equal(testBooking.id, '5fwrgu4i7k55hl6sz')
  })
  
  it('should contain the userID that a booking belongs to', () => {
    assert.equal(testBooking.userId, 9)
  })

  it('should indicate what date the booking is for',() => {
    assert.equal(testBooking.date,'2022/04/22')
  })

  it('should indicate the room number that is reserved by the booking', () => {
    assert.equal(testBooking.roomNumber, 15)
  })

});