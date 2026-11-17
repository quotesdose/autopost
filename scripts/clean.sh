#!/bin/env bash

clean() {
    directories=(
        "cache"
    )

    rm -rf ${directories[@]}
}

clean
