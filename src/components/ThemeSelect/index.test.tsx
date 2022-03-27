import { render, screen, fireEvent } from '@testing-library/react';
import ThemeSelect, { Testid } from '.';
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
        borderColor: 'border-red-200',
        borderColorSelect: 'hover:border-red-300',
        borderColorHover: 'hover:border-red-300',
      },
    ];
    render(
      <ThemeSelect choice="red" options={options} onOptionClick={() => {}} />
    );
    const chosenThemeDisplay = screen.getByTestId(Testid.ChosenThemeDisplay);

    expect(chosenThemeDisplay?.classList || []).toContain(options[0].bgColor);
  });
  it('Should render number of options correctly.', () => {
    const options: Options = [
      {
        value: 'red',
        bgColor: 'bg-red-200',
        borderColor: 'border-red-200',
        borderColorSelect: 'bg-red-300',
        borderColorHover: 'hover:border-red-300',
      },
      {
        value: 'green',
        bgColor: 'bg-green-200',
        borderColor: 'border-green-200',
        borderColorSelect: 'bg-green-300',
        borderColorHover: 'hover:border-green-300',
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
  it('Should open dropdown when "Display theme dropdown" button is clicked.', () => {
    const options: Options = [
      {
        value: 'red',
        bgColor: 'bg-red-200',
        borderColor: 'border-red-200',
        borderColorSelect: 'hover:border-red-300',
        borderColorHover: 'hover:border-red-300',
      },
    ];
    const { container } = render(
      <ThemeSelect choice="red" options={options} onOptionClick={() => {}} />
    );
    const displayThemeDropdownButton = container.querySelector(
      '[aria-label="Display theme dropdown"]'
    );
    if (displayThemeDropdownButton) {
      fireEvent.click(displayThemeDropdownButton);
    }
    const themeList = screen.getByTestId(Testid.ThemeList);
    expect(themeList?.classList || []).not.toContain('hidden');
  });
  it('Should trigger onOptionClick when an option is clicked.', () => {
    const options: Options = [
      {
        value: 'red',
        bgColor: 'bg-red-200',
        borderColor: 'border-red-200',
        borderColorSelect: 'hover:border-red-300',
        borderColorHover: 'hover:border-red-300',
      },
      {
        value: 'green',
        bgColor: 'bg-green-200',
        borderColor: 'border-green-200',
        borderColorSelect: 'hover:border-green-300',
        borderColorHover: 'hover:border-green-300',
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
