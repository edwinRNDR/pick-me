# GitHub action that auto-assigns issues to users

## Inputs

| Parameter   | Required | Description                                                                |
| ----------- | -------- | -------------------------------------------------------------------------- |
| `assignees` | true     | Comma separated list of user names. Issue will be assigned to those users. |

## Example usage

Here's an example flow that auto-assigns all new issues to the `octocat` user:

```yml
name: Issue assignment

on:
  issue_comment:
    types: [created, edited]
jobs:
    auto-assign:
        runs-on: ubuntu-latest
        steps:
            - name: 'Auto-assign issue'
              uses: edwinRNDR/pick-me@latest
              with:
                  repo-token: ${{ secrets.GITHUB_TOKEN }}
```