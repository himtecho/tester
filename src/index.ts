import { Command } from 'commander';
import { existsSync, readFileSync } from 'node:fs';
import chalk from 'chalk';

function readEnv(path: string): Map<string, string> {
  if (!existsSync(path)) {
    console.error(`File not found: ${path}`);
    process.exit(1);
  }
  const map = new Map<string, string>();
  const lines = readFileSync(path, 'utf-8')
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#') && line.includes('='));

  for (const line of lines) {
    const i = line.indexOf('=');
    const key = line.slice(0, i).trim();
    const value = line.slice(i + 1).trim();
    map.set(key, value);
  }
  return map;
}

const program = new Command();
program.name('envcheck').description('Compare .env with .env.example').version('0.1.0');

program
  .command('check')
  .option('-e, --env <path>', 'env file', '.env')
  .option('-x, --example <path>', 'example file', '.env.example')
  .option('-s, --strict', 'fail if .env has keys not in example')
  .action((opts) => {
    const env = readEnv(opts.env);
    const example = readEnv(opts.example);

    const missing = [...example.keys()].filter((k) => !env.has(k));
    const extra = [...env.keys()].filter((k) => !example.has(k));
    const empty = [...env.entries()].filter(([, v]) => v === '').map(([k]) => k);


    if (missing.length) console.log(chalk.red('Missing in .env:'), missing.join(', '));
    if (extra.length) console.log(chalk.yellow('Not in .env.example:'), extra.join(', '));
    if (empty.length) console.log(chalk.yellow('Empty values in .env:'), empty.join(', '));
    if (!missing.length && !extra.length && !empty.length) console.log(chalk.green('All good.'));

    const failed = missing.length > 0 || (opts.strict && extra.length > 0);
    process.exit(failed ? 1 : 0);
  });

program.parse();