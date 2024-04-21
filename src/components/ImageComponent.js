import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const ImageComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={require("../../assets/todoList.png")}
          style={styles.image}
        />
      </View>

      <Text style={styles.text}>Add New Task</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 10,
  },
  imageWrapper: {
    paddingVertical: 4,
  },
  image: {
    height: 300,
    width: 300,
  },
  text: {
    marginVertical: 50,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ImageComponent;
