import {
  View,
  Text,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles, theme } from "../theme/theme";
import { HeartIcon } from "react-native-heroicons/solid";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import {
  fetchPersonDetail,
  fetchPersonMovieDetail,
  image342,
} from "../api/movieDB";

var { width, height } = Dimensions.get("window");

export default function PersonScreen() {
  const navigation = useNavigation();
  const param = useRoute();
  const [isFav, setIsFav] = useState(false);
  const [personMovie, setPersonMovie] = useState(null);
  const [person, setPerson] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetail(id);
    if (data) setPerson(data);
    setIsLoading(false);
  };

  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovieDetail(id);
    if (data && data.cast) setPersonMovie(data.cast);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getPersonDetails(param.params.id);
    getPersonMovies(param.params.id);
  }, []);

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 15 }}
    >
      {/* back button */}
      <SafeAreaView className="z-20 w-full flex-row justify-between items-center py-3 px-4">
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

      {/* person detail */}

      {isLoading ? (
        <Loading />
      ) : (
        <View>
          <View
            className="flex-row justify-center"
            style={{
              shadowColor: "red",
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
            }}
          >
            <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
              <Image
                source={{ uri: image342(person?.profile_path) }}
                style={{ height: height * 0.43, width: width * 0.74 }}
              />
            </View>
          </View>

          {/* person name */}
          <View className="my-6">
            <Text className="text-white text-3xl font-bold text-center">
              {person?.name}
            </Text>
            <Text className="text-base text-neutral-500 text-center">
              {person?.place_of_birth}
            </Text>
          </View>

          {/* person tab */}
          <View className="mx-3 p-4 my-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
            <View className="border-r-2 border-r-neutral-400 px-2 items-center ">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.gender == 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center ">
              <Text className="text-white font-semibold">BirthDate</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.birthday}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center ">
              <Text className="text-white font-semibold">Known for</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.known_for_department}
              </Text>
            </View>
            <View className=" px-2 items-center ">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.popularity.toFixed(2)} %
              </Text>
            </View>
          </View>

          {/* person biography*/}
          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
              {person?.biography || "No Bio"}
            </Text>
          </View>

          {/* movie list */}
          <MovieList title="Movies" hideSeeAll={true} data={personMovie} />
        </View>
      )}
    </ScrollView>
  );
}
