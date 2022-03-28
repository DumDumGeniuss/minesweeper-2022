import Theme from './types';

function convertStringToTheme(value: string): Theme {
  switch (value) {
    case Theme.Amber:
      return Theme.Amber;
    case Theme.Emerald:
      return Theme.Emerald;
    case Theme.Indigo:
      return Theme.Indigo;
    case Theme.Gray:
      return Theme.Gray;
    case Theme.Green:
      return Theme.Green;
    case Theme.Purple:
      return Theme.Purple;
    case Theme.Red:
      return Theme.Red;
    case Theme.Sky:
      return Theme.Sky;
    case Theme.Pink:
      return Theme.Pink;
    default:
      return Theme.Sky;
  }
}

export { convertStringToTheme, Theme };
