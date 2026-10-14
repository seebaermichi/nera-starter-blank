import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf-8'))

// What `nera new --starter` copies into a site (nera-cli/src/starter.js).
const STARTER_ENTRIES = ['pages', 'config', 'theme', 'assets', 'plugins', '.neraignore']

describe('package.json starter contract', () => {
    it('names the starter with a label and a description', () => {
        expect(pkg.nera.starter.label).toBe('Blank')
        expect(typeof pkg.nera.starter.description).toBe('string')
        expect(pkg.nera.starter.description.trim()).not.toBe('')
        expect(pkg.description.trim()).not.toBe('')
    })

    it('is found by the starter search', () => {
        expect(pkg.keywords).toContain('nera-starter')
    })

    it('has no runtime dependencies', () => {
        expect(pkg.dependencies ?? {}).toEqual({})
        expect(pkg.peerDependencies).toBeUndefined()
        expect(pkg.optionalDependencies).toBeUndefined()
    })

    it('has no lifecycle scripts besides prepare', () => {
        const lifecycle = [
            'preinstall', 'install', 'postinstall', 'prepublish',
            'preprepare', 'postprepare', 'prepublishOnly', 'prepack', 'postpack',
            'publish', 'postpublish',
        ]
        const scripts = Object.keys(pkg.scripts ?? {})
        expect(scripts.filter((s) => lifecycle.includes(s))).toEqual([])
        expect(pkg.scripts.prepare).toBe('husky')
    })

    it('ships exactly the starter folders that exist, plus the changelog', () => {
        const existing = STARTER_ENTRIES.filter((e) => fs.existsSync(path.join(root, e)))
        expect([...pkg.files].sort()).toEqual([...existing, 'CHANGELOG.md'].sort())
    })

    it('uses no theme', () => {
        const app = fs.readFileSync(path.join(root, 'config', 'app.yaml'), 'utf-8')
        expect(app).not.toMatch(/^theme:/m)
    })
})
