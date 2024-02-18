#!/bin/bash
# Script to make oclif works with workspaces and local repos

# Bundle app with @repo/core
npx tsup

rm -rf ./artifacts

# Create a temporary directory
mkdir ./tmp

# Copy bin, dist, and package.build.json to the temporary directory
cp -r ./bin ./dist ./package.build.json ./tmp/

# Rename package.cli.json to package.json inside the temporary directory
mv ./tmp/package.build.json ./tmp/package.json

# Change directory to the temporary directory
cd ./tmp

# Install deps
npm install

# Create manifest
npx oclif manifest

# Run npm pack in the temporary directory
npx oclif pack tarballs --no-xz --parallel

mkdir ../artifacts

# Copy all files matching the pattern dist/*.tar.* to the ../build directory
cp ./dist/*.tar.* ../artifacts

# Cleanup: Remove the temporary directory
cd ..
rm -rf ./tmp
