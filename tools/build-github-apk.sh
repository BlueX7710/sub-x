#!/usr/bin/env bash
# Builds the APK for GitHub Releases. It's the same app as the Google Play one, but its user agent also says
# "SubXGitHub/<version>", so the site knows Google Play Billing can't work in it and sends people to the website to
# subscribe to Sub-X Pro instead. Signed with the usual debug key, so it installs over the last GitHub APK.
#   bash tools/build-github-apk.sh        → android-app/Sub-X.apk (attach it to the GitHub release)
# Needs JAVA_HOME and ANDROID_HOME (on the owner's PC both are in %LOCALAPPDATA%\SubXBuild; this sets them if unset).
set -euo pipefail
cd "$(dirname "$0")/../android-app"
CFG=capacitor.config.json
if [ -z "${JAVA_HOME:-}" ]; then export JAVA_HOME="$(dirname "$(dirname "$(ls -d "$LOCALAPPDATA"/SubXBuild/jdk/*/bin/java.exe "$LOCALAPPDATA"/SubXBuild/jdk/bin/java.exe 2>/dev/null | head -1)")")"; fi
if [ -z "${ANDROID_HOME:-}" ]; then export ANDROID_HOME="$LOCALAPPDATA/SubXBuild/android-sdk"; fi
[ -d node_modules ] || npm ci

ver=$(node -p "require('./$CFG').appendUserAgent.match(/SubX\/([\d.]+)/)[1]")
cp "$CFG" "$CFG.play"
restore() { mv -f "$CFG.play" "$CFG"; npx cap sync android > /dev/null; }   # put the Play settings back
trap restore EXIT
node -e "
const fs = require('fs'), c = JSON.parse(fs.readFileSync('$CFG', 'utf8'));
c.appendUserAgent = 'SubX/$ver SubXGitHub/$ver';
fs.writeFileSync('$CFG', JSON.stringify(c, null, 2) + '\n');"
npx cap sync android
(cd android && ./gradlew assembleDebug --console=plain)
cp android/app/build/outputs/apk/debug/app-debug.apk Sub-X.apk
echo "Built android-app/Sub-X.apk (user agent: SubX/$ver SubXGitHub/$ver)"
