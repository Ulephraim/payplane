/** @format */

import React from 'react';
import Tile from './Tile';
import { StyleSheet, View, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 2;
const TILE_GAP = 16;
const TILE_WIDTH = (width - TILE_GAP * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

const tiles = [
  { id: 'spent' },
  { id: 'cashback' },
  { id: 'recent' },
  { id: 'cards' },
];

const WidgetList = () => {
  return (
    <View style={style.widgetContainer}>
      <View style={style.gridContainer}>
        {tiles.map((tile, index) => (
          <View key={tile.id + '-' + index} style={[style.tileWrapper]}>
            <Tile
              id={tile.id}
              onLongPress={() => true}
              key={tile.id + '-' + index}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default WidgetList;

const style = StyleSheet.create({
  widgetContainer: {
    padding: TILE_GAP,
    backgroundColor: 'white',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tileWrapper: {
    width: TILE_WIDTH,
    marginBottom: TILE_GAP,
  },
});
