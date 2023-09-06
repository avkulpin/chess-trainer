/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
    // https://nextjs.org/docs/advanced-features/compiler here are options
    styledComponents: {
      displayName: true,
    },
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
      {
        source:
          '/stockfish/v15/(stockfish.js|stockfish.wasm|stockfish.worker.js)',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },
};

/* // https://github.com/vercel/next.js/issues/44062#issuecomment-1445185361 */
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

module.exports = nextConfig;
