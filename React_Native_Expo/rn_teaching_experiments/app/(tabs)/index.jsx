import { View, Text, FlatList, Dimensions, Pressable } from "react-native";
import React, { useReducer } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

function reducer(state, action) {
  if (action.type === "increaseQuantity") {
    return {
      cart: state.cart + action.payload,
    };
  }
  if (action.type === "decreaseQuantity") {
    return {
      cart: state.cart - 1,
    };
  }
  if (action.type === "removeProduct") {
    return {
      cart: state.cart - 1,
    };
  }
  throw Error("Unknown action.");
}

export default function index() {
  const [state, dispatch] = useReducer(reducer, {
    cart: [
      {
        title: "Item 1",
        price: "50",
        id: 1,
        qty: 1,
      },
      {
        title: "Item 2",
        price: "50",
        id: 2,
        qty: 2,
      },
    ],
  });

  const products = [
    {
      title: "Item 1",
      price: "50",
      id: 1,
    },
    {
      title: "Item 2",
      price: "55",
      id: 2,
    },
    {
      title: "Item 3",
      price: "55",
      id: 3,
    },
    {
      title: "Item 4",
      price: "55",
      id: 4,
    },
  ];

  return (
    <SafeAreaView
      style={{
        padding: 10,
      }}
    >
      <Text>Products</Text>

      <FlatList
        data={products}
        numColumns={2}
        contentContainerStyle={{
          gap: 10,
          marginTop: 10,
        }}
        renderItem={({ item, index }) => (
          <View
            style={{
              width: Dimensions.get("window").width / 2 - 15,
              padding: 20,
              backgroundColor: "red",
              borderRadius: 10,
              marginLeft: index % 2 == 1 ? 10 : 0,
            }}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                color: "white",
              }}
            >
              {item.price}
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <Pressable
                onPress={() =>
                  dispatch({ type: "increaseQuantity", payload: [] })
                }
              >
                <Text>+++</Text>
              </Pressable>
              <Pressable>
                <Text>----</Text>
              </Pressable>
            </View>
          </View>
        )}
      />

      <Text>Cart List</Text>

      <FlatList
        data={state.cart}
        contentContainerStyle={{
          gap: 10,
          marginTop: 10,
        }}
        renderItem={({ item }) => (
          <View
            style={{
              width: Dimensions.get("window").width - 20,
              padding: 10,
              backgroundColor: "orange",
              borderRadius: 10,
              flexDirection: "row",
              gap: 10,
            }}
          >
            <View
              style={{
                flexGrow: 1,
              }}
            >
              <Text
                style={{
                  color: "white",
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  color: "white",
                }}
              >
                {item.price}
              </Text>
            </View>

            <Text>Qty: {item.qty}</Text>
            <View
              style={{
                justifyContent: "space-between",
              }}
            >
              <Pressable>
                <Text>+++</Text>
              </Pressable>
              <Pressable>
                <Text>---</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
