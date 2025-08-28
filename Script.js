
document.addEventListener('DOMContentLoaded', () => {
    const activityInput = document.getElementById('activityInput');
    const addActivityButton = document.getElementById('addActivityButton');
    const activityList = document.getElementById('activityList');
    const emptyImage = document.querySelector('.emptyImage');
    
    const toggleEmptyImage = () => {
       emptyImage.style.display = activityList.children.length === 0 ? 'block' : 'none';
    };

    const addActivity = (event) => {
        event.preventDefault();
        const activityText = activityInput.value.trim();
        if (!activityText) 
            return;

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <input type="checkbox" class="checkBox">
            <span>${activityText}</span>
            <div class="editDeleteButtons">
                <button class="editButton"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="deleteButton"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        activityList.appendChild(listItem);
        activityInput.value = '';
        toggleEmptyImage();
    };

    addActivityButton.addEventListener('click', addActivity);
    activityInput.addEventListener ('keypress', (e) => {
        if (e.key === 'Enter') 
            addActivity(e);
    });
});