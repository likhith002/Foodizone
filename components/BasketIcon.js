import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../features/basketslice";
const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const navigation = useNavigation();

  if (items.length === 0) return null;

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        className="bg-[#00CCBB] mx-5 p-4 rounded-lg flex-row items-center space-x-3"
        onPress={() => navigation.navigate("Basket")}
      >
        <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2 ">
          {items.length}
        </Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center">
          View Basket
        </Text>
        <Text className="text-lg text-white font-extrabold">
          Rs.{basketTotal}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default BasketIcon;
