# Contributing to webext-keyboard-shortcuts

Thanks for your interest in contributing. This document covers the basics.

GETTING STARTED

1. Fork the repository on GitHub
2. Clone your fork locally
3. Install dependencies with npm install
4. Create a branch for your changes

DEVELOPMENT

Build the project with npm run build. Run tests with npm test. Make sure both pass before submitting a pull request.

The source lives in src/ and compiles to dist/ via TypeScript. Do not commit the dist/ folder.

PULL REQUESTS

- Keep changes focused. One feature or fix per pull request.
- Write clear commit messages that describe what changed and why.
- Add tests for new functionality when possible.
- Make sure the build passes and there are no TypeScript errors.

REPORTING ISSUES

Open an issue on GitHub with a clear description of the problem. Include the browser, extension manifest version, and steps to reproduce if applicable.

CODE STYLE

- TypeScript strict mode is enabled
- Keep functions small and focused
- Use descriptive variable names
- Avoid unnecessary dependencies

LICENSE

By contributing you agree that your contributions will be licensed under the MIT License.
