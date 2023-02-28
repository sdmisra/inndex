function fetchData(datum) {
  return fetch(`http://localhost:3001/api/v1/${datum}`)
  .then(res => res.json())
  .catch(error => console.log('Hmmm:', error))
}

export default fetchData;