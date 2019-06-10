function didTextInput(a) {

	var ExecutableString = "console.log("+a+")";
    window.setImmediate(ExecutableString);
}

didTextInput(a);
