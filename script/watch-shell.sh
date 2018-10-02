#!bin/bash
set -e

# Create empty static/shell-bundle.js if it doesnt exist.
[ -f ../static/shell-bundle.js ] || ((mkdir ../static || true) && touch ../static/shell-bundle.js && echo "static/shell-bundle.js created!")

# Run watchify on tiny-shell.
watchify ../tiny-shell.js -o ../static/shell-bundle.js