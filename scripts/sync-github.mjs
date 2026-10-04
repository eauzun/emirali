import { writeFile } from 'node:fs/promises';

// This command is optional. A complete, checked snapshot ships with the site.
const username = 'eauzun';
const repositories = [];
let next = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated&type=owner`;
while (next) {
  const response = await fetch(next, {
    headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'EmiraliPortfolio' },
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`GitHub returned ${response.status}. The previous snapshot is unchanged.`);
  const rows = await response.json();
  if (!Array.isArray(rows)) throw new Error('Unexpected GitHub response. The previous snapshot is unchanged.');
  repositories.push(...rows.map(repo => ({
    name: repo.name,
    url: repo.html_url,
    description: repo.description || '',
    language: repo.language || '—',
    fork: Boolean(repo.fork),
    stars: repo.stargazers_count,
    homepage: repo.homepage || '',
  })));
  const nextLink = response.headers.get('link')?.match(/<([^>]+)>; rel="next"/);
  next = nextLink?.[1] || '';
  if (next && new URL(next).origin !== 'https://api.github.com') throw new Error('Unexpected pagination origin.');
}
await writeFile(new URL('../src/data/github.json', import.meta.url), JSON.stringify({ syncedAt: new Date().toISOString().slice(0, 10), repositories }, null, 2) + '\n');
console.log(`Updated ${repositories.length} public repositories. Run npm run build to publish the refreshed index.`);
