const list = [1, 2, 3, 4, 5, 6, 7, 8];

function between(start, end) {
  return function (value, index) {
    return value > start && value < end;
  };
}

const filteredArray = list.filter(between(3, 6)); // [4,5]

console.log(filteredArray);
