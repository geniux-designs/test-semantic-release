/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
    extends: "semantic-release-monorepo",
    ci: false,
    branches: ["main"],
    plugins: [
        "@semantic-release/commit-analyzer",
        [
            "@semantic-release/release-notes-generator",
            {
                preset: "conventionalcommits",
                presetConfig: {
                    types: [
                        { type: "feat", section: "🚀 Features" },
                        { type: "fix", section: "🐞 Bug Fixes" },
                        { type: "docs", section: "📝 Documentation" },
                        { type: "style", section: "💅 Code Style" },
                        { type: "refactor", section: "♻️ Code Refactoring" },
                        { type: "perf", section: "⚡ Performance Improvements" },
                        { type: "test", section: "🧪 Tests" },
                        { type: "build", section: "📦 Build System" },
                        { type: "ci", section: "🔧 Continuous Integration" },
                        { type: "chore", section: "📌 Chores" },
                        { type: "revert", section: "⏪ Reverts" },
                        { type: "BREAKING CHANGE", section: "💥 Breaking Changes" },
                    ],
                },
                writerOpts: {
                    headerPartial: `## {{version}}`, // This controls the version title format in the changelog
                },
            },
        ],
        [
            "@semantic-release/changelog",
            {
                changelogFile: "./CHANGELOG.md",
                changelogTitle: "# Changelog for\n\n @geniux/test-semantic-release-react",
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
                changelogTitle: (version, releaseDate) => {
                    // Extract the version by stripping everything out up to the last dash
                    const cleanVersion = version.split('-').pop();
                    return `v${cleanVersion} - ${releaseDate}`;
                }
            },
        ]
    ]
};