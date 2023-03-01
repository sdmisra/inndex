import {assert, expect} from 'chai';
import Customer from '../src/classes/Customer';
import testCustomers from '../src/data/customersTestData';
import testBookings from '../src/data/bookingsTestData';
import testRoomData from '../src/data/roomsTestData';

describe('Customer tests are running', function() {
  let testUser;
  beforeEach(() => {
    testUser = new Customer(testCustomers[0])
  });

  it('should be a function', function() {
    assert.isFunction(Customer);
  });

  it('should be able to create an instance of Customer', () => {
    assert.instanceOf(testUser, Customer);
  });

  it('should contain a customer ID', () => {
    assert.equal(testUser.id, 9)
  });

  it('should contain a customers username', () => {
    assert.equal(testUser.name, 'Faustino Quitzon');
  });
  it('should be able to retrieve bookings for a user by ID', ()=> {
    testUser.retrieveMyBookings(testBookings, testRoomData);
    console.log(testUser.bookings);
  })
  
});
