import {spotifyApi} from "../../lib/utils/spotify";
import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../lib/utils/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        method,
    } = req;
    switch (method) {
        case "PUT": {
            try {
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

                console.dir(createUserTopTrack, {depth:null})
                console.dir(createUserTopArtist, {depth:null})

                res.status(200).redirect("/");
                break;
            } catch (e) {
                break;
            }
        }
        default: {
            res.status(403).end();
        }
    }
};

export default handler;
