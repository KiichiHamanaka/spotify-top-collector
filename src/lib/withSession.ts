import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import {ironOptions} from "./config";
import {GetServerSidePropsContext, GetServerSidePropsResult, NextApiHandler} from "next";

declare module "iron-session" {
    interface IronSessionData {
        accessToken?: string
    }
}

export function withSessionRoute(handler: NextApiHandler) {
    return withIronSessionApiRoute(handler, ironOptions);
}

export function withSessionSsr<
    P extends { [key: string]: unknown } = { [key: string]: unknown },
    >(
    handler: (
        context: GetServerSidePropsContext,
    ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) {
    return withIronSessionSsr(handler, ironOptions);
}