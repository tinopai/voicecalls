# Remove ZIP file if exists
rm voicecalls.zip
# Create the new one
zip -r voicecalls . -x '*.git*' -x 'zip.sh'