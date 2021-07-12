# react-bootstrap-hooks-alert

Using [React Bootstrap](https://react-bootstrap.github.io/) ([Alerts](https://react-bootstrap.github.io/components/alerts/)) and [React Hooks](https://reactjs.org/docs/hooks-intro.html) I built a simple way to generate, well, `Alerts`!

(Personally I think they are more like **notifications** than **alerts**, but maybe that's just me 🤔 )

## Demo

A very basic demo: <https://tofsjonas.github.io/react-bootstrap-hooks-alert-demo/>

## Installation

``` bash
yarn add react-bootstrap@1.6.1 react-bootstrap-hooks-alert
```

## How to use

``` jsx
import React, { useEffect } from 'react'
import { AlertProvider, AlertOutlet, useAlert } from 'react-bootstrap-hooks-alert'
import 'react-bootstrap-hooks-alert/dist/Alert.css'

const App = () => {
  return (
    <AlertProvider timeouts={{ warning: 2000, success: 1000 }}>
      <AlertOutlet />
      <DemoDiv />
    </AlertProvider>
  )
}

const DemoDiv = () => {
  const { warning } = useAlert()
  useEffect(() => {
    warning('This is a warning!')
  }, [warning])
  return <div>Demo</div>
}

export default App
```

### AlertProvider

`AlertProvider` should be somewhere top-level, so the alerts don't go away if you change page.

By passing `timeouts` to `AlertProvider` you can set how long before they disappear by themselves.

``` jsx
<AlertProvider timeouts={{ info: 2000, dark: 3000, [etc...] }}>
...
```

By default there are **no** timeouts, so unless you pass them as a prop here or in the function calls as a parameter, the alerts will stay until the user clicks them away.

### AlertOutlet

You can put `AlertOutlet` anywhere you like, so long as it's "inside" `AlertProvider`.

You can even have more than one of them if it tickles your fancy. Using `className` and styling they can appear different on different pages.

``` jsx
  <AlertOutlet className="do-be-do" />
  <AlertOutlet className="hubba-bubba" />
```

### useAlert functions

The available `useAlert` functions are named after the **Bootstrap** `Alert` variants:

- primary
- secondary
- success
- danger
- warning
- info
- light
- dark

``` jsx
const { success, danger, [info, dark, etc...] } = useAlert()
```

If you for some reason wish to override the defaults, or lack thereof, you can set timeouts on this level as well.

``` jsx
success('You have clicked a button!', { timeout: 2000 }) // two seconds
info('The earth is round! You have been informed.', { timeout: 1500 }) // 1.5 seconds
```

## Customizing

The `Alerts` will follow the styling from **react-bootstrap**, so if you make global changes there, they will be reflected here.

### CSS

The CSS in `Alert.css` is just to make the container fixed, and add some animation.

If you wish to alter it, the simplest way would be to **not** `import 'react-bootstrap-hooks-alert/dist/Alert.css'` and instead use your own css.

You can find the `SCSS` in the [github package](https://github.com/tofsjonas/react-bootstrap-hooks-alert/blob/main/src/Alert.scss).

### Custom message

If you wish to pass something other than plain text as a message, go right ahead. This would work fine, for instance:

``` jsx
import Alert from 'react-bootstrap/Alert'
...
...
success(
  <>
  <Alert.Heading>Hey, nice to see you</Alert.Heading>
  <p>
    Aww yeah, you successfully read this important alert message. This example
    text is going to run a bit longer so that you can see how spacing within an
    alert works with this kind of content.
  </p>
  <hr />
  <p className="mb-0">
    Whenever you need to, be sure to use margin utilities to keep things nice
    and tidy.
  </p>
  </>
  )
```

## Bootstrap's CSS

You *will* need **Bootstrap**'s CSS, but if you are using **react-bootstrap**, you most likely already have it. But just in case you don't, here's an easy way to get it.

Copy the `<link />` below and paste it inside the `<head>`-tag of your `public/index.html`:

``` html
    <!-- COPY FROM HERE -->
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
    integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
    crossorigin="anonymous" />
    <!-- TO HERE -->
```

public/index.html:

``` html
<head>
  <meta charset="utf-8" />
  <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
  ...
    <!-- PASTE IT SOMEWHERE HERE -->
  ...
  <title>React App</title>
</head>
```

## Thanks

My thanks go out to [Prateek Surana](https://prateeksurana.me/blog/react-library-with-typescript/), whose method I used to build the package.

Many thanks to [React Bootstrap](https://react-bootstrap.github.io/) and [Bootstrap](https://getbootstrap.com/) as well, of course.

...and Mom. Thanks Mom.
