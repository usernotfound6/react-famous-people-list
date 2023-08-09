import React, { useState, useEffect } from 'react';
import './FamousSection.css';
import axios from 'axios'


 function FamousSection() {
  const [famousPersonName, setPersonName] = useState('');
  const [famousPersonRole, setPersonRole] = useState('');
  const [famousPeopleArray, setPeopleArray] = useState([]);
 
  // TODO: on load, call the fetchPeople() function

  const fetchPeople = () => {
    console.log('inside of fetchPeople()')
    axios.get('/')
    .then((response) => {
      console.log(response.data)

      setPeopleArray(response.data)
    }).catch((error) => {
     console.log('Error GET /creature', error)
    })
 }

    // TODO: fetch the list of people from the server
  
  useEffect(() => {
    fetchPeople()
  }, [])

  const addPerson = (evt) => {
    evt.preventDefault();
    console.log(`The person is ${famousPersonName} and they're famous for ${famousPersonRole}`);
    
    // TODO: create POST request to add this new person to the database

    // HINT: the server is expecting a person object 
    //       with a `name` and a `role` property
    axios.post('/', {name: famousPersonName.name, role: famousPersonRole.role}
    ).then((response) => {
      console.log(response);
      fetchPeople()
    }).catch((error) => {
      console.log('Error POST /')
    })
  }
  

    return (
      <section className="new-person-section">
        <form onSubmit={addPerson}>
          <label htmlFor="name-input">Name:</label>
          <input id="name-input" onChange={e => setPersonName(e.target.value)} />
          <label htmlFor="role-input">Famous for:</label>
          <input id="role-input" onChange={e => setPersonRole(e.target.value)} />
          <button type="submit">Done</button>
        </form>
        <p>
          {famousPersonName} is famous for "{famousPersonRole}".
        </p>
        <ul>
          {famousPeopleArray.map(setPeopleArray => (
          <li key={setPeopleArray.id}>
            {setPeopleArray.name} is from {setPeopleArray.role}
            </li>
             ))}
        </ul>
      </section>
     
    );
          }
export default FamousSection;
