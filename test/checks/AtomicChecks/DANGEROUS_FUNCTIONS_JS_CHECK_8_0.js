function didTextInput() {
        window.setImmediate(() => {
          this.refs.scrollContainer.scrollTop = 0
          this.refs.scrollContainer.scrollLeft = 0
        })
}

didTextInput();
