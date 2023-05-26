import {StyleSheet} from 'react-native';
import {size} from '../../theme/Size';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: size.moderateScale(20),
    paddingVertical: size.moderateScale(20),
    justifyContent: 'space-between',
  },
  forgot: {
    marginTop: size.moderateScale(12),
  },
  labelStyle: {
    fontSize: size.moderateScale(15),
  },
  cardOuterStyle: {
    padding: size.moderateScale(5),
    borderRadius: size.moderateScale(20),
    maxWidth: size.moderateScale(400),
  },
  cardStyle: {
    padding: size.moderateScale(5),
    borderRadius: size.moderateScale(20),
    maxWidth: size.moderateScale(400),
    marginBottom: size.moderateScale(20),
  },
  cardContainerStyle: {
    flexDirection: 'row',
  },
  sliderButton: {flex: 1},
});

export default styles;
