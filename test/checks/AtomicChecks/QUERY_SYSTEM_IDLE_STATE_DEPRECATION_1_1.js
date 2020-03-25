powerMonitor.querySystemIdleState(30, (currentState) => {
  console.log(`Idle state is ${currentState}`);
});