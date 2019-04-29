<template>
  <div id="app">
    <div class="segment">
      <label>Default Button</label>
      <p>Default button look with no modified props/styles</p>
      <v-button>Default Button</v-button>
    </div>
    <div class="segment">
      <label>Outlined Button</label>
      <p>Default button look with the <code>is-outlined</code> class</p>
      <v-button class="is-outlined">Outlined Button</v-button>
    </div>
    <div class="segment">
      <label>Text Button</label>
      <p>Default button look with the <code>is-text</code> class</p>
      <v-button class="is-text">Text Button</v-button>
    </div>
    <div class="segment">
      <label>Circle Button</label>
      <p>Default button look with the <code>is-circle</code> class</p>
      <v-button class="is-circle">Circle Button</v-button>
    </div>
    <div class="segment">
      <label>Default Loading Button</label>
      <p>Demonstration of setting the <code>loading</code> prop to <code>true</code> on click</p>
      <v-button :loading="loadingActive" @click="toggleLoading()">Default Loading Button</v-button>
    </div>
    <div class="segment">
      <label>Disabled Button</label>
      <p>Default button look with the <code>disabled</code> prop set to <code>true</code></p>
      <v-button :disabled="true">Disabled Button</v-button>
    </div>
    <div class="segment">
      <label>Rippleless Button</label>
      <p>Demonstration of setting the <code>ripple</code> prop to <code>false</code></p>
      <v-button :ripple="false">Rippleless Button</v-button>
    </div>
    <div class="segment">
      <label>Ripple Offset Button</label>
      <p>Demonstration of setting the <code>ripple-offset</code> prop to <code>0.8</code> (80% lighter ripple color than background)</p>
      <v-button :ripple-offset="0.8">Ripple Offset Button</v-button>
    </div>
    <div class="segment">
      <label>Custom Ripple Color Button</label>
      <p>Demonstration of setting the <code>ripple-color</code> prop to <code>orange</code></p>
      <v-button ripple-color="orange">Custom Ripple Color Button</v-button>
    </div>
    <div class="segment">
      <label>Custom Ripple Duration Button</label>
      <p>Demonstration of setting the <code>ripple-duration</code> prop to <code>3000</code> (time in milliseconds)</p>
      <v-button :ripple-duration="3000">Custom Ripple Duration Button</v-button>
    </div>
    <div class="segment">
      <label>Custom Ripple Scale Button</label>
      <p>Demonstration of setting the <code>ripple-scale</code> prop to <code>1</code> (40x40 pixels)</p>
      <v-button :ripple-scale="1" class="is-outlined">Custom Ripple Scale Button</v-button>
    </div>
    <div class="segment">
      <label>Custom Text Color Button</label>
      <p>Demonstration of setting the <code>text-color</code> prop to <code>yellow</code></p>
      <v-button text-color="yellow">Custom Text Color Button</v-button>
    </div>
    <div class="segment">
      <label>Icon Button</label>
      <p>Demonstration of toggling internal content state on click</p>
      <v-button @click="iconActive = !iconActive" class="is-circle" :class="{ 'is-active': iconActive }">
        <div class="card">
          <div class="front">
            <img src="./assets/svgs/like.svg" width="20" height="20" key="like" />
          </div>
          <div class="back">
            <img src="./assets/svgs/like-full.svg" width="20" height="20" key="like-full" />
          </div>
        </div>
      </v-button>
    </div>
    <div class="segment">
      <label>Custom Color Button</label>
      <p>Demonstration of setting the <code>button-color</code> prop to <code>lightseagreen</code></p>
      <v-button button-color="lightseagreen">Custom Color Button</v-button>
    </div>
    <div class="segment">
      <label>Text Adjacent Loader</label>
      <p>Custom style overrides to place the loader adjacent to the label on click</p>
      <v-button class="adjacent-button" :loading="adjacentActive" @click="toggleAdjacent()">
        Text Adjacent Loader
      </v-button>
    </div>
    <div class="segment">
      <label>Label State Switcher Button</label>
      <p>Demonstration of button that changes labels & color on click</p>
      <v-button class="state-button" :button-color="stateColor" :class="{ 'is-active': stateActive }" @click="toggleState()">
        <div class="labels">
          <div class="label create">Create</div>
          <div class="label delete">Delete</div>
        </div>
      </v-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VButton from '@/button.vue'

Vue.component('v-button', VButton, {
  buttonColor: 'green'
})

export default {
  name: 'app',
  methods: {
    changeColor: function() {
      if(this.color == '#234051'){
        this.color = 'rebeccapurple'
      }else{
        this.color = '#234051'
      }
    },
    toggleState: function(){
      if(this.stateColor == '#231e49'){
        this.stateColor = 'crimson'
      }else{
        this.stateColor = '#231e49'
      }
      this.stateActive = !this.stateActive
    },
    toggleAdjacent: function(){
      this.adjacentActive = true
      setTimeout(() => { this.adjacentActive = false }, 5000)
    },
    toggleLoading: function(){
      this.loadingActive = true
      setTimeout(() => { this.loadingActive = false }, 5000)
    }
  },
  data: function(){
    return {
      iconActive: false,
      loading: false,
      disabled: false,
      color: '#234051',
      stateActive: false,
      stateColor: '#231e49',
      adjacentActive: false,
      loadingActive: false
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 2rem;
  font-size: 14px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem 2rem;
}

.segment label {
  display: block;
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 5px;
}

.segment p {
  font-size: 13px;
  color: #777;
  margin: 0 0 5px;
  line-height: 1.4;
}

.segment code {
  background-color: #e5e5e5;
  line-height: 1.4;
  padding: 2px 4px;
  border-radius: 3px;
}

.v-button {
  margin-bottom: 2rem;
  position: relative;
  perspective: 800px;
}

.card {
  width: 20px;
  height: 20px;
  position: relative;
  transition: transform 500ms ease-out;
  transform-style: preserve-3d;
  transform-origin: 50% 50%;
}

.card .front,
.card .back {
  display: block;
  height: 100%;
  width: 100%;
  position: absolute;
  backface-visibility: hidden;
}

.card .back {
  transform: rotateY(180deg);
}

.v-button.is-active .card {
  transform: rotateY(180deg);
}

/**
 * Text adjacent button
 */
.adjacent-button {
  border-radius: 3px;
}

.adjacent-button /deep/ .frame {
  padding: 22px 30px;
}

.adjacent-button /deep/ .loader {
  transition: all 400ms ease-out;
  transform: none;
  position: relative;
  top: initial;
  left: initial;
  float: left;
  width: 0;
  height: 20px;
  margin-right: 0;
  opacity: 0;
  overflow: hidden;
}

.adjacent-button /deep/ .loader .circular {
  width: 20px;
  height: 20px;
}

.adjacent-button.is-loading /deep/ .loader {
  transform: none;
  width: 20px;
  margin-right: 1rem;
  opacity: 1;
}

.adjacent-button.is-loading /deep/ .content {
  transform: none;
  opacity: 1;
}

.state-button {
  &.is-active /deep/ .labels {
    top: -50px;
  }
}

.state-button /deep/ .frame {
  padding: 0 22px;
}

.state-button /deep/ .labels {
  transition: top 300ms ease-out;
  position: relative;
  top: 0;
  width: 80px;
  height: 50px;
}

.state-button /deep/ .label {
  position: absolute;
  left: 50%;
  height: 50px;
  transform: translateX(-50%);
  line-height: 50px;
}

.state-button /deep/ .label.create {
  top: 0;
}

.state-button /deep/ .label.delete {
  top: 50px;
}
</style>
