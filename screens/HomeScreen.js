import React, { useEffect, useLayoutEffect, useState } from "react";
import { Image, Text, View, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  AdjustmentsIcon,
  ChevronDownIcon,
  SearchIcon,
  UserIcon,
} from "react-native-heroicons/solid";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";

function HomeScreen() {
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == 'featured'] {
      ...,
      dishes[]->{
        ...,
      }
    }`
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  // console.log("featuredCategories", featuredCategories);

  return (
    <SafeAreaView className="flex ">
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3">
          <SearchIcon color="skyblue" />
          <TextInput
            placeholder="Resturants and cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsIcon color="#00CCBB" />
      </View>

      {/* Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Categories */}
        <Categories />
        {/* Featured Rows */}
        {featuredCategories.map((category) => (
          <FeaturedRow
            key={category?._id}
            id={category?._id}
            title={category?.name}
            description={category?.short_description}
            featuredCategory="featured"
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
