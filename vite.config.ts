import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

const spiderPeopleDirectory = resolve(process.cwd(), 'spider-people')
const spiderPeopleEntries = Object.fromEntries(
  readdirSync(spiderPeopleDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => [
      'spider-' + entry.name,
      resolve(spiderPeopleDirectory, entry.name, 'index.html'),
    ]),
)

export default defineConfig({
  plugins: [svelte()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(process.cwd(), 'index.html'),
        into: resolve(process.cwd(), 'films/into-the-spider-verse/index.html'),
        across: resolve(process.cwd(), 'films/across-the-spider-verse/index.html'),
        beyond: resolve(process.cwd(), 'films/beyond-the-spider-verse/index.html'),
        ...spiderPeopleEntries,
      },
    },
  },
})
