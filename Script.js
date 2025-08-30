
document.addEventListener('DOMContentLoaded', () => {
    const activityInput = document.getElementById('activityInput');
    const addActivityButton = document.getElementById('addActivityButton');
    const activityList = document.getElementById('activityList');
    const emptyImage = document.querySelector('.emptyImage');
    const tasksContainer = document.querySelector('.tasksContainer');
    const progressBar = document.getElementById('progress');
    const totalTasks = document.getElementById('totalTasks');
    
    const toggleEmptyImage = () => {
       emptyImage.style.display = activityList.children.length === 0 ? 'block' : 'none';
       tasksContainer.style.width = activityList.children.length > 0 ? '100%' : '50%';
    };

   /* const updateProgressBar = (checkCompletion = true) => {
        const totalActivities = activityList.children.length;
        const completedTasks = activityList.querySelectorAll('.checkbox:checked').length;
        progressBar.style.width = totalActivities ? `${completedTasks / totalActivities * 100}%` : '0%';
        totalTasks.textContent = `${completedTasks} / ${totalActivities} `;
    };*/

    const addActivity = (text, completed = false) => {
        const activityText = text || activityInput.value.trim();
        if (!activityText) 
            return;

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <input type="checkbox" class="checkBox" ${completed ? 'checked' : ''}>
            <span>${activityText}</span>
            <div class="editDeleteButtons">
                <button class="editButton"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="deleteButton"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        const checkbox = listItem.querySelector('.checkBox');
        const editButton = listItem.querySelector('.editButton');
        if(completed) {
            editButton.disabled = true;
            editButton.style.opacity = '0.5';
            editButton.style.pointerEvents = 'none';
        }

        checkbox.addEventListener('change', () => {
            const isChecked = checkbox.checked;
            listItem.classList.toggle('completed', isChecked);
            editButton.disabled = isChecked;
            editButton.style.cursor = isChecked ? 'not-allowed' : 'pointer';
            editButton.style.opacity = isChecked ? '0.5' : '1';
            editButton.style.pointerEvents = isChecked ? 'none' : 'auto';
            });            

        editButton.addEventListener('click', () => {
            if (!checkbox.checked) {
                activityInput.value = listItem.querySelector('span').textContent
                listItem.remove();
                }
            });
        
        listItem.querySelector('.deleteButton').addEventListener('click', () => {
            listItem.remove();
            toggleEmptyImage();
        });

        activityList.appendChild(listItem);
        activityInput.value = '';
        toggleEmptyImage();
    };

    addActivityButton.addEventListener('click', () => addActivity());
    activityInput.addEventListener ('keypress', (e) => {
        if (e.key === 'Enter') 
        e.preventDefault();
            addActivity(e);
    });
});