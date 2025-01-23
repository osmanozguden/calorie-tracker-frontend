// Select elements
const calorieForm = document.getElementById('calorie-form');
const foodInput = document.getElementById('food');
const caloriesInput = document.getElementById('calories');
const calorieList = document.getElementById('calorie-list');
const totalCalories = document.getElementById('total-calories');
const backendUrl = 'http://localhost:3000'; // Update to match your running backend port

// Load saved calorie entries from the backend when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch(`${backendUrl}/api/calories`);
        if (!response.ok) {
            throw new Error('Failed to fetch calorie data from backend');
        }
        const savedItems = await response.json();
        savedItems.forEach(item => addToList(item.food, item.calories));
        updateTotalCalories();
    } catch (error) {
        console.error('Error loading data:', error);
    }
});

// Function to add a calorie entry
async function addCalorieEntry(event) {
    event.preventDefault();

    // Get input values
    const foodItem = foodInput.value.trim();
    const calorieCount = caloriesInput.value.trim();

    if (foodItem === "" || calorieCount === "") {
        alert("Please enter both food item and calories.");
        return;
    }

    const entry = { food: foodItem, calories: parseInt(calorieCount) };

    try {
        const response = await fetch(`${backendUrl}/api/calories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error('Failed to save entry to backend');
        }

        // Add the new item to the UI
        addToList(foodItem, calorieCount);
        updateTotalCalories();

        // Clear input fields
        foodInput.value = "";
        caloriesInput.value = "";
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

// Function to add items to the UI list
function addToList(food, calories) {
    const listItem = document.createElement('li');
    listItem.textContent = `${food}: ${calories} calories`;
    calorieList.appendChild(listItem);
}

// Function to update total calories
function updateTotalCalories() {
    let total = 0;
    document.querySelectorAll('#calorie-list li').forEach(item => {
        total += parseInt(item.textContent.split(': ')[1]);
    });
    totalCalories.textContent = total;
}

// Event listener for form submission
calorieForm.addEventListener('submit', addCalorieEntry);
