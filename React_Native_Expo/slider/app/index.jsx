import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Image, Dimensions, FlatList } from "react-native";

const { width: viewportWidth } = Dimensions.get("window");

const App = () => {
  const images = [
    require("../assets/image1.jpg"),
    require("../assets/image2.jpg"),
    require("../assets/image3.jpg"),
    require("../assets/image4.jpg"),
    require("../assets/image5.jpg"),
    require("../assets/image6.jpg"),
  ];

  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log("currentIndex => ", currentIndex);
  }, [currentIndex]);

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={item} style={styles.image} />
    </View>
  );

  const getItemLayout = (_, index) => ({
    length: viewportWidth * 0.8 + 20,
    offset: (viewportWidth * 0.8 + 20) * index,
    index,
  });

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={viewportWidth * 0.8 + 20}
        decelerationRate="fast"
        snapToAlignment="start"
        keyExtractor={(_, index) => index.toString()}
        getItemLayout={getItemLayout}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        contentContainerStyle={{
          paddingHorizontal: (viewportWidth - viewportWidth * 0.8) / 2,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: viewportWidth * 0.8,
    height: viewportWidth * 0.8 * 1.5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
});

export default App;
