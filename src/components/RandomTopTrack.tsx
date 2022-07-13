import React, { Suspense, Component, ErrorInfo, ReactNode } from "react";
import useSWR from 'swr'
import SpotifyEmbed from "./SpotifyEmbed";
import * as fetcher from "../lib/utils/fetcher";
import {TailSpin} from "react-loader-spinner";
import { css } from '@emotion/react'

const randomTopTrackTheme = css({
});

const RandomTopTrack = () => {
    const { data } = useSWR(`/api/track/`, fetcher.fetchGet);
    return (
        <GetTrackErrorBoundary>
            <Suspense fallback={<TailSpin ariaLabel="loading-indicator"/>}>
                {data !== undefined && data.length !== 0 ? <SpotifyEmbed uri={data.uri}/> : (
                    <div css={randomTopTrackTheme}>
                        <div>no data</div>
                        <SpotifyEmbed />
                    </div>
                )}
            </Suspense>
        </GetTrackErrorBoundary>
    );
};

type Props = {
    children?: ReactNode;
}

type State = {
    hasError: boolean;
}

class GetTrackErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(e: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return <SpotifyEmbed/>
        }

        return this.props.children;
    }
}

export default RandomTopTrack;
