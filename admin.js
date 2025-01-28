// Store and display children
const childForm = document.getElementById('childForm');
const childrenList = document.getElementById('childrenList');
const storedChildren = JSON.parse(localStorage.getItem('children')) || [];

document.addEventListener('DOMContentLoaded', function() {
    // Submit handler for adding a new child
    const childForm = document.getElementById('childForm');
    childForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const childName = document.getElementById('childName').value;
        const childAge = document.getElementById('childAge').value;
        const childGender = document.getElementById('childGender').value;

        // Send data to Flask
        fetch('/admin', {
            method: 'POST',
            body: new URLSearchParams({
                'childName': childName,
                'childAge': childAge,
                'childGender': childGender,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        .then(response => response.json())
        .then(data => {
            // Update the children list on the frontend
            const childrenList = document.getElementById('childrenList');
            childrenList.innerHTML = '';  // Clear the list before adding new data
            data.children.forEach(child => {
                const li = document.createElement('li');
                li.textContent = `${child.Name}, Age: ${child.Age}, Gender: ${child.Gender}`;
                const adoptButton = document.createElement('button');
                adoptButton.textContent = 'Adopt';
                adoptButton.onclick = () => {
                    window.location.href = `/adopt_child/${child.ID}`;
                };
                li.appendChild(adoptButton);
                childrenList.appendChild(li);
            });
        });
    });
});


// Load children from localStorage
function loadChildren() {
    childrenList.innerHTML = '';
    storedChildren.forEach((child, index) => {
        childrenList.innerHTML += `
            <li>
                <span>${child.name}, Age: ${child.age}, Gender: ${child.gender}</span>
                <button onclick="removeChild(${index})">Remove</button>
            </li>
        `;
    });
}

// Add new child
childForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const childName = document.getElementById('childName').value;
    const childAge = document.getElementById('childAge').value;
    const childGender = document.getElementById('childGender').value;

    storedChildren.push({ name: childName, age: childAge, gender: childGender });
    localStorage.setItem('children', JSON.stringify(storedChildren));
    loadChildren();
    childForm.reset();
});

// Remove child
function removeChild(index) {
    storedChildren.splice(index, 1);
    localStorage.setItem('children', JSON.stringify(storedChildren));
    loadChildren();
}

loadChildren(); // Load children on page load

// Adoption Management
const adoptionForm = document.getElementById('adoptionForm');
const adoptionsList = document.getElementById('adoptionsList');
const storedAdoptions = JSON.parse(localStorage.getItem('adoptions')) || [];

// Load adoptions from localStorage
function loadAdoptions() {
    adoptionsList.innerHTML = '';
    storedAdoptions.forEach((adoption, index) => {
        adoptionsList.innerHTML += `
            <li>
                <span>${adoption.adopterName} adopted ${adoption.childName} on ${adoption.date}</span>
                <button onclick="removeAdoption(${index})">Remove</button>
            </li>
        `;
    });
}

// Add new adoption
adoptionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const adopterName = document.getElementById('adopterName').value;
    const childName = document.getElementById('adoptionChildName').value;
    const adoptionDate = document.getElementById('adoptionDate').value;

    storedAdoptions.push({ adopterName, childName, date: adoptionDate });
    localStorage.setItem('adoptions', JSON.stringify(storedAdoptions));
    loadAdoptions();
    adoptionForm.reset();
});

// Remove adoption
function removeAdoption(index) {
    storedAdoptions.splice(index, 1);
    localStorage.setItem('adoptions', JSON.stringify(storedAdoptions));
    loadAdoptions();
}

loadAdoptions(); // Load adoptions on page load

// Donation Management
const donationForm = document.getElementById('donationForm');
const donationsList = document.getElementById('donationsList');
const storedDonations = JSON.parse(localStorage.getItem('donations')) || [];

// Load donations from localStorage
function loadDonations() {
    donationsList.innerHTML = '';
    storedDonations.forEach((donation, index) => {
        donationsList.innerHTML += `
            <li>
                <span>${donation.donorName} donated $${donation.amount} on ${donation.date}</span>
                <button onclick="removeDonation(${index})">Remove</button>
            </li>
        `;
    });
}

// Add new donation
donationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const donorName = document.getElementById('donorName').value;
    const donationAmount = document.getElementById('donationAmount').value;
    const donationDate = document.getElementById('donationDate').value;

    storedDonations.push({ donorName, amount: donationAmount, date: donationDate });
    localStorage.setItem('donations', JSON.stringify(storedDonations));
    loadDonations();
    donationForm.reset();
});

// Remove donation
function removeDonation(index) {
    storedDonations.splice(index, 1);
    localStorage.setItem('donations', JSON.stringify(storedDonations));
    loadDonations();
}

loadDonations(); // Load donations on page load


// Meals Management
const mealForm = document.getElementById('mealsForm');
const mealsList = document.getElementById('mealsList');
const storedMeals = JSON.parse(localStorage.getItem('meals')) || [];

// Load meals from localStorage
function loadMeals() {
    mealsList.innerHTML = '';
    storedMeals.forEach((meal, index) => {
        mealsList.innerHTML += `
            <li>
                <span>${meal.details} on ${meal.date}</span>
                <button onclick="removeMeal(${index})">Remove</button>
            </li>
        `;
    });
}

// Add new meal
mealForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const mealDetails = document.getElementById('mealDetails').value;
    const mealDate = document.getElementById('mealDate').value;

    storedMeals.push({ details: mealDetails, date: mealDate });
    localStorage.setItem('meals', JSON.stringify(storedMeals));
    loadMeals();
    mealForm.reset();
});

// Remove meal
function removeMeal(index) {
    storedMeals.splice(index, 1);
    localStorage.setItem('meals', JSON.stringify(storedMeals));
    loadMeals();
}

loadMeals(); // Load meals on page load

// Handle logout
document.getElementById('logout-btn').addEventListener('click', () => {
    window.location.href = 'index.html'; // Redirect to the homepage on logout
});
