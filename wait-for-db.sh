#!/bin/sh
/wait-for-it.sh $1 --timeout=$2
shift 2
exec "$@"
