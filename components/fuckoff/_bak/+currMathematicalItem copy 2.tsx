import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
// import MathView from "react-native-math-view";
import MathView from "react-native-math-view/src/fallback";

type Props = { latexFact?: string, scale: number };

export default function MathematicalItem(prop:Props) {
  const [height, setHeight] = React.useState(25);
  const [width, setWidth] = React.useState(150);
  const scale = prop.scale; // Adjust zoom level as needed
  return (
    // <View style={[styles.math, {height: height * scale, width: width * scale}] }>
    <View style={[styles.math, {height: height * scale, width: width * scale, transform: [{ scale: scale }]}]}>
      <MathView math={String.raw`${prop?.latexFact}`} />
    </View>
  );
}

const styles = StyleSheet.create({
  math: {
    overflow:"visible",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(239, 245, 57, 0.76)",
    // alignItems: "center",
    // marginTop: 15,
    // marginBottom: 20,
    // fontSize: 25,
  }
});
