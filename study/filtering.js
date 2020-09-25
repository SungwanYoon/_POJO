// O(M)
function getMovies() {
  return []; // [{id, name, year}]
}

// O(R)
function getRatings() {
  return []; // [{id, movie_id, rating}]   0 <= rating <= 10   // e.g 9.3
}

/**
 * minAvgRating ->
 *    avgRating >= minAvgRating
 *
 * sort ->
 *    name -> ascending order movies by name
 *   -name -> descending
 *
 *    avgRating
 *
 *
 * search ->
 *   'ave' -> 'Avengers'
 *   'avengers' -> 'Avengers'
 *   'AvengersInfinitywar' -> 'Avengers'
 */
const toLower = (str) => str.toLocaleLowerCase();

const getAvrgRating = (movie, movingWithRatings) => {
  let count = 0;
  return movingWithRatings.reduce((acc, value, index) => {
    const movieMatch = movie.id === value.movie_id;
    if (movieMatch) {
      acc += value.rating;
      count++;
    }
    if (index === movingWithRatings.length - 1) {
      acc = acc / count;
    }
    return acc;
  }, 0);
};

const isSubString = (str1, str2) => {
  str1 = toLower(str1.split(" ").join(""));
  str2 = toLower(str2.split(" ").join(""));
  if (str1.length > str2.length) {
    return str1.startWith(str2);
  } else {
    return str2.startWith(str1);
  }
};

const moviesList = getMovies();
const movingWithRatings = getRatings();
function queryMovies({ search, sort, minAvgRating }) {
  let filteredMovies = movingWithRatings.filter(
    (movie) => getAvrgRating(movie, movingWithRatings) >= minAvgRating
  );
  filteredMovies = filteredMovies.map((movie) =>
    moviesList.filter((listItem) => listItem.id === movie.movie_id).pop()
  );
  filteredMovies = filteredMovies.filter((movie) =>
    isSubString(toLower(movie.name), toLower(search))
  );
  filteredMovies = filteredMovies.sort((a, b) => {
    const isDescending = sort[0] === "-" ? true : false;
    let sortCopy = isDescending ? sort.slice(1) : sort;
    const value1 = a[sortCopy];
    const value2 = b[sortCopy];
    if (isDescending) {
      return value1 > value2 ? -1 : 1;
    } else {
      return value1 < value2 ? -1 : 1;
    }
  });
  filteredMovies = filteredMovies.map((movie) => ({
    ...movie,
    avgRating: movingWithRatings.filter(
      (ratedMovie) => ratedMovie.movie_id === movie.id
    )[0].rating,
  }));
  return filteredMovies;
}
