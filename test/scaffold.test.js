import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { execFileSync } from 'child_process'
import fs from 'fs'
import os from 'os'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const cli = path.join(root, 'node_modules', '@nera-static', 'nera', 'bin', 'nera.js')

const TIMEOUT = 120_000

let tmp

beforeAll(() => {
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'nera-starter-blank-'))
})

afterAll(() => {
    fs.rmSync(tmp, { recursive: true, force: true })
})

const nera = (args, cwd) =>
    execFileSync(process.execPath, [cli, ...args], {
        cwd,
        encoding: 'utf-8',
        stdio: 'pipe',
    })

// Scaffold `name` from this repo with the devDependency CLI, offline: a
// local starter path is read in place and --no-install skips npm. The site
// then resolves @nera-static/nera from this repo's node_modules.
function scaffold(name, extra = []) {
    nera(['new', name, '--starter', root, '--yes', '--no-install', ...extra], tmp)
    const site = path.join(tmp, name)
    fs.symlinkSync(path.join(root, 'node_modules'), path.join(site, 'node_modules'), 'dir')
    return site
}

const read = (site, file) => fs.readFileSync(path.join(site, file), 'utf-8')

function expectCleanBuild(site) {
    const out = nera(['build', '--check'], site)
    expect(out).toContain('No problems found')
    expect(out).not.toMatch(/\d+ error\(s\), \d+ warning\(s\)/)

    const json = JSON.parse(nera(['build', '--check', '--json'], site))
    expect(json).toEqual({ ok: true, results: [] })

    for (const page of ['index.html', 'imprint.html', 'privacy.html']) {
        expect(fs.existsSync(path.join(site, 'public', page))).toBe(true)
    }

    expect(nera(['validate'], site)).toContain('No problems found')
    expect(JSON.parse(nera(['validate', '--json'], site))).toEqual({ ok: true, results: [] })
}

describe('nera new --starter <this repo>', () => {
    it('scaffolds a site that builds, checks and validates clean', () => {
        const site = scaffold('site')
        expectCleanBuild(site)

        const html = read(site, 'public/index.html')
        expect(html).toContain('<a class="skip-link" href="#main">Skip to content</a>')
        expect(html).toContain('<main id="main">')
        expect(html).toContain('<a href="/imprint.html">Imprint</a>')
        expect(html).toContain('<a href="/privacy.html">Privacy</a>')
        expect(html).not.toMatch(/<script|<link[^>]+stylesheet/)
    }, TIMEOUT)

    it('keeps the site\'s own package.json and dependencies', () => {
        const pkg = JSON.parse(read(path.join(tmp, 'site'), 'package.json'))
        expect(pkg.name).toBe('site')
        expect(pkg.dependencies).toHaveProperty('@nera-static/nera')
        expect(Object.keys(pkg.dependencies)).toEqual(['@nera-static/nera'])
    })

    it('copies only the starter folders into the site', () => {
        const site = path.join(tmp, 'site')
        for (const file of [
            'README.md', 'CHANGELOG.md', 'LICENSE', 'eslint.config.js',
            'package-lock.json', 'test', '.github', '.husky', 'plans',
        ]) {
            expect(fs.existsSync(path.join(site, file)), file).toBe(false)
        }
        for (const file of [
            'pages/index.md', 'pages/imprint.md', 'pages/privacy.md',
            'theme/views/layouts/layout.pug', 'theme/views/pages/default.pug',
        ]) {
            expect(read(site, file)).toBe(fs.readFileSync(path.join(root, file), 'utf-8'))
        }
    })

    it('applies --name and --lang and still builds clean', () => {
        const site = scaffold('site-de', ['--name', 'Brot & Zeit', '--lang', 'de'])
        const app = read(site, 'config/app.yaml')
        expect(app).toMatch(/^name: "Brot & Zeit"$/m)
        expect(app).toMatch(/^lang: de$/m)
        expect(app).toMatch(/^ {2}de:\n(?: {4}.+\n)*? {4}imprint: Imprint$/m)
        expect(app).not.toMatch(/^theme:/m)

        expectCleanBuild(site)
        const html = read(site, 'public/index.html')
        expect(html).toContain('<html lang="de">')
        expect(html).toContain('<title>Home | Brot &amp; Zeit</title>')
    }, TIMEOUT)
})
