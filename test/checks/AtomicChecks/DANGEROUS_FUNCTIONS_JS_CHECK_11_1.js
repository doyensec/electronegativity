function didTextInput(a) {

	var Callable = `console.log("${a}").`;
    window.setImmediate(Callable);
}

didTextInput(a);
