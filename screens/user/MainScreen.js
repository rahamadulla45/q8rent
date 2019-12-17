import React from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  Platform,
  TouchableNativeFeedback,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from "react-native";

const MainScreen = props => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  const selectItemHandler = () => {
    props.navigation.navigate("Rent");
  };
  const authItemHandler = () => {
    props.navigation.navigate("Auth");
  };
  return (
    <View style={styles.centered}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={selectItemHandler} useForeground>
          <View style={{ alignItems: "center", top: 20 }}>
            <Image
              style={styles.avatar}
              source={require("../../assets/rent.png")}
            />
            <Text style={styles.name}>Rent Offers</Text>
          </View>
        </TouchableCmp>
      </View>
      <View style={styles.touchable}>
        <TouchableCmp onPress={authItemHandler} useForeground>
          <View style={{ alignItems: "center" }}>
            <Image
              style={styles.avatar2}
              source={require("../../assets/user.png")}
            />
            <Text style={styles.name2}>My Account</Text>
          </View>
        </TouchableCmp>
      </View>
    </View>
  );
};
MainScreen.navigationOptions = {
  headerTitle: (
    <Image
      style={{ padding: 100, top: 21, width: "100%", height: 69 }}
      source={require("../../assets/header.png")}
    />
  ),
  headerStyle: { backgroundColor: "#fff", elevation: 0 },
  headerLeft: null
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    flexDirection: "column"
  },
  avatar: {
    height: 150,
    width: "45%"
  },
  avatar2: {
    height: 150,
    width: "55%"
  },
  gradient: {
    flex: 1,
    alignItems: "center"
  },
  gradient1: {
    alignItems: "center"
  },
  touchable: {
    overflow: "hidden"
  },
  name: {
    alignItems: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#354c6d",
    letterSpacing: 1,
    bottom: 25
  },
  name2: {
    alignItems: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#354c6d",
    letterSpacing: 1,
    bottom: 28
  }
});
export default MainScreen;
