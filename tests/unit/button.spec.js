import { mount, shallowMount } from '@vue/test-utils'
import Button from '@/button.vue'

describe('button.vue', () => {
  it('should render a vue instance', () => {
    const wrapper = shallowMount(Button)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should have defined style variables', () => {
    const wrapper = shallowMount(Button)
    expect(Object.keys(wrapper.vm.style).sort()).toEqual(['--button-color', '--ripple-color', '--ripple-duration', '--ripple-scale', '--text-color'])
  })

  it('should have default values for each variable', () => {
    const wrapper = shallowMount(Button)
    expect(wrapper.vm.style['--text-color']).toEqual(null)
    expect(wrapper.vm.style['--button-color']).toEqual('#231e49')
    expect(wrapper.vm.style['--ripple-color']).toEqual('rgba(21, 18, 43.8, 1)')
    expect(wrapper.vm.style['--ripple-duration']).toEqual('400ms')
    expect(wrapper.vm.style['--ripple-scale']).toEqual(6)
  })

  it('should render a button with given background color', () => {
    const wrapper = shallowMount(Button, { propsData: { buttonColor: '#234051' } })

    expect(wrapper.vm.style).toHaveProperty('--button-color')
    expect(wrapper.vm.style['--button-color']).toEqual('#234051')
  })

  it('should render a button with given text color', () => {
    const wrapper = shallowMount(Button, { propsData: { textColor: 'coral' } })

    expect(wrapper.vm.style).toHaveProperty('--text-color')
    expect(wrapper.vm.style['--text-color']).toEqual('coral')
  })

  it('should render a button with given ripple color', () => {
    const wrapper = shallowMount(Button, { propsData: { rippleColor: 'rebeccapurple' } })

    expect(wrapper.vm.style).toHaveProperty('--ripple-color')
    expect(wrapper.vm.style['--ripple-color']).toEqual('rebeccapurple')
  })

  it('should generate an offset ripple color by default', () => {
    const wrapper = shallowMount(Button, { propsData: { buttonColor: '#323a45' } })
    expect(wrapper.vm.style['--ripple-color']).toEqual('rgba(30, 34.8, 41.4, 1)')
  })

  it('should trigger the click handler when clicked', () => {
    const wrapper = mount(Button)
    const spy = jest.spyOn(wrapper.vm, 'onClick')

    wrapper.find('.v-button').trigger('click')
    
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
