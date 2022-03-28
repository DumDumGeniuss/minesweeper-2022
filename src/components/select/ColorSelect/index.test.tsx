import { render, screen, fireEvent } from '@testing-library/react';
import ColorSelect, { Testid } from '.';
import type { Options } from '.';

describe('ColorSelect', () => {
  it('Should render component successfully.', () => {
    try {
      const options: Options = [];
      render(
        <ColorSelect choice="red" options={options} onOptionClick={() => {}} />
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
      <ColorSelect choice="red" options={options} onOptionClick={() => {}} />
    );
    const chosenColorDisplay = screen.getByTestId(Testid.ChosenColorDisplay);

    expect(chosenColorDisplay?.classList || []).toContain(options[0].bgColor);
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
    render(
      <ColorSelect choice="red" options={options} onOptionClick={() => {}} />
    );
    const colorButtons = screen.getAllByTestId(Testid.ColorButton);
    expect(colorButtons[0].classList).toContain(options[0].bgColor);
    expect(colorButtons[1].classList).toContain(options[1].bgColor);
    expect(colorButtons.length).toBe(2);
  });
  it('Should open dropdown when "Display color dropdown" button is clicked.', () => {
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
      <ColorSelect choice="red" options={options} onOptionClick={() => {}} />
    );
    const displayColorDropdownButton = screen.getByTestId(
      Testid.DisplayColorListButton
    );
    if (displayColorDropdownButton) {
      fireEvent.click(displayColorDropdownButton);
    }
    const colorList = screen.getByTestId(Testid.ColorList);
    expect(colorList?.classList || []).not.toContain('hidden');
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
    render(
      <ColorSelect
        choice="red"
        options={options}
        onOptionClick={onOptionClick}
      />
    );
    const colorButtons = screen.getAllByTestId(Testid.ColorButton);
    fireEvent.click(colorButtons[1]);
    expect(onOptionClick.mock.calls[0][0]).toBe(options[1].value);
  });
});
