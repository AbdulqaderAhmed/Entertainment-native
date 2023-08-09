import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import { styles } from "../theme/theme";
import { useNavigation } from "@react-navigation/native";
import { image185 } from "../api/movieDB";

var { width, height } = Dimensions.get("window");

export default function MovieList({ title, data, hideSeeAll }) {
  let movieName = "Ant-man";
  const navigation = useNavigation();

  return (
    <View className="my-5 space-y-4">
      <View className="flex-row mx-4 justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.text} className="text-lg">
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* movie row */}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data &&
          data.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push("Movie", item)}
              >
                <View className="space-y-1 mr-4">
                  <Image
                    source={{ uri: image185(item.poster_path) }}
                    className="rounded-xl"
                    style={{ width: width * 0.33, height: height * 0.22 }}
                  />
                  <Text className="text-neutral-300 ml-1">
                    {item.title.length > 22
                      ? item.title.slice(0, 22) + "..."
                      : item.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
      </ScrollView>
    </View>
  );
}
