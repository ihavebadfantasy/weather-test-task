#!/bin/bash

set -e

# Wait for the PostgreSQL service to be available
/wait-for-it.sh $1 --timeout=60 --strict -- echo "Database is ready!"

# Execute the command passed as arguments
exec "${@:2}"
