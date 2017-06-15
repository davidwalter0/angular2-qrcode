// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.


export const environment = {
  production: false,
  TESTING: true,
  // required HTTP attribute, disable TLS by turning it off
  HTTPS: true,
  // if using tls/https, the hostname must match certs or you'll fight
  // with browser cert acceptance
  QRCODE_GENERATOR_HOST: "example.com",
  QRCODE_GENERATOR_PORT: "8443",
  ISSUER: "example.com"
};
