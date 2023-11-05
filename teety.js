const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 300);
});

const do_it = (thing) => {console.log(thing)}

myPromise
  .then(do_it("now"))
  .then(do_it("next"))
  .then(do_it("last"));

let promise1 = Promise.resolve(1);
let promise2 = Promise.resolve(2);
let promise3 = Promise.resolve(3);

// An async function that waits for the promises manually
async function useAwait() {
  try {
    // Use await for each promise and assign the result to a variable
    let result1 = await promise1;
    let result2 = await promise2;
    let result3 = await promise3;
    // Log the results
    console.log(result1); // 1
    console.log(result2); // 2
    console.log(result3); // 3
  } catch (error) {
    // Handle any error from the promises
    console.error(error);
  }
}



new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000); // (*)

}).then(function(result) { // (**)

  alert(result); // 1
  return result * 2;

}).then(function(result) { // (***)

  alert(result); // 2
  return result * 2;

}).then(function(result) {

  alert(result); // 4
  return result * 2;

});