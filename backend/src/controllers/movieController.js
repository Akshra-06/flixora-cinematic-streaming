
const Movie = require("../models/Movie");
const { sendSuccess, sendError } = require("../utils/response");

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
console.log("TMDB KEY:", process.env.TMDB_API_KEY);
// Get all movies
exports.getAllMovies = async (req, res) => {
  try {
    const { page = 1, limit = 20, genre, searchTerm } = req.query;

    let query = {};

    if (genre) {
      query.genre = genre;
    }

    if (searchTerm) {
      query.$or = [
        { title: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const movies = await Movie.find(query)
      .limit(limit * 1)
      .skip(skip);

    const total = await Movie.countDocuments(query);

    return sendSuccess(res, 200, "Movies retrieved successfully", {
      movies,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    return sendError(res, 500, `Error retrieving movies: ${error.message}`);
  }
};

// Get movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const { movieId } = req.params;

    const movie = await Movie.findOne({ movieId });
    if (!movie) {
      return sendError(res, 404, "Movie not found");
    }

    return sendSuccess(res, 200, "Movie retrieved successfully", movie);
  } catch (error) {
    return sendError(res, 500, `Error retrieving movie: ${error.message}`);
  }
};

// Create movie (admin)
exports.createMovie = async (req, res) => {
  try {
    const {
      movieId,
      title,
      description,
      thumbnail,
      videoUrl,
      genre,
      duration,
      rating,
      releaseDate,
      director,
      cast,
    } = req.body;

    if (!movieId || !title || !thumbnail) {
      return sendError(
        res,
        400,
        "Please provide required fields: movieId, title, thumbnail",
      );
    }

    const existingMovie = await Movie.findOne({ movieId });
    if (existingMovie) {
      return sendError(res, 400, "Movie with this ID already exists");
    }

    const movie = new Movie({
      movieId,
      title,
      description,
      thumbnail,
      videoUrl,
      genre,
      duration,
      rating,
      releaseDate,
      director,
      cast,
    });

    await movie.save();

    return sendSuccess(res, 201, "Movie created successfully", movie);
  } catch (error) {
    return sendError(res, 500, `Error creating movie: ${error.message}`);
  }
};

// Update movie (admin)
exports.updateMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const updates = req.body;

    const movie = await Movie.findOneAndUpdate({ movieId }, updates, {
      new: true,
      runValidators: true,
    });

    if (!movie) {
      return sendError(res, 404, "Movie not found");
    }

    return sendSuccess(res, 200, "Movie updated successfully", movie);
  } catch (error) {
    return sendError(res, 500, `Error updating movie: ${error.message}`);
  }
};

// Delete movie (admin)
exports.deleteMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    const movie = await Movie.findOneAndDelete({ movieId });

    if (!movie) {
      return sendError(res, 404, "Movie not found");
    }

    return sendSuccess(res, 200, "Movie deleted successfully");
  } catch (error) {
    return sendError(res, 500, `Error deleting movie: ${error.message}`);
  }
};

// Get trailer by TMDb ID
exports.getTrailerByTmdbId = async (req, res) => {
  try {
    const { tmdbId } = req.params;
    const mediaType = req.query.mediaType === "tv" ? "tv" : "movie";
    const apiKey = process.env.TMDB_API_KEY;

    if (!apiKey) {
      return sendError(
        res,
        500,
        "TMDB_API_KEY is not configured on the server",
      );
    }

    const url = `${TMDB_BASE_URL}/${mediaType}/${tmdbId}/videos?api_key=${apiKey}`;
    const response = await fetch(url);
    const payload = await response.json();

if (!response.ok) {
  return sendError(
    res,
    response.status,
    `TMDb request failed with status ${response.status}`,
  );
}

const videos = Array.isArray(payload.results) ? payload.results : [];

const trailer =
  videos.find(v =>
    v.type === "Trailer" &&
    v.site === "YouTube" &&
    v.official === true
  ) ||
  videos.find(v =>
    v.type === "Teaser" &&
    v.site === "YouTube"
  ) ||
  videos.find(v =>
    v.site === "YouTube"
  );

    if (!trailer || !trailer.key) {
      return sendError(res, 404, "No playable trailer found");
    }

    return sendSuccess(res, 200, "Trailer retrieved successfully", {
      key: trailer.key,
      name: trailer.name,
      site: trailer.site,
      type: trailer.type,
      youtubeEmbedUrl: `https://www.youtube.com/embed/${trailer.key}?autoplay=1`,
    });
  } catch (error) {
    return sendError(res, 500, `Error retrieving trailer: ${error.message}`);
  }
};
