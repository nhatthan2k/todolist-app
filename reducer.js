import storage from "./util/storage.js"

const init = {
    todos: storage.get(),
    filter: 'All',
    filters: {
        All: () => true,
        active: todo => !todo.completed,
        completed: todo => todo.completed,
    },
    indexedit: null, 
}

const actions = {
    add( {todos}, title) {
        todos.push({title, completed: false})
        storage.set(todos)
    },
    toggle({todos}, index) {
        const todo = todos[index]
        todo.completed = !todo.completed
        storage.set(todos)
    },
    toggleAll({todos}, checked) {
        todos.forEach(todo => { todo.completed = checked });
        storage.set(todos)
    },
    destroy({todos}, index) {
        todos.splice(index, 1)
        storage.set(todos)
    },
    switchfilter(state, filter) {
        state.filter = filter
    },
    Clearcompleted(state) {
        state.todos = state.todos.filter(state.filters.active)
        storage.set(state.todos) 
    },
    switchediting(state, index) {
        state.indexedit = index
    },
    endedit(state, title) {
        if (state.indexedit !== null) {
            if (title) {
                state.todos[state.indexedit].title = title
                storage.set(state.todos)
            }else{
                this.destroy(state, state.indexedit)
            }
            state.indexedit = null
        }
    },
    cancel(state) {
        state.indexedit = null
    }
}

export default function reducer(state = init, action, args) {
    actions[action] && actions[action](state,...args)
    return state
}