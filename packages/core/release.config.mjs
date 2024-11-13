/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
    extends: "semantic-release-monorepo",
    ci: false,
    branches: ["main"],
    plugins: [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        [
            "@semantic-release/changelog",
            {
                changelogFile: "./CHANGELOG.md",
                changelogTitle: "# Changelog for @geniux/test-semantic-release-core",
            },
        ],
        "@semantic-release/npm",
        [
            "@semantic-release/git",
            {
                "assets": ["./CHANGELOG.md", "./package.json"],
                "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
            }
        ],
        [
            "@semantic-release/github",
            {
                assets: [
                    { path: "dist/**", label: "Compiled code" },
                ],
            },
        ]
    ]
};