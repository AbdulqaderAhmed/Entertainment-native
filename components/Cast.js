import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { image185 } from "../api/movieDB";

export default function Cast({ cast, navigation }) {
  let personName = "Abdulqader Ahmed";
  let characterName = "Jhon wick";

  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Top cast</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                className="mr-4 items-center"
                onPress={() => navigation.navigate("Person", person)}
              >
                <View className="overflow-hidden rounded-full h-20 w-20 item-center border border-neutral-500">
                  <Image
                    source={{
                      uri: image185(person.profile_path),
                    }}
                    className="rounded-2xl h-24 w-20"
                  />
                </View>
                <Text className="text-white text-sm mt-1">
                  {person.character.length > 14
                    ? person.character.slice(0, 14) + "..."
                    : person.character}
                </Text>
                <Text className="text-neutral-400 text-sm mt-1">
                  {person.original_name.length > 14
                    ? person.original_name.slice(0, 14) + "..."
                    : person.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
