/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
    // https://nextjs.org/docs/advanced-features/compiler here are options
    styledComponents: {
      displayName: true,
    },
  },
};

/* // https://github.com/vercel/next.js/issues/44062#issuecomment-1445185361 */
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

module.exports = nextConfig;
