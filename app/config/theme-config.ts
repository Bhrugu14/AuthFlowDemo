import {
  MD3DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {DarkColorTheme, LightColorTheme} from '../theme/Colors';
import {fontSize} from '../theme/FontSize';

export const PaperThemeDefault = {
  ...PaperDefaultTheme,
  roundness: 3,
  fonts: {
    ...PaperDefaultTheme.fonts,
    ...fontSize,
  },
  colors: {
    ...PaperDefaultTheme.colors,
    ...LightColorTheme,
  },
};

export const PaperThemeDark = {
  ...PaperDarkTheme,
  roundness: 3,
  fonts: {
    ...PaperDarkTheme.fonts,
    ...fontSize,
  },
  colors: {
    ...PaperDarkTheme.colors,
    ...DarkColorTheme,
  },
};

export const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
};

export const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    background: '#303030',
    card: '#222222',
    text: '#ffffff',
  },
};
