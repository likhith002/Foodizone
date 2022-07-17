import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { UrlFor } from "../sanity";

import { useSelector, useDispatch } from "react-redux";
import {
  addToBasket,
  selectBasketItems,
  selectBasketItemsWithId,
  removeFromBasket,
} from "../features/basketslice";
const DishRow = ({ id, name, description, price, image }) => {
  const [isPressed, setisPressed] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector((state) => selectBasketItemsWithId(state, id));
  const addintoBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };

  const removeItemFromBasket = () => {
    if (!items.length > 0) return;

    dispatch(removeFromBasket({ id }));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setisPressed(!isPressed)}
        className={`bg-white border p-4 border-gray-200 ${
          isPressed && "border-b-0"
        }`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2 ">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="text-gray-400 mt-2">
              <Text className="text-red-400 text-sm">Rs.{price}</Text>
            </Text>
          </View>

          <View>
            <Image
              style={{ borderWidth: 1, borderColor: "F3F3F4" }}
              source={{ uri: UrlFor(image).url() }}
              className="h-20 w-20 p-4 bg-gray-300"
            ></Image>
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity
              onPress={removeItemFromBasket}
              disabled={!items.length}
            >
              <MinusCircleIcon
                color={items.length > 0 ? "#00CCBB" : "gray"}
                size={40}
              ></MinusCircleIcon>
            </TouchableOpacity>

            <Text>{items.length}</Text>

            <TouchableOpacity onPress={addintoBasket}>
              <PlusCircleIcon color="#00CCBB" size={40}></PlusCircleIcon>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default DishRow;
