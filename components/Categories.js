import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native";
import CategoryCard from "./CategoryCard";
import SanityClient, { UrlFor } from "../sanity";
const Categories = () => {
  const [categories, setcategories] = useState([]);
  useEffect(() => {
    SanityClient.fetch(`*[_type=="category"]`)
      .then((data) => {
        setcategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("cattft", categories);
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          imgUrl={UrlFor(category.image).url()}
          title={category.title}
        />
      ))}
      {/* <CategoryCard
        imgUrl="https://media-cdn.tripadvisor.com/media/photo-s/19/3b/00/06/sushi-place.jpg"
        title="test1"
      />
      <CategoryCard imgUrl="https://links.papareact.com/wru" title="test2" />
      <CategoryCard
        imgUrl="https://links.papareact.com/wru"
        title="test3"
      ></CategoryCard>
      <CategoryCard
        imgUrl="https://links.papareact.com/wru"
        title="test3"
      ></CategoryCard>
      <CategoryCard
        imgUrl="https://links.papareact.com/wru"
        title="test3"
      ></CategoryCard>
      <CategoryCard
        imgUrl="https://links.papareact.com/wru"
        title="test3"
      ></CategoryCard>
      <CategoryCard
        imgUrl="https://links.papareact.com/wru"
        title="test3"
      ></CategoryCard> */}
    </ScrollView>
  );
};

export default Categories;
