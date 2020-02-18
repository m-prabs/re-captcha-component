# captcha-provider[WIP]

Provides a way for captcha validation inside Web Components

# Run Locally

```
npm i
npm start
```

# Inside your component, use below

```
<sn-re-captcha captcha-site-key="6LcQ9dkUAAAAAAoEsUOafr0NKTtS8_6_rjr1k0hB"></sn-re-captcha>
```

- Provide `your site key`.
- Optionally you can give success, expire and error callBacks.
- Success callback will return `response code`.
