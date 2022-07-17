import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text } from "react-native";
import {
  ChevronDownIcon,
  SearchIcon,
  UserIcon,
  AdjustmentsIcon,
} from "react-native-heroicons/outline";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Categories from "../components/Categories";
import FeatureRow from "../components/FeatureRow";
import sanityClient from "../sanity";
const HomeScreen = () => {
  const [faeturedCategories, setfeaturedCategories] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="featured"]{

      ...,
      restaurants[]->{
        ...,
        dishes[]->
      }
    }`
      )
      .then((data) => {
        setfeaturedCategories(data);
      });
  }, []);

  console.log(faeturedCategories);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="bg-white pt-5">
      <View className="flex-row pb-3 items-center mx-4 space-x-2 ">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>

        <UserIcon size={35} color="#00CCBB" />
      </View>

      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row spaxe-x-2 flex-1 bg-gray-200 p-3">
          <SearchIcon color="#00CCBB"></SearchIcon>
          <TextInput
            keyboardType="default"
            placeholder="Restaurants and cuisins"
          ></TextInput>
        </View>
        <AdjustmentsIcon color="#00CCBB"></AdjustmentsIcon>
      </View>

      <ScrollView
        className="bg-gray-100 "
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/*Categories */}
        <Categories></Categories>

        {faeturedCategories?.map((category) => (
          <FeatureRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
