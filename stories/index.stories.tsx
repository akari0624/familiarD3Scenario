import React, { useRef } from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { Button, Welcome } from '@storybook/react/demo'
import BarchartComponent from '../src/components/Barchart'

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
))

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ))
// if use hook in storiesOf, use React.createElement(....) instead
// https://github.com/storybookjs/storybook/issues/5721  
  const Barchart = () =>  React.createElement(() => {
    const wrappeRef = useRef(null)
    return (
      <div style={{ width: '300px', height: '300px' }}  ref={wrappeRef}>
        <BarchartComponent parentRef={wrappeRef} />
      </div>
    )
  })

storiesOf('Barchart', module).add(
  'a barchart', Barchart,
)
