#!/usr/bin/env node
/*
  Starts a local Shiny app using R. Requires R to be installed and available on PATH.

  Env vars:
  - SHINY_APP_DIR: Path to your Shiny app directory (contains app.R or server/ui)
  - SHINY_PORT: Port to run Shiny on (default 6698)
  - SHINY_HOST: Host to bind (default 0.0.0.0)

  Example Windows PowerShell usage:
  $env:SHINY_APP_DIR="C:/path/to/app"; node scripts/start-shiny.js
*/

import { spawn } from 'node:child_process';
import process from 'node:process';
import path from 'node:path';

const appDir = process.env.SHINY_APP_DIR || process.env.npm_config_shiny_app_dir || '';
const port = process.env.SHINY_PORT || process.env.npm_config_shiny_port || '6698';
const host = process.env.SHINY_HOST || '0.0.0.0';

if (!appDir) {
  console.error('[start-shiny] SHINY_APP_DIR is not set.');
  process.exit(1);
}

const rCommand = `shiny::runApp('${appDir.replace(/\\/g, '/')}', host='${host}', port=${Number(port)}, launch.browser=FALSE)`;

console.log(`[start-shiny] Starting Shiny: ${rCommand}`);

const child = spawn('Rscript', ['-e', rCommand], {
  stdio: 'inherit',
  cwd: path.resolve('.'),
  env: process.env,
  shell: false,
});

child.on('exit', (code) => {
  console.log(`[start-shiny] Shiny exited with code ${code}`);
});

process.on('SIGINT', () => {
  child.kill('SIGINT');
  process.exit(0);
});


