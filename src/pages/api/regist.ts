import {registrationTop} from "../../lib/utils/spotify";
import {NextApiRequest, NextApiResponse} from "next";
import {withSessionRoute} from "../../lib/withSession";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        method,
    } = req;
    switch (method) {
        case "PUT": {
            try {
                if(req.session.accessToken){
                    await registrationTop(req.session.accessToken);
                }
                res.status(200).end();
                break;
            } catch (e) {
                console.log(e)
                res.status(400).end();
                break;
            }
        }
        default: {
            res.status(403).end();
        }
    }
};

export default withSessionRoute(handler);