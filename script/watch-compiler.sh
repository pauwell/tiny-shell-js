#!bin/bash
set -e

# Create empty static/compiler-bundle.js if it doesnt exist.
[ -f ../static/compiler-bundle.js ] || ((mkdir ../static || true) && touch ../static/compiler-bundle.js && echo "static/compiler-bundle.js created!")

# Run watchify on tiny-compiler.
watchify ../tiny-compiler.js -o ../static/compiler-bundle.js