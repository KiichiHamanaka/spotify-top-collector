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
                const trackId = parseInt(id as string)
                const track = await prisma.track.findUnique({
                        where: {
                            id:trackId
                        }
                    }
                )
                res.status(200).json(track);
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
