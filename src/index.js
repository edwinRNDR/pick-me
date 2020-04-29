const core = require('@actions/core');
const github = require('@actions/github');

const run = async () => {
    // Get octokit
    const gitHubToken = core.getInput('repo-token', { required: true });
    const octokit = new github.GitHub(gitHubToken);

    // Get repo and issue info
    const { repository, issue } = github.context.payload;

    const commentUser = github.context.payload.comment.user.login;
    const commentBody = github.context.payload.comment.body;

    if (commentBody.includes("pick me")) {
        if (!issue) {
            throw new Error(`Couldn't find issue info in current context`);
        }
        const [owner, repo] = repository.full_name.split('/');
        // Get issue assignees
        const assigneesString = commentUser
        const assignees = assigneesString
            .split(',')
            .map((assigneeName) => assigneeName.trim());

        // Assign issue
        console.log(
            `Assigning issue ${issue.number} to users ${JSON.stringify(assignees)}`
        );
        try {
            await octokit.issues.addAssignees({
                owner,
                repo,
                issue_number: issue.number,
                assignees
            });
        } catch (error) {
            core.setFailed(error.message);
        }
    }
};

try {
    run();
} catch (error) {
    core.setFailed(error.message);
}
