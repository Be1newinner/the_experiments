import React from "react";
import { StyleSheet, View } from "react-native";
import CarouselComponent from "../constants/Carousel";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
  const data = [
    "https://s3-alpha-sig.figma.com/img/794a/28ef/19d4d172115b92e8d1d37e2041e4aa42?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dGhZEykFXdIHs8xX3c26u2UC6CPuvVb5egacQcIS4i4Suq~08azeVr6H~9mrqQypSJQWThz3OD3clQWd~ok89HICci-wYrcSbdtCxEbZHdSERRZZnhHRkuAEd2Is3DJN0SyszUIR8HfZwBM86qG9haNC5Scx1CymnrCQ2fos2M3LJAGxVznwT0cc6jVHmA0tBr0SK7BjSojV2eKl99aWyb-zcObqrdO2pLFjuHc~CSgWwpiaPeI7WC~i~CEVG3c84T9TUByxjsZawucgZetRpAUwGnyBTrPGoxuYnS5in4R3Ui880UxBZfRnRZTUsxDh7D1-Bvt3fU2uNySnCHuXKg__",
    "https://s3-alpha-sig.figma.com/img/b17a/117d/ec986eecaf96ccc8522421c0e851c123?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RMCKviBih8vH~6vrymZm-EVgSEWTDA75l8aXBRMkfOWULRDw~P48snrXbcLwjqcmeF3sNt9OSXkA70SxiCnU7tCBzZpRDIMfILEVtXHexygqDAmu97kfOFCZ9vCY0H7jBTGWF9xF2eiCqhRhbVyS-Wvr9iVhMe8Q-ZZrOMIRwIUNbjyWKXVoh8~rPnFNm3cBIGdLHmLozGOzGz1DQ43EdlvyyZUQ4wJFbi-opy6s2kpLpsL~-QQ4laWuQGhr-BBN7QtgA2oUPAvU0EhsgSXDbF7DrGZJdB5Qmqfpol8CtlFl7TYGlt0TX77K0kIAc9jqcarXMhtS1g5-rUI9iZw3kg__",
    "https://s3-alpha-sig.figma.com/img/8b95/b836/364ba981f496d4d2763249027aa50b29?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gCT5twbl8ofY4AwBLthTU7C265oQd~vq6ejnx6y3rPjKXJJNvQkL0mL9f88kYvwLmfOycxR5TV4jegoHJ80YGZDiM2m8Og~MLi0MPOOTlODJEYBHTF1mQPcPiUZqvS40PMjRhcGPErUIWYcbJcZG72PuMqjeIC93JsFiBU2bg8-OX7jzS7UjTVNBXCcFHy5cq~xpXDoGqGVPPTPdDBZ24QHW5Eg5x2xQZmzDRLg3bpYUtwAf7JdVx9AxbYkVBOPuH6QXe3eUTs36X4oD86r5qrWQc4DydeEzrgjdGklYbcZNWhgS~NgadaDS6Dd8uvfbPzAFga9dHJwb6RyfQxvZVw__",
  ];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <CarouselComponent data={data} />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
  },
});

export default App;
