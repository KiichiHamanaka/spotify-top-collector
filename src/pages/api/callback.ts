import { NextApiRequest, NextApiResponse } from "next";
import {spotifyApi} from "../../lib/utils/spotify";
import {getSession} from "../../lib/utils/get-session";

const callback = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession(req, res);
  const { code } = req.query;
  const refreshableUserTokensResponse =
    await spotifyApi.getRefreshableUserTokens(code as string);
  spotifyApi.setAccessToken(refreshableUserTokensResponse.access_token)
  session.accessToken = refreshableUserTokensResponse.access_token;
  res.status(200).redirect("/");
};

export default callback;
