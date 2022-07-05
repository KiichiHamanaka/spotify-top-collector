import { SpotifyWebApi } from "spotify-web-api-ts";
import { AuthorizationScope } from "spotify-web-api-ts/types/types/SpotifyAuthorization";

const scopes: AuthorizationScope[] = [
  "user-top-read",
];
const state = "spotify-top-collector";

export const spotifyApi = new SpotifyWebApi({
  redirectUri: process.env.SpotifyRedirectURL,
  clientId: process.env.SpotifyClientID,
  clientSecret: process.env.SpotifyClientSecret,
});

export const authorizeURL = spotifyApi.getRefreshableAuthorizationUrl({
  scope: scopes,
  state,
});
