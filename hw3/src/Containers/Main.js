// import TodoInput from '../Components/TodoInput';
import React, { useState, useEffect, useRef } from "react";
import TodoItem from '../Components/TodoItem';

// var todoList = ["This is the first TODO.", "This is the second TODO.", "This is the third TODO."]


// function Main() forwardRef((props, ref) {
function Main({setNumItem}) {

    const [todoList, setTodoList] = useState([])
    const [todoItem, setTodoItem] = useState('')
    const refContainer = useRef(0);

    // const resetNum = () => setNumItem(() => refContainer.current.children.length)
    function resetNum() {setNumItem(() => refContainer.current.children.length)}
    // const addAllNumber = () => setAllNumber(prev => prev + 1);

    const insertTodo = (i) => {
        setTodoItem(i.currentTarget.value)
        if (i.keyCode === 13) {
            console.log(i.currentTarget.value)
            // addItem(i.currentTarget.value)
            setTodoList(todoList => [...todoList, todoItem]);
            i.currentTarget.value = ''
            console.log(todoList)
            console.log(Array.isArray(todoList))
        }
    }

    useEffect(() => {
        resetNum()
    })

    return(
        <section className="todo-app__main">
            <input id="todo-input" className="todo-app__input" placeholder="What needs to be done?"  onKeyUp={insertTodo}/>
            <ul id="todo-list" className="todo-app__list" ref={refContainer}>
                {todoList.map(item => 
                <li className="todo-app__item" key={todoList.indexOf(item)}>
                    <TodoItem text={item} id={todoList.indexOf(item)}/>
                </li>)}
            </ul>
        </section>
    );
}

export default Main;