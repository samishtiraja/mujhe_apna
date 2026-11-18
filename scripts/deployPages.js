import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const distDir = path.join(rootDir, 'dist')

function run(cmd, cwd = rootDir) {
  execSync(cmd, { cwd, stdio: 'inherit' })
}

const remoteUrl = execSync('git config --get remote.origin.url', { cwd: rootDir })
  .toString()
  .trim()

if (!remoteUrl) {
  throw new Error('Could not determine git remote origin URL.')
}

if (!fs.existsSync(distDir)) {
  throw new Error('dist directory does not exist. Run npm run build first.')
}

// Ensure .nojekyll exists so GitHub Pages serves static Vite files directly
fs.writeFileSync(path.join(distDir, '.nojekyll'), '')

const distGitDir = path.join(distDir, '.git')
if (fs.existsSync(distGitDir)) {
  fs.rmSync(distGitDir, { recursive: true, force: true })
}

try {
  console.log(`Deploying dist/ to gh-pages on ${remoteUrl}...`)
  run('git init', distDir)
  run('git add -A', distDir)
  run('git commit -m "Deploy to GitHub Pages"', distDir)
  run(`git push --force "${remoteUrl}" HEAD:gh-pages`, distDir)
  console.log('Successfully deployed to gh-pages!')
} finally {
  if (fs.existsSync(distGitDir)) {
    fs.rmSync(distGitDir, { recursive: true, force: true })
  }
}
