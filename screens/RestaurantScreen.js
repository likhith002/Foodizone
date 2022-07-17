import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useLayoutEffect, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LocationMarkerIcon,
  StarIcon,
} from "react-native-heroicons/solid";
import BasketIcon from "../components/BasketIcon";
import DishRow from "../components/DishRow";
import { UrlFor } from "../sanity";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";
const RestaurantScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      })
    );
  }, []);

  return (
    <>
      <BasketIcon></BasketIcon>
      <ScrollView>
        <View className="relative">
          <Image
            source={{ uri: UrlFor(imgUrl).url() }}
            className="w-full h-56 bg-gray-300 p-4"
          ></Image>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute  top-14 p-2 bg-gray-100 left-5 rounded-full"
          >
            <ArrowLeftIcon size={20} color="#00CCBB" />
          </TouchableOpacity>
        </View>
        <View className="bg-white ">
          <View className="px-4 pt-4">
            <Text className="text-2xl font-bold ">{title}</Text>

            <View className="flex-row space-x-2 my-1 ">
              <View className="flex-row items-center space-x-2">
                <StarIcon color="green" opacity={0.5} size={22}></StarIcon>
                <Text className="text-xs text-gray-500 justify-between">
                  <Text className="text-green-500">{rating}</Text> {genre}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center ">
              <LocationMarkerIcon
                color="gray"
                opacity={0.4}
                size={22}
              ></LocationMarkerIcon>
              <Text className="text-xs text-gray-500 py-4">
                <Text className="text-gray-500"></Text>.{address}
              </Text>
            </View>

            <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
          </View>

          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
            <QuestionMarkCircleIcon
              color="gray"
              opacity={0.6}
              size={20}
            ></QuestionMarkCircleIcon>

            <Text className="pl-2 flex-1 text-md font-bold">
              Have a food allergy?
            </Text>
            <ChevronRightIcon color="#00CCBB"></ChevronRightIcon>
          </TouchableOpacity>
        </View>
        <View className="pb-36">
          <Text className="pt-6 mb-3 font-bold text-xl">Menu</Text>

          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            ></DishRow>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({});

export default RestaurantScreen;
