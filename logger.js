export default function logger(reducer) {
    return (prevState, action, args) => {
        console.group(action)
        console.log('prevState:', prevState);
        console.log('prev arguments:', args);
        const NextState = reducer(prevState, action, args)
        console.log(NextState);
        console.groupEnd()
        return NextState
    }
}