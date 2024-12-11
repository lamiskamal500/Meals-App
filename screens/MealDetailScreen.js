import { MEALS } from "../data/dummy-data";
import { useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import List from "../components/MealDetail/List";
import MealDetails from "../components/MealDetails";
import SubTitle from "../components/MealDetail/SubTitle";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import IconButton from "../components/IconButton";
import { addFavorite, removeFavorites } from "../store/redux/favorites";

const MealDetailScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const favoriteMealsIds = useSelector((state) => state.favoriteMeals.ids);
  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  const mealsFavorite = favoriteMealsIds.includes(mealId);

  function changeFavoritesStatusHandler() {
    if (mealsFavorite) {
      dispatch(removeFavorites({ id: mealId }));
    } else {
      dispatch(addFavorite({ id: mealId }));
    }
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            onPress={changeFavoritesStatusHandler}
            icon="star"
            color="white"
          />
        );
      },
    });
  }, [navigation, changeFavoritesStatusHandler]);
  return (
    <ScrollView style={styles.rootContainer}>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <SubTitle>Ingredients</SubTitle>
          <List data={selectedMeal.ingredients} />
          <SubTitle>Steps</SubTitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
};

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});
