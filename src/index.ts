import { Command } from 'commander';
import { existsSync, readFileSync } from 'node:fs';

function readKeys(path: string): Set<string> {
  if (!existsSync(path)) {
    console.error(`File not found: ${path}`);
    process.exit(1);
  }
  const keys = readFileSync(path, 'utf-8')
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#') && line.includes('='))
    .map((line) => line.split('=')[0].trim());
  return new Set(keys);
}

const program = new Command();
program.name('envcheck').description('Compare .env with .env.example').version('0.1.0');

program
  .command('check')
  .option('-e, --env <path>', 'env file', '.env')
  .option('-x, --example <path>', 'example file', '.env.example')
  .option('-s, --strict', 'fail if .env has keys not in example')
  .action((opts) => {
    const env = readKeys(opts.env);
    const example = readKeys(opts.example);

    const missing = [...example].filter((k) => !env.has(k));
    const extra = [...env].filter((k) => !example.has(k));

    if (missing.length) console.log('Missing in .env:', missing.join(', '));
    if (extra.length) console.log('Not in .env.example:', extra.join(', '));
    if (!missing.length && !extra.length) console.log('All good.');

    const failed = missing.length > 0 || (opts.strict && extra.length > 0);
    process.exit(failed ? 1 : 0);
  });

program.parse();