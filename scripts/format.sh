#!/bin/env bash

shopt -s globstar

format() {
    echo "Formatting JavaScript files with Prettier..."
    npx prettier --write **/*.{js,mjs}
    echo ""
    echo "Formatting YAML files with Prettier..."
    npx prettier --write **/*.yml
    echo ""
}

format
