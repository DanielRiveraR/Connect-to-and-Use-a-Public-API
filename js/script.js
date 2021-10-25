let employees = [];
const usersUrl = `https://randomuser.me/api/?results=12&inc=picture,name,email,location,phone,dob&noinfo&nat=US`;
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalWindow = document.querySelector('.modal-content');
const windowCloser = document.querySelector('.window-closer');
let btnPrev = document.getElementById('prev');
let btnNext = document.getElementById('next');

// Fetch data 
fetch(usersUrl)
  .then(res => res.json())
  .then(res => res.results)
  .then(storeFetchData)
  .catch(err => console.log(err))
  
function storeFetchData(employeeData) {
  employees = employeeData;
  getProfiles(employeeData)
}

// HELPER FUNCTIONS  

function getProfiles(employeeData) {

  let employeeCard = '';

  employeeData.forEach((employee,index) => {
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
    `;
  });

  gridContainer.innerHTML = employeeCard;
}



function displayModalWindow(index) {
  
    let { name, dob, phone, email, location: {city, street, state, postcode}, picture } = employees[index];
    let birthDate = new Date(dob.date);
    let month = birthDate.getMonth() + 1;
    let date = birthDate.getDate();
    
    employeeModalWindow += `
      <div class="card" index=${index}>
        <img class="avatar" src="${picture.large}" alt="avatar">
        <div class="text-container">
          <h2 class="name">${name.first} ${name.last}</h2>
          <p class="email">${email}</p>
          <p class="address">${city}</p>
          <p>${phone}</p>
          <p class="address">${street.number} ${street.name}, ${city}, ${state} ${postcode}</p>
          <p>Birthday: ${month}/${date}/${birthDate.getFullYear()}</p>
        </div>
      </div>  
      `;
  
  overlay.classList.remove('hidden');
  modalWindow.innerHTML = employeeModalWindow;
}

let prevModal;
let nextModal;

// EVENT LISTENERS
let currentIndex;
let index;
gridContainer.addEventListener('click', (e) => {
  if (e.target !== gridContainer) {
    const card = e.target.closest('.card');
    index = card.getAttribute('data-index');
    
    nextModal = index;
    prevModal = index;
    currentIndex = index;

    displayModalWindow(index);
    console.log(index);
  }
  console.log(index);
  console.log(currentIndex);

});
