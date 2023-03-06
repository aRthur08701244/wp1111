const insertTodo = (i) => {
    if (i.keyCode === 13) {
        console.log(i.currentTarget.value)
        // todoList.push(i.currentTarget.value)
        i.currentTarget.value = ''
    }
}

function todoInput() {
    return(
        <input id="todo-input" className="todo-app__input" placeholder="What needs to be done?"  onKeyUp={insertTodo}/>
    )
}


export default todoInput