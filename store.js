import { createStore } from "./core.js"
import withlogger from "./logger.js";
import reducer from "./reducer.js"

const { attach, connect, dispatch} = createStore(withlogger(reducer));

window.dispatch = dispatch

export{
    attach,
    connect
}