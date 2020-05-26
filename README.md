# Captcha Provider[WIP]

Provides a way for captcha validation inside Web Components

# Problem Solved

Google Captcha does not run inside a Web Component because cross origin requests are blocked by default inside shadow root. There are many dirty and hacky ways to go around this problem. But we need a clean solution, that is what this compoenent provides.

Just put this component inside you own web component and captcha validations will work like charm.

# Demo

## Trigger

![](./assets/captcha-trigger.gif)

## Expired

![](./assets/captcha-expired.gif)

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
