import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { selectRestaurant } from "../features/restaurantSlice";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketslice";
import { useDispatch, useSelector } from "react-redux";
import { XCircleIcon } from "react-native-heroicons/solid";
import { UrlFor } from "../sanity";
const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  const basketTotal = useSelector(selectBasketTotal);
  const items = useSelector(selectBasketItems);

  const dispatch = useDispatch();

  const [groupedItemsInBasket, setgroupedItemsInBasket] = useState([]);

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setgroupedItemsInBasket(groupedItems);
  }, [items]);

  console.log("grouped", groupedItemsInBasket);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
          <Text className="text-lg font-bold text-center ">Basket</Text>
          <Text className="text-center text-gray-400">{restaurant.title}</Text>
        </View>

        <TouchableOpacity
          onPress={navigation.goBack}
          className="rounded-full bg-gray-100 absolute top-3 right-5"
        >
          <XCircleIcon color="#00CCBB" height={50} width={50}></XCircleIcon>
        </TouchableOpacity>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full "
          ></Image>
          <Text className="flex-1">Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white px-5 py-2"
            >
              <Text className="text-[#00CCBB]">{items.length} x</Text>
              <Image
                source={{ uri: UrlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              ></Image>
              <Text className="flex-1">{items[0]?.name} </Text>

              <Text className="text-gray-600">{items[0]?.price}</Text>

              <TouchableOpacity>
                <Text
                  className="text-[#00CCBB] text-xs"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {basketTotal > 0 && (
          <View className="p-5 mt-5 bg-white space-y-4">
            <View className="flex-row justify-between">
              <Text className="text-gray-400">Subtotal</Text>
              <Text className="text-gray-400">Rs.{basketTotal}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-400">Delivery Fee</Text>
              <Text className="text-gray-400">Rs.{100}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="">Order Total</Text>

              <Text className="font-extrabold">Rs.{basketTotal + 100}</Text>
            </View>

            <TouchableOpacity
              className="rounded-lg bg-[#00CCBB] p-4"
              onPress={() => navigation.navigate("PreparingOrderScreen")}
            >
              <Text className="text-center text-white text-lg font-bold">
                Place Order
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
