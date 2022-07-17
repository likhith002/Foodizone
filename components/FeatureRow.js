import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import SanityClient from "../sanity";

const FeatureRow = ({ id, title, description }) => {
  const [restaurants, setrestaurants] = useState([]);
  useEffect(() => {
    SanityClient.fetch(
      `*[_type=="featured" && _id==$id ]{
     ...,
      restaurants[]->{
        ...,
        dishes[]->,
        type->{
          title
        }
      }
    }[0]`,
      { id: id }
    ).then((data) => {
      setrestaurants(data?.restaurants);
    });
  }, []);

  console.log(restaurants);

  return (
    <View>
      <View className="mt-4 items-center flex-row justify-between px-4">
        <Text className="font-bold text-lg ">{title}</Text>
        <ArrowRightIcon color="#00CCBB"></ArrowRightIcon>
      </View>

      <Text className="text-ws text-gray-500 px-4">{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type?.title}
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default FeatureRow;
