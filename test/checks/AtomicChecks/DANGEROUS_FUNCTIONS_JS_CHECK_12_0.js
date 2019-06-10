function didTextInput(a) {

	var Callable = function() { console.log("test") };
    window.setImmediate(Callable);
}

didTextInput(a);
