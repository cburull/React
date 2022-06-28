import React from "react";

export default function({ todo, toggleTodo }) {
    function handleToggleTodo() {
        toggleTodo(todo.id)
    }

    return (
        <label>
            <input type="checkbox" checked={todo.done} onChange={handleToggleTodo} style={{marginRight:'8px'}} />
            {todo.name}
        </label>
    )
}