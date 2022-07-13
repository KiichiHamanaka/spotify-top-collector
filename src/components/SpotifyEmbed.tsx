import {HTMLAttributes} from 'react';

interface SpotifyProps extends HTMLAttributes<HTMLIFrameElement> {
    [key: string]: any;

    uri?: string;
    wide?: boolean;
    width?: number | string;
    height?: number | string;
    frameBorder?: number | string;
    allow?: string;
}

const SpotifyEmbed = ({
                          uri = "/track/4cOdK2wGLETKBW3PvgPWqT",
                          style = {},
                          wide = false,
                          width = wide ? '100%' : 300,
                          height = wide ? 80 : 380,
                          frameBorder = 0,
                          allow = 'encrypted-media',
                          ...props
                      }: SpotifyProps) => {
    return (
        <iframe
            title="Spotify Web Player"
            src={`https://open.spotify.com/embed${uri}`}
            width={width}
            height={height}
            frameBorder={frameBorder}
            allow={allow}
            style={{
                borderRadius: 8,
                ...style,
            }}
            {...props}
        />
    );
};

export default SpotifyEmbed;