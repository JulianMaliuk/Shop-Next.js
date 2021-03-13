import React from "react";
import { act } from "react-dom/test-utils";
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Search from "./Search";

Enzyme.configure({ adapter: new Adapter() });

jest.useFakeTimers("modern")

describe('search component', () => {

  it('should pass a changed value to the onChange handler', async () => {
    const value = '2';
    const onChange = jest.fn();
    const wrapper = shallow(
      <Search setSearchQuery={onChange} searchQuery='' />
    );

    expect(wrapper.debug()).toMatchSnapshot();

    await act(async () => {
      wrapper.simulate('change', { target: { value: '1' } });
      wrapper.simulate('change', { target: { value: '2' } });
      wrapper.simulate('change', { target: { value } });

      jest.advanceTimersByTime(400)
    })

    expect(onChange).toBeCalledWith(value);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should clear input by click button', () => {
    const wrapper = mount(
      <Search setSearchQuery={() => {}} searchQuery='text' />
    );

    wrapper.find('button').simulate('click');
    expect(wrapper.state().value).toBe('');
  });
  
  // it("changes value when clicked", () => {
      
  //   const onSearchMock = jest.fn();
  
  //   act(() => {
  //     render(<Search setSearchQuery={onSearchMock} searchQuery='' />, container);
  //   });
  
  //   const input = container.querySelector('input');
    
  //   Simulate.change(input, { target: { value: 'some data' } })
  
  //   expect(onSearchMock).not.toBeCalled();
  
  //   jest.advanceTimersByTime(500);
  //   jest.runAllTimers();

  //   expect(onSearchMock).toHaveBeenCalledTimes(1);

  //   // expect(onSearchMock).toBeCalledWith('some data');
  //   // expect(onSearchMock).toHaveBeenCalledTimes(1);
  // //   expect(button.innerHTML).toBe("Turn off");
  
  // //   act(() => {
  // //     for (let i = 0; i < 5; i++) {
  // //       button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  // //     }
  // //   });
  
  // //   expect(onChange).toHaveBeenCalledTimes(6);
  // //   expect(button.innerHTML).toBe("Turn on");
  // });
});
