# CKD Vue Button

## Installation
```
yarn add @ckd/vue-button@latest
```

## Demo

A simple demo of several component implementations can be found in the packages /demo directory. It can be run using `yarn serve`

## Usage

Register the component for use in a Vue application

```
import Button from '@ckd/vue-button'

// Import vue-button stylesheet
import '@ckd/vue-button/dist/@ckd/vue-button.css'

Vue.component('v-button', Button)
```

or, use UMD:

```
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/@ckd/vue-button"></script>

<link rel="stylesheet" href="https://unpkg.com/@ckd/vue-button@latest/dist/@ckd/vue-button.css">

<script>
new Vue({
  components: {
    VButton: window['@ckd/vue-button']
  }
}).$mount('#app')
</script>
```

Then, use the component in your markup
```
<v-button :button-color="rebeccapurple" :text-color="#fff" :ripple-offset="0.6">My Cool Button</v-button>
```

## Options

| *Option*       | *Accepted Value* | *Default* | *Description*                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|----------------|------------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| loading        | Boolean          | `false`     | Whether or not the button's loading animation should be showing. A `true` value also applies the `is-loading` class to the root node of the component and set the `disabled` attribute on the element itself. It will not apply the `is-disabled` class as well.                                                                                                                                                                                              |
| ripple         | Boolean          | `true`      | Whether or not to include a ripple effect on the button when clicked. Set to `false` to disable it.                                                                                                                                                                                                                                                                                                                                                           |
| disabled       | Boolean          | `false`     | Whether or not the button is considered disabled. This adds an `is-disabled` class to the root node of the component, adds the `disabled` attribute to the button, prevents a ripple effect even if enabled, and (if using the @ckd/vue-button stylesheet), will add the not-allowed cursor on hover                                                                                                                                                          |
| buttonColor    | String           | #231e49   | The background color of the button. Defaults to the CKD theme color.                                                                                                                                                                                                                                                                                                                                                                                          |
| textColor      | String           | `null`      | The text color of the button. By default, the color will simply be inherited from the parent element.                                                                                                                                                                                                                                                                                                                                                         |
| rippleColor    | String           | `null`      | The color of the ripple effect. Can be any valid color value (hex, rgba, hsl, name, etc.) If not specified, the `buttonColor` and `rippleOffset` props are used to calculate the ripple color using the [color-parse](https://www.npmjs.com/package/color-parse) library.                                                                                                                                                                                     |
| rippleOffset   | Number           | `-0.4`      | If `rippleColor` is not defined, this is a positive or negative value between -1 and 1 that determines how much to darken or lighten the `buttonColor` in order to use as the ripple color. A negative value implies darker, positive is lighter. The ripple color using the default offset is the value of `buttonColor`, darkened 40%                                                                                                                       |
| rippleDuration | Number           | `400`       | A time, in milliseconds, for the ripple to complete animating.                                                                                                                                                                                                                                                                                                                                                                                                |
| rippleScale    | Number           | `null`      | A multiplier value that determines the final size of the ripple effect. The original size of the ripple element is 40px x 40px, so a value of 3 would result in a final ripple size (when it reaches 0% opacity) of 120px x 120px. You should rarely if ever need to set this prop as the scale is calculated automatically on click, however if you wanted to have a smaller than usual ripple effect, or a really giant one, this is a way to control that. |

## Tests

Tests are written with jest, and can be run with `yarn test`