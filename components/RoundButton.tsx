/** @format */

import { View, Text } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

type RoundButtonProps = {
  text: string;
  icon: typeof Ionicons.defaultProps;
  onPress: () => void;
};
const RoundButton = () => {
  return (
    <View>
      <Text>RoundButton</Text>
    </View>
  );
};

export default RoundButton;
