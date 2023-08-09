import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import { debounce } from "lodash";
import { fetchSearchMovie, image185 } from "../api/movieDB";

var { width, height } = Dimensions.get("window");

export default function SearchScreen() {
  const navigation = useNavigation();
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleSearch = (value) => {
    if (value && value.length > 2) {
      setIsLoading(true);
      fetchSearchMovie({
        query: value,
        language: "en-us",
        page: "1",
      }).then((res) => {
        setIsLoading(false);
        if (res && res.results) setResults(res.results);
      });
    } else {
      setIsLoading(false);
      setResults([]);
    }
  };

  const handleTextdebounce = useCallback(debounce(handleSearch, 400), []);

  // useEffect(() => {
  //   getSearchMovies(name)
  // }, [])

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 my-3 flex-row justify-between items-center border-2 border-neutral-300 rounded-full">
        <TextInput
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          className="py-1 px-6 flex-1 text-base font-semibold text-white tracking-wider"
          onChangeText={handleTextdebounce}
        />

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>

      {/* results */}

      {isLoading ? (
        <Loading />
      ) : results?.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Results({results?.length})
          </Text>

          {/* movie list */}
          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigation.push("Movie", item)}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      source={{ uri: image185(item.poster_path) }}
                      style={{ width: width * 0.44, height: height * 0.3 }}
                    />
                    <Text className="text-neutral-300 ml-1">
                      {item.title.length > 14
                        ? item.title.slice(0, 14) + "..."
                        : item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/img/AgeProof.png")}
            className="h-96 w-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
}
