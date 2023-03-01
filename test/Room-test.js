import {assert, expect} from 'chai';
import testRoomData from '../src/data/roomsTestData';
import Room from '../src/classes/Room';

describe('Room tests are running', function() {
  let testRoom;

  beforeEach(()=> {
    testRoom = new Room(testRoomData);
  })

  it('should be a function', ()=> {
    assert.isFunction(Room);
  })

  it('should be able to create an instance of Room', () => {
    assert.instanceOf(testRoom, Room)
  })

  it('should contain a room number', () => {
    assert.equal(testRoom.number, 1)
  })
  
  it('should contain a room type', () => {
    assert.equal(testRoom.roomType, 'residential suite')
  })

  it('should indicate the presence of a bidet',() => {
    assert.equal(testRoom.bidet, true)
  })

  it('should contain the size of beds in the room', () => {
    assert.equal(testRoom.bedSize, 'queen')
  })

  it('should indicate the number of beds in the room', () => {
    assert.equal(testRoom.numBeds, 1)
  })

  it('should indicate the the cost per night to stay in the room', () => {
    assert.equal(testRoom.costPerNight, 358.4)
  })

});