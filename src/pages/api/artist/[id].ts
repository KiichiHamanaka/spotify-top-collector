import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../../lib/utils/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: {id},
        method,
    } = req;
    switch (method) {
        case "GET": {
            try {
                const artistId = parseInt(id as string)
                const artist = await prisma.artist.findUnique({
                        where: {
                            id:artistId
                        }
                    }
                )
                res.status(200).json(artist);
                break;
            } catch (e) {
                console.error(e);
                break;
            }
        }
        default: {
            res.status(403).end();
        }
    }
};

export default handler;
