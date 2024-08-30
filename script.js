document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.querySelector('.todo__form');
    const taskList = document.querySelector('.todo__list');
    const newTaskInput = document.querySelector('.todo__input');
    const clear = document.querySelector('.todo__button-clear');

    // Загружаем задачи из localStorage, если они есть, или создаём пустой массив для задач
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Функция сохранения задач в localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Функция для отрисовки задач на экране
    function renderTasks() {
        taskList.innerHTML = '';

        // Проходимся по каждой задаче и добавляем её в список
        tasks.forEach((task, index) => {
            const li = document.createElement('li'); 
            
            li.textContent = task.text; 
            
            li.classList.add('todo__item')

            // Если задача выполнена, добавляем соответствующий класс
            if (task.completed) {
                li.classList.add('completed');
            }

            // Добавляем событие для отметки задачи как выполненной или невыполненной
            li.addEventListener('click', () => {
                tasks[index].completed = !tasks[index].completed; // Переключаем статус задачи
                saveTasks(); 
                
                renderTasks(); 
            });

            // Создаём кнопку удаления задачи
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить';
            deleteButton.classList.add('delete');

            // Добавляем событие для удаления задачи
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Останавливаем всплытие события, чтобы задача не помечалась выполненной при удалении
                tasks.splice(index, 1);
                
                saveTasks();
                
                renderTasks();
            });
            
            li.append(deleteButton);
            
            taskList.append(li);
        });
    }

    // Добавление новой задачи
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newTaskText = newTaskInput.value.trim();

        if (newTaskText !== '') {
            tasks.push({ text: newTaskText, completed: false });
            
            saveTasks()
            
            renderTasks();

            newTaskInput.value = '';
        }
    });

    clear.addEventListener('click', (e) => {
        e.preventDefault()

        localStorage.clear();

        taskList.innerHTML = '';

        tasks = [];
    })

    renderTasks();

    console.log(localStorage)
});
