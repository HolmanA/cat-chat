#!/bin/bash

if (( $# != 1 )); then
    echo "Must specify a deploy branch"
elif [ "$1" = "stage" ]; then
    echo "Deploying master to stage"
    git fetch
    git checkout stage
    git merge master
    git push
elif [ "$2" = "production" ]; then
    echo "Deploying stage to production"
    git fetch
    git checkout production
    git merge stage
    git push
else
    echo "Unknow deploy command"
fi