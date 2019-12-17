import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from "react-native";
import Colors from "../../constants/Colors";
import Card from "../UI/Card";

const ProductItem = props => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <View style={{ flex: 1 }}>
                <Image style={styles.image} source={{ uri: props.image }} />
              </View>
              <View style={{ flex: 1 }}>
                <Text numberOfLines={3} style={styles.title}>
                  {props.description}
                </Text>
              </View>
            </View>
            <View style={styles.actions}>{props.children}</View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 95,
    margin: 20,
    // Set border width.
    borderWidth: 1.5,

    // Set border Hex Color Code Here.
    borderColor: Colors.primary,

    // Setting up Text Font Color.
    color: Colors.primary,

    // Setting Up Background Color of Text component.

    // Adding padding on Text component.
    padding: 6,
    fontSize: 15,
    textAlign: "right",
    margin: 10
  },
  touchable: {
    overflow: "hidden"
  },
  imageContainer: {
    flexDirection: "row",
    width: "100%",
    height: 70
  },
  image: {
    width: "70%",
    height: "100%",
    left: 10,
    top: 5
  },
  details: {
    alignItems: "center",
    height: "17%",
    padding: 10
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 12,
    marginVertical: 4,
    right: 20
  },
  price: {
    fontFamily: "open-sans",
    fontSize: 14,
    color: "#888"
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "23%",
    paddingHorizontal: 20
  }
});

export default ProductItem;
