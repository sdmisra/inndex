import chai from 'chai';
import testRoomData from '../src/data/roomsTestData';
import Room from '../src/classes/Room';
const expect = chai.expect;

describe('Room tests are running', function() {
  
  it('should return true', function() {
    const testRoom = new Room(testRoomData)
    expect(true).to.equal(true);
  })
  ;
});