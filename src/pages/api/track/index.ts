import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../../lib/utils/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        method,
    } = req;

    switch (method) {
        case "GET": {
            try {
                console.log('call random track Get')
                const track = await prisma.$queryRaw`SELECT * FROM Track ORDER BY RAND() LIMIT 1`
                console.log(track)
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
