import {Suspense} from 'react'
import useSWR from 'swr'
import SpotifyEmbed from "./SpotifyEmbed";
import * as fetcher from "../lib/utils/fetcher";

const RandomTopTrack = () => {
    const { data } = useSWR(`/api/track/`, fetcher.fetchGet);
    return (
        <Suspense fallback={<div>loading...</div>}>
            {data ? <SpotifyEmbed uri={data.uri}/> : "no data"}
        </Suspense>
    );
};

export default RandomTopTrack;
