import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { IGame, IGameById, IGameQuery } from "../../types/games.types";
import { transformData } from "../../utils/transformData";

const API_URL = "https://free-to-play-games-database.p.rapidapi.com/api/";
const API_HEADERS = {
  // "X-RapidAPI-Key": "44f8c92470mshcb16ce674b1f147p120d90jsnc5a8ee03ee45",
  "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
};

export const gamesApi = createApi({
  reducerPath: "gamesApi",
  baseQuery: retry(
      fetchBaseQuery({
        baseUrl: API_URL,
        headers: API_HEADERS,
      }),
      { maxRetries: 3 }
  ),
  endpoints: (builder) => ({
    getGames: builder.query<IGame[], Partial<IGameQuery>>({
      query: ({ platform, category, sortBy }) => {
        let queryString = "/games";
        if (platform || category || sortBy) {
          queryString += "?";
          if (platform) queryString += `platform=${platform}&`;
          if (category) queryString += `category=${category}&`;
          if (sortBy) queryString += `sort-by=${sortBy}&`;
        }
        return queryString;
      },
      transformResponse: (response: IGame[]) => {
        if (Array.isArray(response)) {
          return response.map((item) => {
            item.release_date = transformData(item.release_date);
            return item;
          });
        } else {
          return [];
        }
      },
    }),
    getGameById: builder.query<IGameById, string | number>({
      query: (id) => `game?id=${id}`,
      transformResponse: (response: IGameById) => {
        return { ...response, release_date: transformData(response.release_date) };
      },
    }),
  }),
});

export const { useGetGamesQuery, useGetGameByIdQuery } = gamesApi;
