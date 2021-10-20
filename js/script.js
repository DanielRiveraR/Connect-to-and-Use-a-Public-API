const usersUrl = 'https://randomuser.me/api/?results=12&inc=picture,name,email,location,phone,dob &nat=US&noinfo';  //image, First and Last Name, email, City or location, MW= Cell Number, Detailed Address, including street name and number, state or country, and post code, Birthday.
let employees = [];
const gridContainer = document.querySelector('.grid-container')
const overlay = document.querySelector('.overlay')

const btn = document.querySelector('button');
const btnPrev = document.getElementById('prev');
const btnNext = document.getElementById('next');

// Fetch Request 
fetch(usersUrl)
  .then(res => res.json())
  .then(res => employees = res.results)
  .then(getProfiles)
  .catch(err => console.log('Looks like there was a problem', err))

// HELPER FUNCTIONS  

function getProfiles(employeeJson) {
  let employeeCard = '';

  employeeJson.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;
    
    // Generate the markup for each profile
    employeeCard += `
    <div class="card" index=${index}>
      <img class="avatar" src="${picture.large}" alt="avatar">
      <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
      </div>
    </div>
    `
  });

  gridContainer.innerHTML = employeeCard;
}



