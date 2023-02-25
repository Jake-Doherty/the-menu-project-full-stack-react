INSERT into
  recipes (
    dish_name, -- dish_name is a required text field
    user_id, -- user_id is a required varchar field
    ingredients, -- ingredients is a required jsonb field
    instructions, -- instructions is a required jsonb field
    notes -- notes is an optional text field
  )
values
  (
    'Banana Bread',
    '736ebaa2-7f9d-4c50-97ea-7f62d92b919d',
    '[{"unit": "cup", "quantity": 1, "ingredientName": "flour"}, {"unit": "cup", "quantity": 1, "ingredientName": "sugar"}, {"unit": "cup", "quantity": 1, "ingredientName": "butter"}, {"unit": "cup", "quantity": 1, "ingredientName": "milk"}, {"unit": "cup", "quantity": 1, "ingredientName": "eggs"}, {"unit": "cup", "quantity": 1, "ingredientName": "bananas"}]',
    '[{"step": 1, "instruction": "Preheat oven to 350 degrees F (175 degrees C). Grease and flour a 9x5 inch loaf pan."}, {"step": 2, "instruction": "In a large bowl, combine flour, sugar, baking powder, baking soda and salt. In another bowl, beat eggs, bananas, milk and butter. Stir into dry ingredients just until moistened. Pour batter into prepared pan."}, {"step": 3, "instruction": "Bake in preheated oven for 60 to 65 minutes, or until a toothpick inserted into center of the loaf comes out clean. Cool in pan for 10 minutes, then turn out onto a wire rack."}]',
    'This is a great recipe for banana bread!'
  );


  