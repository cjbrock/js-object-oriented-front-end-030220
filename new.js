

function newFunc() {
  console.log("My name is", theName());

  function theName(){
    return "jane doe"
  }
}

newFunc();