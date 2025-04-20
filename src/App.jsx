import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faFloppyDisk, faTrash } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState(''); /* todo inputa yazılan metinleri tutar */
  const [todoList, setTodoList] = useState([]); /* todoList eklenen görevleri bir dizi halinde saklar */

  const changeTodo = (event) => {
    setTodo(event.target.value);
  }; /* İnput'a her yazıldıgında tetiklenir ve setTodo inputun değerini günceller. */

  const saveTodo = () => {
    if (todo.trim() !== '') {
      setTodoList((prevTodoList) => [
        ...prevTodoList,
        { id: uuidv4(), todo: todo, isEditable: false, isCompleted: false },
      ]);
      setTodo('');
    }
  };

  const completeTodo = (id) => {
    setTodoList((prevTodoList) =>
      prevTodoList.map((todoItem) =>
        todoItem.id === id
          ? { ...todoItem, isCompleted: !todoItem.isCompleted }
          : todoItem
      )
    );
  };

  const editTodo = (id) => {
    setTodoList((prevTodoList) =>
      prevTodoList.map((todoItem) =>
        todoItem.id === id
          ? { ...todoItem, isEditable: true }
          : todoItem
      )
    );
  };

  const saveEditedTodo = (id) => {
    setTodoList((prevTodoList) =>
      prevTodoList.map((todoItem) =>
        todoItem.id === id
          ? { ...todoItem, isEditable: false }
          : todoItem
      )
    );
  };

  const handleEditChange = (id, newText) => {
    setTodoList((prevTodoList) =>
      prevTodoList.map((todoItem) =>
        todoItem.id === id
          ? { ...todoItem, todo: newText }
          : todoItem
      )
    );
  };

  const deleteTodo = (id) => {
    setTodoList((prevTodoList) =>
      prevTodoList.filter((todoItem) => todoItem.id !== id)
    );
  };

  return (
    <div className='todo-baslik'>
      <h2>Todo List</h2>
      <div className='input-button'>
        <input
          type='text'
          placeholder='Todo Input'
          className='input-username'
          value={todo}
          onChange={changeTodo}
        />
        <button className='add-button' onClick={saveTodo}>
          Add Todo
        </button>
      </div>

      <div>
        {todoList.map((todoItem) => (
          <div className='map-div' key={todoItem.id}>
            <div className='todo-left'>
              <input
                className='map-input'
                type='checkbox'
                checked={todoItem.isCompleted}
                onChange={() => completeTodo(todoItem.id)}
              />

              {todoItem.isEditable ? (
                <input
                  type='text'
                  value={todoItem.todo}
                  onChange={(e) => handleEditChange(todoItem.id, e.target.value)}
                />
              ) : (
                <label className={todoItem.isCompleted ? 'completed' : ''}>
                  {todoItem.todo}
                </label>
              )}
            </div>

            <div className='todo-icons'>
              {todoItem.isEditable ? (
                <FontAwesomeIcon
                  icon={faFloppyDisk}
                  className='icon'
                  onClick={() => saveEditedTodo(todoItem.id)}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faPen}
                  className='icon'
                  onClick={() => editTodo(todoItem.id)}
                />
              )}
              <FontAwesomeIcon
                icon={faTrash}
                className='icon'
                onClick={() => deleteTodo(todoItem.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
