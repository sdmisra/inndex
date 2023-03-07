import {assert, expect} from 'chai';
import testRoomData from '../src/data/roomsTestData';
import Room from '../src/classes/Room';

describe('Room tests are running', function() {
  let testRoom;

  beforeEach(()=> {
    testRoom = new Room(testRoomData[0]);
  })

  it('should be a function', ()=> {
    assert.isFunction(Room);
  })

  it('should be able to create an instance of Room', () => {
    assert.instanceOf(testRoom, Room)
  })

  it('should contain a room number', () => {
    assert.equal(testRoom.number, 15)
  })
  
  it('should contain a room type', () => {
    assert.equal(testRoom.roomType, 'residential suite')
  })

  it('should indicate the presence of a bidet',() => {
    assert.equal(testRoom.bidet, false)
  })

  it('should contain the size of beds in the room', () => {
    assert.equal(testRoom.bedSize, 'full')
  })

  it('should indicate the number of beds in the room', () => {
    assert.equal(testRoom.numBeds, 1)
  })

  it('should indicate the the cost per night to stay in the room', () => {
    assert.equal(testRoom.costPerNight, 294.56)
  })

});