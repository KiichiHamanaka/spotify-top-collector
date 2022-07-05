import nextSession from "next-session";

export type AppSession = {
    accessToken?: string;
};

type NextSessionInstance = ReturnType<typeof nextSession>;
type GetSessionArgs = Parameters<NextSessionInstance>;
type GetSessionReturn = Pick<Awaited<ReturnType<NextSessionInstance>>, 'cookie' | 'id'>;

export const getSession: (
    ...args: GetSessionArgs
) => Promise<GetSessionReturn & AppSession> = nextSession();