import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { styles } from "../theme/theme";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";

const ios = Platform.OS == "ios";

export default function HomeScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [trending, setTrending] = useState([1, 2, 3]);
  const [upcoming, setUpcoming] = useState([1, 2, 3]);
  const [topRated, setTopRated] = useState([1, 2, 3]);

  return (
    <View className="flex-1  bg-neutral-800">
      {/* search and logo */}
      <SafeAreaView className={ios ? "-mb-2" : "-mb-3"}>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <View className="flex-row justify-between items-center mx-4 my-2">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {/* Trending movies carousel */}
        <TrendingMovies data={trending} />

        {/* Upcoming movies */}
        <MovieList title="Upcoming movies" data={upcoming} />

        {/* Toprated movies */}
        <MovieList title="Top rated movies" data={topRated} />
      </ScrollView>
    </View>
  );
}
