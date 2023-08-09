import { useColorScheme } from "nativewind";
import React, { useEffect, useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpComingMovies,
} from "../api/movieDB";

const ios = Platform.OS == "ios";

export default function HomeScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [trending, setTrending] = useState(null);
  const [upcoming, setUpcoming] = useState(null);
  const [topRated, setTopRated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data.results) setTrending(data.results);
    setIsLoading(false);
  };
  const getUpComingMovies = async () => {
    const data = await fetchUpComingMovies();
    if (data && data.results) setUpcoming(data.results);
    setIsLoading(false);
  };
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    if (data && data.results) setTopRated(data.results);
    setIsLoading(false);
  };

  useEffect(() => {
    getTrendingMovies();
    getUpComingMovies();
    getTopRatedMovies();
  }, []);

  return (
    <View className="flex-1  bg-neutral-800">
      {/* search and logo */}
      <SafeAreaView className={ios ? "-mb-2" : "-mb-3"}>
        {/* <StatusBar style="light" hidden /> */}
        <View className="flex-row justify-between items-center mx-4 my-2">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* Trending movies carousel */}
          {trending && <TrendingMovies data={trending} />}

          {/* Upcoming movies */}
          {upcoming && <MovieList title="Upcoming movies" data={upcoming} />}

          {/* Toprated movies */}
          {topRated && <MovieList title="Top rated movies" data={topRated} />}
        </ScrollView>
      )}
    </View>
  );
}
