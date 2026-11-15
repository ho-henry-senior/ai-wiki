default:
    @just --list

# Install pinned development tools (requires Node.js 22+ and npm).
setup:
    npm ci

# Test and check the sitemap, Markdown formatting, local links, and style without modifying files.
verify:
    npm run verify

# Regenerate the reader-facing sitemap.
sitemap:
    npm run sitemap

# Check Markdown formatting without modifying files.
format-check:
    npm run format:check

# Fail on pages over STYLE.md length targets, hedge words, or sentences repeated across pages.
style:
    npm run style

# Check local files and heading anchors; excludes external URLs.
links:
    npm run links

# Apply Markdown formatting (modifies files).
format:
    npm run format
