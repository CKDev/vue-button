<template>
  <button type="button" v-bind="$attrs" v-on="$listeners" @mousedown="onClick($event)" class="v-button" :disabled="disabled || loading" :class="[{ 'is-loading': loading, 'is-disabled': disabled }]" :style="style">
    <div class="frame">
      <div class="loader">
        <svg class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"/>
        </svg>
      </div>
      <span class="content">
        <slot />
      </span>
    </div>
  </button>
</template>

<script type="text/javascript">
import Parse from 'color-parse'

export default {
  name: 'VButton',
  props: {
    /**
     * Toggle the loading state
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * Whether to enable the ripple effect on click
     * Even when enabled, ripple will not occur if the button
     * is disabled, or the +loading+ prop is true
     * 
     * The ripple color is automatically determined by parsing
     * the button's defined +buttonColor+ value, and darkening it by 40%
     * The ripple color can be overridden completely using the
     * +rippleColor+ prop, or by adjusting the +rippleOffset+ value
     */
    ripple: {
      type: Boolean,
      default: true
    },
    /**
     * Whether the button is currently disabled
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * The background/border color of the button
     */
    buttonColor: {
      type: String,
      default: '#231e49'
    },
    /**
     * The color of the text within the button
     */
    textColor: {
      type: String,
      default: null
    },
    /**
     * If specified, the color of the ripple effect
     * If not defined, the ripple color is calculated
     * automatically by darkening the button color 40%
     */
    rippleColor: {
      type: String,
      default: null
    },
    /**
     * Adjust the default color brightness offset of the
     * ripple color relative to the button color, as a number
     * between -1 and 1
     * 
     * A negative value yields a darker color. A positive value
     * yields a lighter color.
     * 
     * For example: -0.5 coupled with a +buttonColor+ of `rebeccapurple`
     * yields a ripple that is 50% darker than `rebeccapurple`.
     * A value of 0.5 would yield a ripple that is 50% lighter
     * than `rebeccapurple`. -1 would yield black, 1 would yield white 
     */
    rippleOffset: {
      type: Number,
      default: -0.4
    },
    /**
     * How long the ripple effect should take to animate, in milliseconds
     */
    rippleDuration: {
      type: Number,
      default: 400
    },
    /**
     * The final scaled size of the ripple element after animation.
     * By default this is calculated automatically based on the
     * dimensions of the button when clicked. The scale is a multiplier
     * on the original 40x40 px size of the ripple element
     * (so a value of `3` would result in a final ripple size of 120x120 px)
     */
    rippleScale: {
      type: Number,
      default: null
    }
  },
  methods: {
    /**
     * Add the ripple when clicked
     */
    onClick: function(event){
      // Don't ripple if loading, disabled, or not configured to ripple
      if(this.loading || this.disabled || !this.ripple) return

      const x      = event.pageX - this.$el.offsetLeft
      const y      = event.pageY - this.$el.offsetTop
      const rect   = this.$el.getBoundingClientRect()
      const ripple = document.createElement('div')

      // Set the default ripple scale based on the max width/height
      // of the button element. Multiplies the resulting scale by 2
      // to account for a ripple that might originate from one edge
      // of the button (to ensure it still fills the whole button area)
      this.defaultRippleScale = (Math.max(rect.width, rect.height) / 40) * 2

      // Add the ripple element to the button
      ripple.classList.add('ripple')
      this.$el.appendChild(ripple)

      // Position the ripple element at the clicked position
      ripple.style.left = `${x}px`
      ripple.style.top  = `${y}px`

      // After the ripple animation duration, remove the element
      setTimeout(() => this.$el.removeChild(ripple), this.rippleDuration)
    }
  },
  computed: {
    /**
     * Define the style variables used by various child elements
     */
    style: function(){
      return {
        '--text-color': this.textColor,
        '--button-color': this.buttonColor,
        '--ripple-color': this.rippleColor || this.defaultRippleColor,
        '--ripple-scale': this.rippleScale || this.defaultRippleScale,
        '--ripple-duration': `${this.rippleDuration}ms`,
      }
    },
    /**
     * Calculate the ripple color by lightening/darkening
     * the `buttonColor` by the percentage value of `rippleOffset`
     * Retains the alpha channel if found
     */
    defaultRippleColor: function(){
      // Parse the button color
      const color = Parse(this.buttonColor)

      // If color could not be parsed, just make the
      // ripple color the same as the button color
      if(!color) return this.buttonColor

      // Lighten or darken, depending on value of offset
      const rgb = color.values.map((v) => {
        v += v * this.rippleOffset
        if(v < 0)   v = 0
        if(v > 255) v = 255
        return v
      })

      return `rgba(${rgb.join(', ')}, ${color.alpha})`
    }
  },
  data: function(){
    return {
      defaultRippleScale: 6
    }
  }
}
</script>

<style lang="scss" scoped>
.v-button {
  position: relative;
  background-color: var(--button-color, #231e49);
  border: 0;
  color: var(--text-color, #fff);
  text-transform: uppercase;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  overflow: hidden;
  user-select: none;
  padding: 0;
  cursor: pointer;

  &.is-circle {
    border-radius: 50%;
    outline: none;
  }

  &.is-circle::after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }

  &.is-outlined,
  &.is-text {
    background-color: transparent;
    color: var(--text-color, #231e49);
  }

  &.is-outlined .path,
  &.is-text .path {
    stroke: var(--button-color, #231e49);
  }

  &.is-outlined /deep/ .ripple,
  &.is-text /deep/ .ripple {
    background-color: var(--ripple-color);
  }

  &.is-text .frame {
    box-shadow: none;
  }

  &.is-loading {
    cursor: default;
  }

  &.is-loading .loader {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }

  &.is-loading .content {
    transform: scale(0);
    opacity: 0;
  }

  &.is-disabled {
    cursor: not-allowed;
  }
}

.frame {
  width: 100%;
  height: 100%;
  padding: 12px 22px;
  box-shadow: inset 0 0 0 3px var(--button-color, #231e49);
}

.loader {
  transition: transform 450ms cubic-bezier(0.165, 0.84, 0.44, 1), opacity 450ms cubic-bezier(0.165, 0.84, 0.44, 1);
  position: absolute;
  top: 50%;
  left: 50%;
  width: 22px;
  transform: translate(-50%, -50%) scale(8);
  opacity: 0;
  display: inline-block;
  pointer-events: none;

  &::before {
    content: '';
    display: block;
    padding-top: 100%;
  }
}

.content {
  position: relative;
  transition: transform 450ms cubic-bezier(0.165, 0.84, 0.44, 1), opacity 450ms cubic-bezier(0.165, 0.84, 0.44, 1);
  transform: scale(1);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  z-index: 1;
}

/deep/ .ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--ripple-color);
  animation: ripple var(--ripple-duration, 400ms) linear forwards;
  animation-iteration-count: 1;
  z-index: 0;
  will-change: transform, opacity;
}

.circular {
  animation: rotate 2s linear infinite;
  height: 100%;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: dash 1.5s ease-in-out infinite;
  stroke-linecap: round;
  stroke: var(--text-color, #fff);
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}

@keyframes ripple {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(0);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(var(--ripple-scale, 8));
  }
}
</style>
