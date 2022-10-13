import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import sanityClient, { urlFor } from "../sanity";

const Categories = () => {
  const [catergories, setCategories] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == 'category'] {
      ...,
     
    }`
      )
      .then((data) => {
        setCategories(data);
      });
  }, []);

  console.log("catergories", catergories);

  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {catergories.map((category) => (
        <CategoryCard
          key={category._id}
          imageUrl={urlFor(category.image).width(200).url()}
          title={category.name}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
