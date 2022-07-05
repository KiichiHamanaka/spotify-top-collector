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
                const userId = parseInt(id as string)
                const user = await prisma.user.findUnique({
                        where: {
                            id:userId
                        }
                    }
                )
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
