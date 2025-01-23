// Select elements
const calorieForm = document.getElementById('calorie-form');
const foodInput = document.getElementById('food');
const caloriesInput = document.getElementById('calories');
const calorieList = document.getElementById('calorie-list');
const totalCalories = document.getElementById('total-calories');

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

    // Create list item
    const listItem = document.createElement('li');
    listItem.textContent = `${foodItem}: ${calorieCount} calories`;

    // Add item to the list
    calorieList.appendChild(listItem);

    // Update total calories
    totalCalories.textContent = parseInt(totalCalories.textContent) + parseInt(calorieCount);

    // Clear input fields
    foodInput.value = "";
    caloriesInput.value = "";
}

// Event listener for form submission
calorieForm.addEventListener('submit', addCalorieEntry);
