# README

Using [React Bootstrap](https://react-bootstrap.github.io/) ([Alerts](https://react-bootstrap.github.io/components/alerts/)) and [React Hooks](https://reactjs.org/docs/hooks-intro.html) I built a simple way to generate "Alerts"! Tada!

(Personally I think they are more like **notifications** than **alerts**, but maybe that's just me 🤔)

## Demo

A very basic demo: <https://tofsjonas.github.io/react-bootstrap-hooks-alert-demo/>

## Install

``` bash
yarn add react-bootstrap@1.6.1 react-bootstrap-hooks-alert
```

I don't imagine there will be any problems with newer versions of **react-bootstrap**, but I've been wrong many a time...

### React Bootstrap's CSS

You *will* need **react-bootstrap**'s CSS as well, but if you are using **react-bootstrap**, you should already have it. But just in case, here's an easy way to get it.


Include the `<link />` below inside the `<head>`-tag in your `public/index.html`:

``` html
<head>
  ...
  ...
    <!-- COPY FROM HERE -->
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
    integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
    crossorigin="anonymous" />
    <!-- TO HERE -->
  ...
  ...
</head>
```

## Why was the package created?

I couldn't find anything that did quite what I wanted. 🤷‍♂️

When I was done, it felt like it could be a package, and I've never built an npm package before!

## What problem does the package solve?

Not so much a problem, just a way to have pretty Notifications/Alerts.

## How does the package solve the problem?

Wonderfully!

## Configurations

There are only two types of configuration: `timeouts` for AlertProvider and `className` for AlertOutlet, check out the example below.

### Timeouts

Please note that the timeouts are in milliseconds...

#### Defaults

By default there are NO timeouts. The alerts will stay until the user clicks them away.

What you do is you pass `timeouts` as a `prop` to the `AlertProvider` component. See the example below.

#### Overrides

You can override the default in the functions found in useAlert, once again see below for examples.

## Examples

### AlertProvider/AlertOutlet

`AlertProvider` should be somewhere top-level, so the alerts don't go away if you change page.

`AlertOutlet` looks better if it's inside a `react-bootstrap/Container`, but it should also be kind of top-level.

``` jsx
import Container from 'react-bootstrap/Container'
import { HashRouter as Router, Routes } from 'react-router-dom'

import { AlertProvider, AlertOutlet } from 'react-bootstrap-hooks-alert'
import 'react-bootstrap-hooks-alert/dist/Alert.css'

function App() {
  return (
    <Router>
      <AlertProvider
         timeouts={{ warning: 2000, danger: 3000, success: 3000 }}
      >
        <Container>
          <AlertOutlet className="alert-outlet" />
            <Routes>
              ...
              ...
            </Routes>
        </Container>
      </AlertProvider>
    </Router>
  )
}
export default App
```

### useAlert

The available functions are named after the Bootstrap `Alert` variants:

- primary
- secondary
- success
- danger
- warning
- info
- light
- dark

``` jsx
import { useAlert } from 'react-bootstrap-hooks-alert'
import { useNavigate } from 'react-router-dom'

const SomeComponent = () => {
  const { success, danger, [info, dark etc...] } = useAlert()
  const navigate = useNavigate()

  const handleClick = () => {
    // If there is a timeout set in AlertProvider,
    // this will disappear in that time, otherwise
    // it will stay until someone clicks it gone
    success('You have clicked a button!')

    // This will override the default timouts passed to AlertProvider
    success('You have clicked a button!', { timeout: 2000 })
    navigate('somepagesomewhere')
  }

  const handleAnotherClick = () => {
    danger('You have clicked a DANGEROUS button!')
    navigate('somepagesomewhereelse')
  }
  ...
  ...
  ...
}
```

## Customizing

These components will follow the styling from **react-bootstrap**, so if you make changes there, they will be reflected here.

### CSS

The CSS in `Alert.css` is just to make the container fixed, and add some animation:

``` css
.alert-outlet {
  top: 10px;
  margin: 0 auto;
  position: fixed;
  z-index: 1000;
}
.alert-outlet .alert {
  left: -10000px;
  animation: slide 0.2s forwards;
  animation-timing-function: ease;
}

@keyframes slide {
  100% {
    left: 0;
  }
}
```

If you wish to alter it, the simplest way would be to **not** `import 'react-bootstrap-hooks-alert/dist/Alert.css'` and instead use your own css.

You can pass `className` as a prop if you wish to change it from "alert-outlet"

### Custom message

99% of the time when a user clicks something I just want a text message to appear.

But since I sometimes want more, the parameter passed to the functions is a React.ReactNode.

So if you want to pass something fancy, this would work, for instance:

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

## Thanks

My thanks go out to [Prateek Surana](https://prateeksurana.me/blog/react-library-with-typescript/), whose method I used to build the package.

## Instructions for contributors

...not really expecting any
