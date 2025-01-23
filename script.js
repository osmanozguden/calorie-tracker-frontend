// Select elements
const calorieForm = document.getElementById('calorie-form');
const foodInput = document.getElementById('food');
const caloriesInput = document.getElementById('calories');
const calorieList = document.getElementById('calorie-list');
const totalCalories = document.getElementById('total-calories');
const backendUrl = 'http://localhost:3000'; // Update to match your running backend port


// Load saved calorie entries from Local Storage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const savedItems = JSON.parse(localStorage.getItem('calorieEntries')) || [];
    savedItems.forEach(item => addToList(item.food, item.calories));
    updateTotalCalories();
});

// Function to add a calorie entry
function addCalorieEntry(event) {
    event.preventDefault();

    // Get input values
    const foodItem = foodInput.value.trim();
    const calorieCount = caloriesInput.value.trim();

    if (foodItem === "" || calorieCount === "") {
        alert("Please enter both food item and calories.");
        return;
    }

    // Save entry to local storage
    const entry = { food: foodItem, calories: parseInt(calorieCount) };
    saveToLocalStorage(entry);

    // Add item to the list
    addToList(foodItem, calorieCount);

    // Update total calories
    updateTotalCalories();

    // Clear input fields
    foodInput.value = "";
    caloriesInput.value = "";
}

// Function to add items to the UI list
function addToList(food, calories) {
    const listItem = document.createElement('li');
    listItem.textContent = `${food}: ${calories} calories`;
    calorieList.appendChild(listItem);
}

// Function to save to Local Storage
function saveToLocalStorage(entry) {
    let items = JSON.parse(localStorage.getItem('calorieEntries')) || [];
    items.push(entry);
    localStorage.setItem('calorieEntries', JSON.stringify(items));
}

// Function to update total calories
function updateTotalCalories() {
    let items = JSON.parse(localStorage.getItem('calorieEntries')) || [];
    let total = items.reduce((sum, item) => sum + item.calories, 0);
    totalCalories.textContent = total;
}

// Event listener for form submission
calorieForm.addEventListener('submit', addCalorieEntry);
