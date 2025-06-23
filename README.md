# Zenfi JavaScript SDK

![](https://img.shields.io/github/actions/workflow/status/zenfi/js-sdk-apps/tests.yml?branch=main)
![](https://img.shields.io/badge/license-MIT-blue?style=flat)

This repo contains implementations of the [Zenfi JavaScript SDK](https://github.com/zenfi/js-sdk).

## Usage

Add the script in your HTML, before the closing `</header>` tag. For example:

```html
<script defer src="https://cdn.jsdelivr.net/gh/zenfi/js-sdk-apps@amex-v1.0.0/dist/amex/index.js"></script>
```

## Testing

1. Open the site you are going to test from Zenfi, to get a URL with a `zftoken` query parameter.
2. Copy the URL and open it in the browser.
3. Open the developer tools and go to the console.
4. Declare the following function:

```js
function addScript( src ) {
  var s = document.createElement('script');
  s.setAttribute('src', src);
  document.body.appendChild( s );
}
```

5. Call the function with the URL of the script:

```js
addScript('https://cdn.jsdelivr.net/gh/zenfi/js-sdk-apps@amex-1.0.1/dist/amex/index.js');
```

## License

MIT
