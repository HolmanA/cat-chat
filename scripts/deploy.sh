#!/bin/bash

if (( $# != 1 )); then
    echo "Must specify a deploy branch"
elif [ "$1" = "stage" ]; then
    echo "Deploying master to stage"
    git commit -m "Deploying master to stage"
    git push origin stage
elif [ "$2" = "production" ]; then
    echo "Deploying stage to production"
    git commit -m "Deploying stage to production"
    git push origin production
else
    echo "Unknow deploy command"
fi