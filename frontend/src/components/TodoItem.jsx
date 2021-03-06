import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { deleteTodo, toggleTodo } from "../features/todos/todoSlice"
import { TodoText } from "./TodoItemText"

export function TodoItem({ todo }) {
	const [inputVisible, setInputVisible] = useState(false)

	const dispatch = useDispatch()

	const completeHandler = () => {
		dispatch(toggleTodo({ id: todo._id, complete: !todo.complete }))
	}

	const deleteHandler = () => {
		dispatch(deleteTodo(todo._id))
	}

	return (
		<div id="todos" className="todos">
			<li className={todo.complete ? "completed" : "uncompleted"}>
				<button
					type="button"
					onClick={completeHandler}
					className={todo.complete ? "complete-btn" : "uncomplete-btn"}
				>
					{todo.complete ? <i className="fas fa-check" /> : null}
				</button>
				<TodoText
					onCompleteClick={completeHandler}
					inputVisible={inputVisible}
					todo={todo}
					setInputVisible={setInputVisible}
				/>
				<button type="button" onClick={() => setInputVisible(true)} className="edit-btn">
					<i className="fas fa-pencil-alt" />
				</button>
				<button type="button" onClick={deleteHandler} className="destroy-btn">
					<i className="fas fa-times" />
				</button>
			</li>
		</div>
	)
}
