#!/bin/bash

set -e

PACKAGE_NAME=$(npm pkg get dependencies.database-entity-service-lib | tr -d '"')

echo "Updating database-entity-service-lib..."
# shellcheck disable=SC2086
npm install $PACKAGE_NAME

echo "Generating migration..."
timestamp=$(date +%Y%m%d%H%M%S)
npm run migration:generate -- "./migrations/Migration${timestamp}"

echo "Running migrations..."
npm run migration:run

echo "Update and migration completed successfully"