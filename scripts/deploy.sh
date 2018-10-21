#!/bin/bash

if (( $# != 1 )); then
    echo "Must specify a deploy branch"
elif [ "$1" = "stage" ]; then
    echo "Deploying master to stage"
    git fetch
    git checkout stage
    git merge master
    git push -q https://${GH_TOKEN}@github.com/HolmanA/cat-chat.git/ stage
elif [ "$2" = "production" ]; then
    echo "Deploying stage to production"
    git fetch
    git checkout production
    git merge stage
    git push -q https://${GH_TOKEN}@github.com/HolmanA/cat-chat.git/ production
else
    echo "Unknow deploy command"
fi