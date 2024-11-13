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
                    headerPattern: /^(\w*)(?:\((.*)\))?!?: (.*)$/,
                    headerCorrespondence: ["type", "scope", "subject"],
                    noteKeywords: ["BREAKING CHANGE"],
                    types: [
                        { type: "feat", section: "Features" },
                        { type: "fix", section: "Bug Fixes" },
                        { type: "chore", section: "Chores" },
                        { type: "docs", section: "Documentation" },
                        { type: "style", section: "Styles" },
                        { type: "refactor", section: "Code Refactoring" },
                        { type: "perf", section: "Performance Improvements" },
                        { type: "test", section: "Tests" }
                    ]
                },
                writerOpts: {
                    headerPartial: `## {{version}} - {{date}}\n`,
                    transform: (commit, context) => {
                        commit.version = context.version;
                        commit.date = context.date;
                        return commit;
                    },
                }
            }
        ],
        "@semantic-release/release-notes-generator",
        [
            "@semantic-release/changelog",
            {
                changelogFile: "./CHANGELOG.md",
                changelogTitle: "# Changelog for @geniux/test-semantic-release-core",
            },
        ],
        // "@semantic-release/npm",
        // [
        //     "@semantic-release/git",
        //     {
        //         "assets": ["./CHANGELOG.md", "./package.json"],
        //         "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
        //     }
        // ],
        // [
        //     "@semantic-release/github",
        //     {
        //         assets: [
        //             { path: "dist/**", label: "Compiled code" },
        //         ],
        //     },
        // ]
    ]
};