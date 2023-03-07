const hotelTestData = {
  'customers': 
    [
    {
      "id": 1,
      "name": "Leatha Ullrich"
    },
    {
      "id": 2,
      "name": "Rocio Schuster"
    },
    {
      "id": 3,
      "name": "Kelvin Schiller"
    },
    {
      "id": 9,
      "name": "Faustino Quitzon"
    }
    ],
    'rooms': 
    [
    {
      "number": 1,
      "roomType": "residential suite",
      "bidet": true,
      "bedSize": "queen",
      "costPerNight": 358.4,
      "numBeds": 1
    },
    {
      "number": 2,
      "roomType": "suite",
      "bidet": false,
      "bedSize": "full",
      "costPerNight": 477.38,
      "numBeds": 2,
    },
    {
      "number": 2,
      "roomType": "single room",
      "bidet": false,
      "bedSize": "king",
      "costPerNight": 477.38,
      "numBeds": 2,
    }
    ],
    'bookings': 
    [
      {
      'id': '5fwrgu4i7k55hl6sz',
      'userID': 9,
      'date': '2022/04/22',
      'roomNumber': 15,
      },
      {'id': '5fwrgu4i7k55hl6wn',
      'userID': 9,
      'date': '2022/01/30',
      'roomNumber': 25
      },   
      {'id': '5fwrgu4i7k55hl6wo',
      'userID': 12,
      'date': '2022/02/21',
      'roomNumber': 23
      }
    ]
}

export default hotelTestData;