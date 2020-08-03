import flightFoodData from '../../../helpers/data/flightFoodData';
import foodData from '../../../helpers/data/foodData';

const createFlightFoodsTable = (flightId) => {
  const flightFoods = [];
  const domestic = $('#domestic-flight').prop('checked');
  const international = $('#international-flight').prop('checked');

  foodData.getFoods()
    .then((foods) => {
      foods.forEach((food) => {
        const foodObj = food.id;
        console.warn(foodObj);
        if (food.isAvailable === true && international === true) {
          flightFoods.push(foodObj);
        } else if (food.isAvailable === true && domestic === true && food.type === 'snack') {
          flightFoods.push(foodObj);
        }
      });
      flightFoods.forEach((foodItem) => {
        const newFlightFoodObj = {
          flightId,
          foodId: foodItem,
        };
        console.warn(newFlightFoodObj);
        flightFoodData.addFlightFoods(newFlightFoodObj)
          .then((response) => console.error(response.data))
          .catch((err) => console.error(err));
      });
    })
    .catch((err) => console.error('could not get foods', err));
};

export default { createFlightFoodsTable };
