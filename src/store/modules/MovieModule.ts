import ApiService from "@/core/services/ApiService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface Movie {
  adult: Boolean;
  backdrop_path: string;
  genre_ids: Array;
  id: Number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: Number;
  poster_path: string;
  release_date: string;
  title: string;
  video: Boolean;
  vote_average: Number;
  vote_count: Number;
}

export interface MovieInfo {
  errors: Array<string>;
  movies: any;
}

@Module
export default class MovieModule extends VuexModule {
  errors = [];
  movies = null;
  movie = null;
  genres = [];
  credits = [];

  /**
   * Get movies array
   * @returns array
   */
  get getMovies() {
    return this.movies;
  }

  /**
 * Get movie object
 * @returns object
 */
  get getMovie(): any {
    return this.movie;
  }

  /**
* Get movie object
* @returns object
*/
  get getCredits(): any {
    return this.credits;
  }

  /**
 * Get movies array
 * @returns array
 */
  get getGenres(): Movie[] {
    return this.genres;
  }

  /**
   * Get movies errors
   * @returns array
   */
  get getErrors(): Array<string> {
    return this.errors;
  }

  @Mutation
  [Mutations.SET_ERROR](error: never[]) {
    this.errors = error;
  }

  @Mutation
  [Mutations.SET_MOVIES](movies: Movie[]) {
    this.movies = movies;
  }

  @Mutation
  [Mutations.SET_MOVIE](movie: any) {
    this.movie = movie;
  }

  @Mutation
  [Mutations.SET_MOVIE_CREDITS](payload: any) {
    this.credits = payload;
  }


  @Mutation
  [Mutations.SET_GENRES](payload: any) {
    this.genres = payload;
  }


  @Action
  [Actions.GET_MOVIES](payload) {
    return new Promise<void>((resolve, reject) => {
      ApiService.query(`discover/movie`, {
        params: payload
      })
        .then(({ data }) => {
          this.context.commit(Mutations.SET_MOVIES, data);
          resolve();
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR, response.data.errors);
          reject();
        });
    });
  }

  @Action
  [Actions.GET_MOVIE](id) {
    return new Promise<void>((resolve, reject) => {
      ApiService.get(`movie/${id}`)
        .then(({ data }) => {
          this.context.commit(Mutations.SET_MOVIE, data);
          resolve();
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR, response.data.errors);
          reject();
        });
    });
  }

  @Action
  [Actions.GET_MOVIE_CREDITS](id) {
    return new Promise<void>((resolve, reject) => {
      ApiService.get(`movie/${id}/credits`)
        .then(({ data }) => {
          this.context.commit(Mutations.SET_MOVIE_CREDITS, data.cast);
          resolve();
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR, response.data.errors);
          reject();
        });
    });
  }

  @Action
  [Actions.GET_GENRES]() {
    return new Promise<void>((resolve, reject) => {
      ApiService.get("genre/movie/list")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_GENRES, data.genres);
          resolve();
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR, response.data.errors);
          reject();
        });
    });
  }


  @Action
  [Actions.SEND_RATE](payload) {
    return new Promise<void>((resolve, reject) => {
      ApiService.post(`movie/${payload.id}/rating`, payload)
        .then(({ data }) => {
          // return data;
          console.log("data", data);

          resolve();
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR, response.data.errors);
          reject();
        });
    });
  }
}
