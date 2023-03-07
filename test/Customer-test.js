import {assert} from 'chai';
import Customer from '../src/classes/Customer';
import Room from '../src/classes/Room';
import Booking from '../src/classes/Booking'
import testCustomers from '../src/data/customersTestData';
import testBookings from '../src/data/bookingsTestData';
import testRoomData from '../src/data/roomsTestData';

describe('Customer tests are running', function() {
  let testUser;

  beforeEach(() => {

    testUser = new Customer(testCustomers[0]);
    testUser.retrieveMyBookings(testBookings, testRoomData);
  });

  it('should be a function', function() {

    assert.isFunction(Customer);
  });

  it('should be able to create an instance of Customer', () => {

    assert.instanceOf(testUser, Customer);
  });

  it('should contain a customer ID', () => {

    assert.equal(testUser.id, 9);
  });

  it('should contain a customers username', () => {

    assert.equal(testUser.name, 'Faustino Quitzon');
  });

  it('should be able to retrieve bookings for a user by ID', ()=> {

    assert.equal(testUser.bookings.length, 2);
    assert.instanceOf(testUser.bookings[0], Booking);
  })

  it('should provide an error if no bookings are found for a user', ()=> {

    let fakeUser = new Customer(testCustomers[1]);
    fakeUser.bookings = []
    assert.equal(fakeUser.retrieveMyRooms(testBookings, testRoomData), 'No bookings found for current user');
  })

  it('should be able to retrieve a list of a users rooms after retrieving booking data', ()=> {
    
    let testUserRooms = testUser.retrieveMyRooms();

    assert.equal(testUserRooms.length, 2);
    assert.instanceOf(testUserRooms[0], Room);
  })

  it('should be able to calculate the total cost of the users Bookings to date and store them as "Rewards Points"', ()=> {
    testUser.calcTotalCost()
    assert.equal(testUser.rewardsPoints, 600)
  })

  it('should give an error if a customer does not have bookings to calculate', () => {
    let fakeUser = new Customer(testCustomers[1]);
    assert.equal(fakeUser.calcTotalCost(), 'No bookings found for user')
  })
});
