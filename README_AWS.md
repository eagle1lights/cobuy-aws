# CoBuy (AWS Amplify Static)

Framework: Next.js 15 (static export)
Data: IndexedDB via `idb` (local-only)

Deploy on AWS Amplify (Console build)
1. Connect GitHub → pick repo & `main`.
2. Hosting → Build settings → Edit and paste:
version: 1
frontend:
  phases:
    build:
      commands:
        - npm ci || npm install
        - npm run export
  artifacts:
    baseDirectory: out
    files: ['**/*']
  cache:
    paths: ['node_modules/**/*']
