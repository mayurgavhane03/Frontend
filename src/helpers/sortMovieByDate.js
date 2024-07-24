export const sortMoviesByDate = (movies) => {
  return movies.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
};
