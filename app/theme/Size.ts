import {Dimensions, Platform, ScaledSize} from 'react-native';
import {getBrand, hasNotch} from 'react-native-device-info';

const {width, height} = Dimensions.get('window');

const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

// Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size: number) => (shortDimension / guidelineBaseWidth) * size;

const verticalScale = (size: number) =>
  (longDimension / guidelineBaseHeight) * size;

const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const isIPhoneXSize = (dim: ScaledSize) => {
  return dim.height === 812 || dim.width === 812;
};

const isIPhoneXrSize = (dim: ScaledSize) => {
  return dim.height === 896 || dim.width === 896;
};

const isIphoneX = () => {
  const dim = Dimensions.get('window');
  return (
    // This has to be iOS
    Platform.OS === 'ios' &&
    // Check either, iPhone X or XR
    (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  );
};

const isIpadSize = (dim: ScaledSize) => {
  return dim.height > 900 || dim.width > 900;
};

const isIpad = () => {
  const dim = Dimensions.get('window');
  return (
    // This has to be iOS
    Platform.OS === 'ios' &&
    // Check either, iPhone X or XR
    isIpadSize(dim)
  );
};

const notchPresent = () => {
  return hasNotch();
};

const isAndroid = () => {
  return getBrand() !== 'Apple';
};

const deviceWidth = width;

const deviceHeight = height;

export const size = {
  scale,
  moderateScale,
  verticalScale,
  deviceWidth,
  deviceHeight,
  isIphoneX,
  isIpad,
  notchPresent,
  isAndroid,
};
