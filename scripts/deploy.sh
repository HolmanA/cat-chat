#!/bin/bash

if (( $# != 1 )); then
    echo "Must specify a deploy branch"
elif [ "$1" = "stage" ]; then
    echo "Deploying master to stage"
    git merge master stage
elif [ "$2" = "production" ]; then
    echo "Deploying stage to production"
    git merge stage production
else
    echo "Unknow deploy command"
fi