import { render, fireEvent } from '@testing-library/react';
import ThemeSelect from '.';
import type { Options } from '.';

describe('ThemeSelect', () => {
  it('Should render component successfully.', () => {
    try {
      const options: Options = [];
      render(
        <ThemeSelect choice="red" options={options} onOptionClick={() => {}} />
      );

      expect(true).toBe(true);
    } catch (e) {
      expect(true).toBe(false);
    }
  });
  it('Should display color of choice.', () => {
    const options: Options = [
      {
        value: 'red',
        bgColor: 'bg-red-200',
        darkColor: 'bg-red-300',
      },
    ];
    const { container } = render(
      <ThemeSelect choice="red" options={options} onOptionClick={() => {}} />
    );
    const chosenThemeDisplay = container.querySelector(
      '[aria-label="Chosen theme display"]'
    );

    expect(chosenThemeDisplay?.classList || []).toContain(options[0].bgColor);
  });
  it('Should render number of options correctly.', () => {
    const options: Options = [
      {
        value: 'red',
        bgColor: 'bg-red-200',
        darkColor: 'bg-red-300',
      },
      {
        value: 'green',
        bgColor: 'bg-green-200',
        darkColor: 'bg-green-300',
      },
    ];
    const { container } = render(
      <ThemeSelect choice="red" options={options} onOptionClick={() => {}} />
    );
    const themeOptions = container.querySelectorAll(
      '[aria-label="Select theme"]'
    );
    expect(themeOptions[0].classList).toContain(options[0].bgColor);
    expect(themeOptions[1].classList).toContain(options[1].bgColor);
    expect(themeOptions.length).toBe(2);
  });
  it('Should trigger onOptionClick when an option is clicked.', () => {
    const options: Options = [
      {
        value: 'red',
        bgColor: 'bg-red-200',
        darkColor: 'bg-red-300',
      },
      {
        value: 'green',
        bgColor: 'bg-green-200',
        darkColor: 'bg-green-300',
      },
    ];
    const onOptionClick = jest.fn();
    const { container } = render(
      <ThemeSelect
        choice="red"
        options={options}
        onOptionClick={onOptionClick}
      />
    );
    const themeOptions = container.querySelectorAll(
      '[aria-label="Select theme"]'
    );
    fireEvent.click(themeOptions[1]);
    expect(onOptionClick.mock.calls[0][0]).toBe(options[1].value);
  });
});
