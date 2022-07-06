import { NextApiRequest, NextApiResponse } from "next";
import {spotifyApi} from "../../lib/utils/spotify";
import {withSessionRoute} from "../../lib/withSession";

const callback = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query;
  const refreshableUserTokensResponse =
    await spotifyApi.getRefreshableUserTokens(code as string);
  spotifyApi.setAccessToken(refreshableUserTokensResponse.access_token)
  req.session.accessToken = refreshableUserTokensResponse.access_token
  await req.session.save();
  res.status(200).redirect("/");
};

export default withSessionRoute(callback);