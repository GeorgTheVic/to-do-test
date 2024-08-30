document.addEventListener('DOMContentLoaded', () => {

    // Получаем ссылку на форму добавления задач, список задач и поле ввода новой задачи
    const taskForm = document.querySelector('.todo__form');
    const taskList = document.querySelector('.todo__list');
    const newTaskInput = document.querySelector('.todo__input');
    const clear = document.querySelector('.todo__button-clear');

    // Загружаем задачи из localStorage, если они есть, или создаём пустой массив для задач
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Функция сохранения задач в localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // location.reload();
    }

    // Функция для отрисовки задач на экране
    function renderTasks() {
        // Очищаем текущий список задач на странице
        taskList.innerHTML = '';

        // Проходимся по каждой задаче и добавляем её в список
        tasks.forEach((task, index) => {
            const li = document.createElement('li'); // Создаём новый элемент списка
            li.textContent = task.text; // Устанавливаем текст задачи
            li.classList.add('todo__item')

            // Если задача выполнена, добавляем соответствующий класс
            if (task.completed) {
                li.classList.add('completed');
            }

            // Добавляем событие для отметки задачи как выполненной или невыполненной
            li.addEventListener('click', () => {
                tasks[index].completed = !tasks[index].completed; // Переключаем статус задачи
                saveTasks(); // Сохраняем изменения в localStorage
                renderTasks(); // Перерисовываем список задач
            });

            // Создаём кнопку удаления задачи
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить';
            deleteButton.classList.add('delete');

            // Добавляем событие для удаления задачи
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Останавливаем всплытие события, чтобы задача не помечалась выполненной при удалении
                tasks.splice(index, 1); // Удаляем задачу из массива задач
                saveTasks(); // Сохраняем изменения в localStorage
                renderTasks(); // Перерисовываем список задач
            });

            // Добавляем кнопку удаления в элемент списка задачи
            li.append(deleteButton);

            // Добавляем элемент задачи в список задач на странице
            taskList.append(li);
        });
    }

    // Добавляем обработчик события на отправку формы (добавление новой задачи)
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Предотвращаем стандартное поведение формы (перезагрузку страницы)

        const newTaskText = newTaskInput.value.trim(); // Получаем текст новой задачи и удаляем лишние пробелы

        if (newTaskText !== '') { // Проверяем, что текст задачи не пустой
            tasks.push({ text: newTaskText, completed: false }); // Добавляем новую задачу в массив задач
            saveTasks(); // Сохраняем изменения в localStorage
            renderTasks(); // Перерисовываем список задач
            newTaskInput.value = ''; // Очищаем поле ввода новой задачи
        }
    });

    //todo: fix this button

    clear.addEventListener('click', (e) => {

        // e.stopPropagation(); // Останавливаем всплытие события, чтобы задача не помечалась выполненной при удалении


        localStorage.clear()
        // saveTasks(); // Сохраняем изменения в localStorage
        renderTasks(); // Перерисовываем список задач
    })

    // Отрисовываем список задач при загрузке страницы
    renderTasks();

    console.log(localStorage)
});
