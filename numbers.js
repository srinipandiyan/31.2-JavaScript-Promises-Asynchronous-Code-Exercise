//declare favorite number
const favoriteNumber = 42;
//define URL with favorite and JSON format query key
const apiURL_1 = `http://numbersapi.com/${favoriteNumber}?json`;

// 1. Make a GET request to the Numbers API
$.getJSON(apiURL_1).then(data=>{
  console.log(data);
})


//define favorite numbers in an array
const favoriteNumbers = [7, 31, 25];
//define URL  with array and JSON format query key
const apiURL_2 = `http://numbersapi.com/${favoriteNumbers}?json`;

// 2. Make multiple requests to Numbers API
$.getJSON(apiURL_2).then(data => {
  console.log(data);
});

// 3. Get four facts for favorite number and display them on page
Promise.all(
  Array.from({ length: 4 }, () => {
    return $.getJSON(apiURL_1);
  })
).then(facts => {
  facts.forEach(data => $("body").append(`<p>${data.text}</p>`));
});
