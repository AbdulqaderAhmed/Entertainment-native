import { View, Text, Dimensions } from "react-native";
import * as Progress from "react-native-progress";
import React from "react";
import { theme } from "../theme/theme";

var { width, height } = Dimensions.get("window");

export default function Loading() {
  return (
    <View
      style={{ width, height }}
      className="absolute flex-row justify-center items-center"
    >
      <Progress.CircleSnail
        thickness={12}
        size={160}
        color={theme.background}
      />
    </View>
  );
}
