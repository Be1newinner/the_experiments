import React, { useState } from "react";
import { View, Image, Dimensions, StyleSheet, Animated } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";

const { width: viewportWidth } = Dimensions.get("window");

const Carousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = new Animated.Value(0);

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      const translationX = event.nativeEvent.translationX;
      const newIndex =
        translationX > 0
          ? Math.max(0, currentIndex - 1)
          : Math.min(data.length - 1, currentIndex + 1);

      Animated.spring(translateX, {
        toValue: -newIndex * viewportWidth,
        useNativeDriver: true,
      }).start(() => {
        translateX.setValue(0);
        setCurrentIndex(newIndex);
      });
    }
  };

  return (
    <View>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View style={styles.carousel}>
          {data.map((item, index) => (
            <Animated.View
              key={index}
              style={[
                styles.slide,
                {
                  transform: [
                    {
                      translateX: Animated.add(
                        translateX,
                        new Animated.Value(-index * viewportWidth)
                      ),
                    },
                  ],
                },
              ]}
            >
              <Image source={{ uri: item }} style={styles.image} />
            </Animated.View>
          ))}
        </Animated.View>
      </PanGestureHandler>
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carousel: {
    flexDirection: "row",
  },
  slide: {
    width: viewportWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: viewportWidth,
    height: 300,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "rgba(0, 0, 0, 0.92)",
  },
  inactiveDot: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
});

export default Carousel;
