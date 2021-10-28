function first() {
  //   setTimeout(function () {
  console.log("1st");
  //   }, 1000);
  // call the callback function
  //   callback();
}

function second(callback) {
  setTimeout(function () {
    console.log("2st");
  }, 1000);
  // call the callback function
  callback();
}

second(first);
