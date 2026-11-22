#!/bin/env bash

post() {
    platforms=(
        "platforms/bluesky.js"
        "platforms/mastodon.js"
        "platforms/pixelfed.js"
        "platforms/tumblr.js"
    )

    arguments=(
        "--use-env-proxy"
    )

    for platform in ${platforms[@]}; do
        # node ${arguments[@]} $platform
        node $platform
    done
}

post
