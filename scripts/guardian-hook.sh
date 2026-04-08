#!/bin/bash

# Project Claudia Vanguard | Guardian Middleman
# Directed by Anson (@ansonsaju)

echo "🛡️ Claudia Vanguard is scanning your push..."

# 1. Fetch changed files relative to target branch
FILES_TO_SCAN=$(git diff --name-only origin/main | grep -E '\.(js|py|go|rs)$')

if [ -z "$FILES_TO_SCAN" ]; then
    echo "✅ No relevant code changes. Allowing push."
    exit 0
fi

# 2. Run Headless Claudia Scan
# We pass the list of files to the CLI for the Adversarial Gauntlet
node core/claudia-cli.js --diff "$FILES_TO_SCAN"

# 3. Handle Exit Codes
SCAN_RESULT=$?

if [ $SCAN_RESULT -eq 0 ]; then
    echo "✅ Project Claudia Certified this push. Safe to merge."
    exit 0
else
    echo "❌ CLAUDIA BLOCKED THIS PUSH!"
    echo "Critical security flaws or non-deterministic code detected."
    echo "Please visit the Claudia Dashboard (http://localhost:8001) to review the Certified Diffs."
    exit 1
fi
