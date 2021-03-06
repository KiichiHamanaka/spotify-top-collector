import { SpotifyWebApi } from "spotify-web-api-ts";
import { AuthorizationScope } from "spotify-web-api-ts/types/types/SpotifyAuthorization";
import {prisma} from "./prisma";

const scopes: AuthorizationScope[] = [
  "user-top-read",
  "user-read-private",
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

export const registrationTop = async (accessToken:string) =>{
  spotifyApi.setAccessToken(accessToken)
  const user = await spotifyApi.users.getMe()
  const name = user.display_name || 'noname'
  const topTracks = await spotifyApi.personalization.getMyTopTracks({limit: 10})
  const topArtists = await spotifyApi.personalization.getMyTopArtists({limit: 10})

  const upsertUser = await prisma.user.upsert({
    create: {
      displayName: name,
      uri: user.uri,
    },
    update: {
      displayName: name,
    },
    where: {
      uri: user.uri
    },
  })

  const createTracks = await prisma.$transaction(
      topTracks.items.map((item) => {
            return prisma.track.upsert({
              create: {uri:item.uri},
              update: {},
              where: {uri: item.uri},
            })
          }
      )
  )

  const createArtists = await prisma.$transaction(
      topArtists.items.map((item) => {
            return prisma.artist.upsert({
              create: {uri:item.uri},
              update: {},
              where: {uri: item.uri},
            })
          }
      )
  )

  const createUserTopTrack = await prisma.userTopTrack.createMany({
    data: createTracks.map((item) => {
      return {
        userId: upsertUser.id,
        trackId: item.id,
      }
    }),
    skipDuplicates: true,
  });

  const createUserTopArtist = await prisma.userTopArtist.createMany({
    data: createArtists.map((item) => {
      return {
        userId: upsertUser.id,
        artistId: item.id,
      }
    }),
    skipDuplicates: true,
  });
  console.log('end')
}