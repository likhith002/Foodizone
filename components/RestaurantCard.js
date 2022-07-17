import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { LocationMarkerIcon, StarIcon } from "react-native-heroicons/outline";
import { TouchableOpacity } from "react-native";
import { UrlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";
const RestaurantCard = ({
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
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="bg-white mr-3 shadow-sm p-1"
      onPress={() => {
        navigation.navigate("Restaurant", {
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
        });
      }}
    >
      <Image
        source={{ uri: UrlFor(imgUrl).url() }}
        className="h-36 w-64 rounded-xl "
      ></Image>
      <View>
        <Text className="font-bold ">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="green" opacity={0.5} size={22}></StarIcon>
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500">{rating}</Text>.{genre}
          </Text>
        </View>
        <View className="flex-row items-center space-x-1">
          <LocationMarkerIcon
            color="gray"
            opacity={0.4}
            size={22}
          ></LocationMarkerIcon>
          <Text className="text-xs text-gray-500 ">
            Nearby.{address.slice(0, 10)}...
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default RestaurantCard;
