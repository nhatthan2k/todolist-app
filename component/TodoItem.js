import html from "../core.js";
import { connect } from "../store.js";

const connector = connect()

function TodoItem( {todo, index, indexedit} ) {

    return html`
    <li class="${todo.completed && 'completed'} ${indexedit === index && 'editing'}">
        <div class="view">
            <input class="toggle" type="checkbox" ${todo.completed && 'checked'} onchange="dispatch('toggle', ${index})">
            <label ondblclick="dispatch('switchediting', ${index})">${todo.title}</label>
            <button class="destroy" onclick="dispatch('destroy', ${index})"></button>
        </div>
        <input class="edit" value="${todo.title}"
        onkeyup="event.keyCode === 13 && dispatch('endedit', this.value.trim()) || event.keyCode === 27 && dispatch('cancel')"
        onblur="dispatch('endedit', this.value.trim())"
        >
    </li>
    `
}

export default connector(TodoItem)