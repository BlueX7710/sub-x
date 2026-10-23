#!/usr/bin/env bash
# Copies the shared changes in docs/index.html (the website) to the other two copies:
#   - android-app/www/index.html is identical to the website, so it is copied as is
#   - claude-ai/sub-x-cube-timer.html differs (no camera or smart cube, an AI Review tab and no
#     <html> skeleton), so the website's changes since BASE (default HEAD) are applied as a patch
# Hunks that touch website-only parts can't apply; they are listed so you can port them by hand.
set -euo pipefail
cd "$(dirname "$0")/.."
BASE="${1:-HEAD}"
CLAUDE=claude-ai/sub-x-cube-timer.html

cp docs/index.html android-app/www/index.html
echo "Copied docs/index.html to android-app/www/index.html"

if git diff --quiet "$BASE" -- docs/index.html; then
  echo "docs/index.html has no changes since $BASE: nothing to patch into $CLAUDE"
else
  diff_file="$(mktemp)"
  git diff -U3 "$BASE" -- docs/index.html > "$diff_file"
  if patch --forward --no-backup-if-mismatch -p1 -F3 -r "$CLAUDE.rej" "$CLAUDE" < "$diff_file"; then
    echo "Patched $CLAUDE"
  else
    echo "Some hunks did not apply. They are in $CLAUDE.rej: port the shared ones by hand, skip the website-only ones, then delete the .rej file."
  fi
  rm -f "$diff_file"
fi

# the gitignored working copy at the root is the same as the tracked claude.ai copy
cp "$CLAUDE" sub-x-cube-timer.html
