
document.addEventListener('DOMContentLoaded', () => {
    const activityInput = document.getElementById('activityInput');
    const addActivityButton = document.getElementById('addActivityButton');
    const activityList = document.getElementById('activityList');
    
    const addActivity = (event) => {
        event.preventDefault();
        const activityText = activityInput.value.trim();
        if (!activityText) 
            return;

        const listItem = document.createElement('li');
        listItem.textContent = activityText;
        activityList.appendChild(listItem);
        activityInput.value = '';
    };

    addActivityButton.addEventListener('click', addActivity);
    activityInput.addEventListener ('keypress', (e) => {
        if (e.key === 'Enter') 
            addActivity(e);
    });
});