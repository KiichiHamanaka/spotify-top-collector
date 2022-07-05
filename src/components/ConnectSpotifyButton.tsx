import Link from "next/link";
import React from "react";

type Props = {
  authorizeURL: string;
};

const ConnectSpotifyButton: React.FC<Props> = ({ authorizeURL }) => {
  return (
    <Link href={authorizeURL} passHref>
      <button>
        Login with Spotify
      </button>
    </Link>
  );
};

export default ConnectSpotifyButton;
