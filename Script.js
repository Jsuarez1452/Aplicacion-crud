
document.addEventListener('DOMContentLoaded', () => {
    const activityInput = document.getElementById('activityInput');
    const addActivityButton = document.getElementById('addActivityButton');
    const activityList = document.getElementById('activityList');
    const emptyImage = document.querySelector('.emptyImage');
    const tasksContainer = document.querySelector('.tasksContainer');
    const progress = document.getElementById('progress');
    const totalTasks = document.getElementById('totalTasks');
    
    const toggleEmptyImage = () => {
       emptyImage.style.display = activityList.children.length === 0 ? 'block' : 'none';
       tasksContainer.style.width = activityList.children.length > 0 ? '100%' : '50%';
    };

    const updateProgressBar = () => {
        const totalActivities = activityList.children.length;
        const completedTasks = activityList.querySelectorAll('.checkBox:checked').length;
        progress.style.width = totalActivities ? `${completedTasks / totalActivities * 100}%` : '0%';
        totalTasks.textContent = `${completedTasks} / ${totalActivities} `;
        if (completedTasks === totalActivities && totalActivities > 0) {
            setTimeout(() => {
                alert('¡Felicidades! Has completado todas las tareas.');
            }, 1000);
        }
    }

    const saveActivitiesToLocalStorage = () => {
        const tasks = Array.from(activityList.querySelectorAll('li')).map(listItem => ({
            text: listItem.querySelector('span').textContent,
            completed: listItem.querySelector('.checkBox').checked
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const loadActivitiesFromLocalStorage = () => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(({text, completed}) => addActivity(text, completed, false));
        updateProgressBar();
    };

    const addActivity = (text, completed = false,  checkCompletion = true) => {
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
            updateProgressBar();
            saveActivitiesToLocalStorage();
            });            

        editButton.addEventListener('click', () => {
            if (!checkbox.checked) {
                activityInput.value = listItem.querySelector('span').textContent
                listItem.remove();
                updateProgressBar(false);
                saveActivitiesToLocalStorage();
                }
            });
        
        listItem.querySelector('.deleteButton').addEventListener('click', () => {
            listItem.remove();
            toggleEmptyImage();
            updateProgressBar();
            saveActivitiesToLocalStorage();
        });

        activityList.appendChild(listItem);
        activityInput.value = '';
        toggleEmptyImage();
        updateProgressBar(checkCompletion);
    };

    addActivityButton.addEventListener('click', () => addActivity());
    activityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') 
            addActivity();
    });

    loadActivitiesFromLocalStorage();
});