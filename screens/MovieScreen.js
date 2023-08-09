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
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles, theme } from "../theme/theme";
import { HeartIcon } from "react-native-heroicons/solid";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchMovieSimilars,
  image500,
} from "../api/movieDB";

var { width, height } = Dimensions.get("window");

export default function MovieScreen() {
  const params = useRoute();
  const [isFav, setIsFav] = useState(false);
  const [cast, setCast] = useState(null);
  const [similiarMovies, setSimilarMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState(null);
  const navigation = useNavigation();

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    if (data) setMovie(data);
    setIsLoading(false);
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    if (data && data.cast) setCast(data.cast);
    setIsLoading(false);
  };

  const getMovieSimilar = async (id) => {
    const data = await fetchMovieSimilars(id);
    if (data && data.results) setSimilarMovies(data.results);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getMovieDetails(params.params.id);
    getMovieCredits(params.params.id);
    getMovieSimilar(params.params.id);
  }, []);

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

        {isLoading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={{ uri: image500(movie?.poster_path) }}
              style={{ width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={[
                "transparent",
                "rgba(23,23,23, 0.8)",
                "rgba(23, 23, 23, 1)",
              ]}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        )}

        {/* movie detail */}
        <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
          {/* title */}
          <Text className="text-white text-center text-3xl font-bold tracking-wider">
            {movie?.original_title}
          </Text>

          {/* status, release, runtime */}
          {movie?.id && (
            <Text className="text-neutral-400 font-semibold text-base text-center">
              {movie?.status} . {movie?.release_date?.split("-")[0]} .{" "}
              {movie?.runtime} min
            </Text>
          )}

          {/* gener */}
          <View className="flex-row justify-center mx-4 space-x-2">
            {movie?.genres?.map((genre, index) => {
              let showDot = index + 1 != movie.genres.length;
              return (
                <Text
                  key={index}
                  className="text-neutral-400 font-semibold text-base text-center"
                >
                  {genre.name} {showDot ? "." : null}
                </Text>
              );
            })}
          </View>

          {/* description */}
          <Text className="text-neutral-400 mx-4 tracking-wide">
            {movie?.overview}
          </Text>
        </View>
      </View>

      {/* cast */}
      {cast?.length > 0 && <Cast cast={cast} navigation={navigation} />}

      {/* similar movies */}
      {similiarMovies?.length > 0 && (
        <MovieList
          title="Similar movies"
          hideSeeAll={true}
          data={similiarMovies}
        />
      )}
    </ScrollView>
  );
}
