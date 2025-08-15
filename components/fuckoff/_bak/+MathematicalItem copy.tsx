// MathematicalItem.tsx
import React from "react";
import { StyleSheet, View } from "react-native";
import  MathView  from "react-native-math-view";


type Props = { latexFact?: string };

export default function MathematicalItem({ latexFact }: Props) {
  return (
    <View style={styles.container}>
      {/* Inline or block LaTeX; escape backslashes in strings */}
      <MathView
        math={String.raw`\int_0^\pi \sin(x)\,dx = 2`}
        // Optional: tweak style/zoom if needed
        style={{ width: "100%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, width: "100%" },
});
