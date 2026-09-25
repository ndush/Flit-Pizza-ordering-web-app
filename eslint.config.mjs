import next from 'eslint-config-next/core-web-vitals';

// components/bits is vendored React Bits code, kept as upstream ships it.
const config = [...next, { ignores: ['.next/', '.data/', 'components/bits/'] }];
export default config;
