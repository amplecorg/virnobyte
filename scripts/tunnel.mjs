import { startTunnel } from 'untun';

async function main() {
  const tunnel = await startTunnel({
    port: 4321,
  });
  const url = await tunnel.getURL();
  console.log('\n========================================');
  console.log(`🚀 LIVE CLIENT DEMO URL: ${url}`);
  console.log('========================================\n');
  
  // Keep process alive indefinitely
  setInterval(() => {}, 1000 * 60 * 60);
}

main().catch((err) => {
  console.error('Failed to start tunnel:', err);
  process.exit(1);
});
