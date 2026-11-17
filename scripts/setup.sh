#!/bin/env bash

setup() {
    checkpoint() {
        if ! command -v git >/dev/null 2>&1; then
            echo "Git is not installed"
            exit 1
        fi

        if ! command -v node >/dev/null 2>&1; then
            echo "Node is not installed"
            exit 1
        fi
    }

    dependencies() {
        if [[ ! -d node_modules ]]; then
            read -r -p "Dependencies not found. Install them? [Y/N] " answer
            case "$answer" in
                [Yy])
                    npm install
                    ;;
                *)
                    exit 1
                    ;;
            esac
        fi
    }

    hooks() {
        if [[ -d ".git" ]]; then
            husky
        else
            read -r -p "Git repo not found. Initialize one? [Y/N] " answer
            case "$answer" in
                [Yy])
                    git init
                    husky
                    ;;
                *)
                    echo "Initialization skipped"
                    ;;
            esac
        fi
    }

    credentials() {
        name=$(git config --global user.name)

        if [[ -n "$name" ]]; then
            echo "Git name: $name"
            read -r -p "Update name? [Y/N] " answer
            [[ "$answer" =~ ^[Yy]$ ]] && read -r -p "Enter Git name: " name
        else
            read -r -p "Enter Git name: " name
        fi

        [[ -n "$name" ]] && git config --global user.name "$name"

        email=$(git config --global user.email)

        if [[ -n "$email" ]]; then
            echo "Git email: $email"
            read -r -p "Update email? [Y/N] " answer
            [[ "$answer" =~ ^[Yy]$ ]] && read -r -p "Enter Git email: " email
        else
            read -r -p "Enter Git email: " email
        fi

        [[ -n "$email" ]] && git config --global user.email "$email"
    }

    checkpoint
    dependencies
    hooks
    credentials
    echo
}

setup
