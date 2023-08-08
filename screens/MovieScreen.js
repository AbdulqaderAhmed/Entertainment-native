import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles, theme } from "../theme/theme";
import { HeartIcon } from "react-native-heroicons/solid";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { LinearGradient } from "expo-linear-gradient";

var { width, height } = Dimensions.get("window");

export default function MovieScreen() {
  let movieName = "Ant-man";
  const { params: item } = useRoute();
  const [isFav, setIsFav] = useState(false);
  const navigation = useNavigation();
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* back button and movie poster */}
      <View className="w-full">
        <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center py-3 px-4">
          <TouchableOpacity
            style={styles.background}
            className="rounded-xl p-1"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsFav(!isFav)}>
            <HeartIcon size="30" color={isFav ? theme.background : "white"} />
          </TouchableOpacity>
        </SafeAreaView>
        <Image
          source={require("../assets/img/AgeProof.png")}
          style={{ width, height: height * 0.55 }}
        />
        <LinearGradient
          colors={["transparent", "rgba(23,23,23, 0.8)", "rgba(23, 23, 23, 1)"]}
          style={{ width, height: height * 0.4 }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          className="absolute bottom-0"
        />

        {/* movie detail */}
        <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
          {/* title */}
          <Text className="text-white text-center text-3xl font-bold tracking-wider">
            {movieName}
          </Text>

          {/* status, release, runtime */}
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Released . 2020 . 170min
          </Text>

          {/* gener */}
          <View className="flex-row justify-center mx-4 space-x-2">
            <Text className="text-neutral-400 font-semibold text-base text-center">
              Action .
            </Text>
            <Text className="text-neutral-400 font-semibold text-base text-center">
              Thrill .
            </Text>
            <Text className="text-neutral-400 font-semibold text-base text-center">
              Comedy .
            </Text>
          </View>

          {/* description */}
          <Text className="text-neutral-400 mx-4 tracking-wide">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
