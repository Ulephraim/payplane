/** @format */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import RoundButton from './RoundButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface DropdownMenuItemProps {
  key: string;
  title: string;
  icon: string;
  onPress: () => void;
}

const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
  title,
  icon,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.option} onPress={onPress}>
      <Ionicons name={icon} size={24} style={styles.icon} />
      <Text style={styles.optionText}>{title}</Text>
    </TouchableOpacity>
  );
};

const Dropdown: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsVisible((prev) => !prev);
  };

  const handleOptionPress = (option: string): void => {
    console.log(`Selected option: ${option}`);
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <RoundButton
        icon={'ellipsis-horizontal'}
        text={'More'}
        onPress={toggleMenu}
      />

      {isVisible && (
        <View style={styles.dropdown}>
          {/* DropdownMenu Content */}
          <DropdownMenuItem
            key="statement"
            title="Statement"
            icon="list-outline"
            onPress={() => handleOptionPress('Statement')}
          />
          <DropdownMenuItem
            key="converter"
            title="Converter"
            icon="arrow-forward-circle"
            onPress={() => handleOptionPress('Converter')}
          />
          <DropdownMenuItem
            key="background"
            title="Background"
            icon="image"
            onPress={() => handleOptionPress('Background')}
          />
          <DropdownMenuItem
            key="account"
            title="Add new account"
            icon="add-circle"
            onPress={() => handleOptionPress('Add new account')}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },
  dropdown: {
    position: 'absolute',
    top: 100,
    right: 10,
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    flex: 1,
    zIndex: 999,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    color: '#555',
  },
});

export default Dropdown;
