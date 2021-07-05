# README

react-bootstrap-hooks-alert is pretty much what it says. Using bootstrap/Alert and hooks I built simple way to generate: [Bootstrap Alerts](https://react-bootstrap.github.io/components/alerts/). Tada!
(Personally I think they are more notifications than alerts, but maybe that's just me)

## Why was the package created?

I couldn't find anything that did quite what I wanted. 🤷‍♂️

Also, it felt like it could be a package, and I've never built an npm package before!

## What problem does the package solve?

Not so much a problem, just a way to have pretty Notifications/Alerts.

## How does the package solve the problem?

Wonderfully!

## Configurations

There are only two types of configuration: `timeouts` for AlertProvider and `className` for AlertOutlet, check out the example below.

### Timeouts

If you do not provide any timeouts, there will be none, the user will have to click to get rid of them

## Examples

### AlertProvider/AlertOutlet

AlertProvider should be somewhere top-level, so the alerts don't go away if you change page. The same goes for AlertOutlet

``` jsx
import { AlertProvider, AlertOutlet } from 'react-bootstrap-hooks-alert'

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

The available functions are named after the bootstrap Alert variants:

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

const SomeComponent = () => {

  const { success, danger } = useAlert()

  const handleClick = () => {
    // If there is a timeout set in AlertProvider,
    // this will disappear in that time, otherwise
    // it will stay until someone clicks it gone!
    success('You have clicked a button!')

    // This will override the default timouts passed to AlertProvider!
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

### Custom message

99% of the time when a user clicks something I just want a text message to appear.

But since I sometimes want more, the parameter passed to the functions is a React.ReactNode.

So if you want to pass something fancy, this would work, for instance:

``` jsx
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

## Demos

...coming up...

## Instructions for contributors

...not really expecting any
