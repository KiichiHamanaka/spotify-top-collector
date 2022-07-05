import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../../lib/utils/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        method,
    } = req;

    switch (method) {
        case "GET": {
            try {
                const user = await prisma.$queryRaw`SELECT * FROM User ORDER BY RAND() LIMIT 1`
                res.status(200).json(user);
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
