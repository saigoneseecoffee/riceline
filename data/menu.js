/* RICELINE MENU DATA
   Prices, names and descriptions live here. To change a price, edit the "price" (or "bowlPrice"
   for Build-Your-Own proteins) and save. Calories (cal), protein (p), carbs (c), fat (f) are
   per portion, calculated from the recipes in the Riceline Google Sheet with USDA reference values.
   Safe to edit by hand: keep the quotes, commas and brackets exactly as they are. */
window.RICELINE_MENU = {
 "components": [
  {
   "id": "jasmine",
   "name": "Jasmine Rice",
   "step": "base",
   "oz": 7,
   "portion": "7 oz scoop",
   "cal": 289.7,
   "p": 5.6,
   "c": 63.5,
   "f": 0.6,
   "allergens": [],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": true,
    "df": true
   },
   "spicy": 0,
   "desc": "Fragrant Thai jasmine, steamed fresh every 45 min."
  },
  {
   "id": "brown",
   "name": "Brown Rice",
   "step": "base",
   "oz": 7,
   "portion": "7 oz scoop",
   "cal": 271.9,
   "p": 5.8,
   "c": 56.6,
   "f": 2.1,
   "allergens": [],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": true,
    "df": true
   },
   "spicy": 0,
   "desc": "Whole-grain, nutty, more fiber."
  },
  {
   "id": "coconut",
   "name": "Coconut Rice & Peas",
   "step": "base",
   "oz": 7,
   "portion": "7 oz scoop",
   "cal": 322.7,
   "p": 7.5,
   "c": 53.5,
   "f": 8.6,
   "allergens": [
    "Coconut"
   ],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": true,
    "df": true
   },
   "spicy": 0,
   "desc": "Jamaican-style rice simmered in coconut milk with red kidney beans.",
   "labelCheck": "Jerk seasoning blend — label checked by staff"
  },
  {
   "id": "turmeric",
   "name": "Turmeric Basmati",
   "step": "base",
   "oz": 7,
   "portion": "7 oz scoop",
   "cal": 292.7,
   "p": 6.1,
   "c": 59.8,
   "f": 2.5,
   "allergens": [],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": true,
    "df": true
   },
   "spicy": 0,
   "desc": "Long-grain basmati bloomed with turmeric and bay leaf."
  },
  {
   "id": "friedrice",
   "name": "Egg Fried Rice",
   "step": "base",
   "oz": 8,
   "portion": "8 oz scoop",
   "cal": 353.2,
   "p": 10.2,
   "c": 52.7,
   "f": 10.8,
   "allergens": [
    "Egg",
    "Soy",
    "Wheat",
    "Sesame"
   ],
   "diet": {
    "vegan": false,
    "veg": true,
    "gf": false,
    "df": true
   },
   "spicy": 0,
   "desc": "Day-old rice wok-fried with egg, peas, carrot and scallion.",
   "price": 1.5
  },
  {
   "id": "bulgogi",
   "name": "Bulgogi Beef",
   "step": "protein",
   "oz": 4,
   "portion": "4 oz",
   "cal": 412.8,
   "p": 30.0,
   "c": 14.1,
   "f": 26.1,
   "allergens": [
    "Soy",
    "Wheat",
    "Sesame"
   ],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": false,
    "df": true
   },
   "spicy": 0,
   "desc": "Shaved ribeye in Asian-pear, garlic & sesame marinade, seared to order.",
   "cls": "beef",
   "bowlPrice": 11.5
  },
  {
   "id": "mongolian",
   "name": "Mongolian Beef",
   "step": "protein",
   "oz": 4,
   "portion": "4 oz",
   "cal": 414.9,
   "p": 27.7,
   "c": 18.5,
   "f": 25.4,
   "allergens": [
    "Soy",
    "Wheat"
   ],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": false,
    "df": true
   },
   "spicy": 1,
   "desc": "Ribeye glazed with soy, brown sugar, ginger & a pinch of chili.",
   "cls": "beef",
   "bowlPrice": 11.0
  },
  {
   "id": "birria",
   "name": "Birria Beef",
   "step": "protein",
   "oz": 4,
   "portion": "4 oz",
   "cal": 388.8,
   "p": 32.6,
   "c": 6.5,
   "f": 25.3,
   "allergens": [],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": true,
    "df": true
   },
   "spicy": 1,
   "desc": "Beef chuck braised 4 hours in guajillo chile, shredded.",
   "cls": "beef",
   "bowlPrice": 12.0
  },
  {
   "id": "teriyaki",
   "name": "Teriyaki Chicken",
   "step": "protein",
   "oz": 4,
   "portion": "4 oz",
   "cal": 209.9,
   "p": 30.1,
   "c": 2.8,
   "f": 8.0,
   "allergens": [
    "Soy",
    "Wheat"
   ],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": false,
    "df": true
   },
   "spicy": 0,
   "desc": "Char-grilled chicken thigh, teriyaki glaze.",
   "cls": "chicken",
   "bowlPrice": 9.5
  },
  {
   "id": "adobo",
   "name": "Chicken Adobo",
   "step": "protein",
   "oz": 5,
   "portion": "5 oz",
   "cal": 230.5,
   "p": 32.5,
   "c": 3.9,
   "f": 8.4,
   "allergens": [
    "Soy",
    "Wheat"
   ],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": false,
    "df": true
   },
   "spicy": 0,
   "desc": "Thigh braised in soy, vinegar, garlic & bay leaf — served with its sauce.",
   "cls": "chicken",
   "bowlPrice": 9.0
  },
  {
   "id": "jerk",
   "name": "Jerk Chicken",
   "step": "protein",
   "oz": 4,
   "portion": "4 oz",
   "cal": 238.3,
   "p": 31.7,
   "c": 4.7,
   "f": 9.7,
   "allergens": [],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": true,
    "df": true
   },
   "spicy": 2,
   "desc": "Lime-jerk marinated thigh, grilled for char.",
   "labelCheck": "Jerk seasoning blend — ask for the label",
   "cls": "chicken",
   "bowlPrice": 10.0,
   "mayContain": []
  },
  {
   "id": "gochujang",
   "name": "Gochujang Chicken",
   "step": "protein",
   "oz": 4,
   "portion": "4 oz",
   "cal": 223.1,
   "p": 25.9,
   "c": 10.2,
   "f": 8.1,
   "allergens": [
    "Soy",
    "Wheat",
    "Sesame"
   ],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": false,
    "df": true
   },
   "spicy": 2,
   "desc": "Grilled thigh tossed in sweet-hot Korean chili glaze.",
   "cls": "chicken",
   "bowlPrice": 10.0
  },
  {
   "id": "tikka",
   "name": "Chicken Tikka Masala",
   "step": "protein",
   "oz": 6,
   "portion": "6 oz",
   "cal": 300.5,
   "p": 34.3,
   "c": 9.1,
   "f": 13.4,
   "allergens": [
    "Milk"
   ],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": true,
    "df": false
   },
   "spicy": 1,
   "desc": "Yogurt-marinated chicken roasted, then folded into creamy tikka masala sauce.",
   "labelCheck": "Tikka masala sauce is a purchased product — may contain tree nuts; ask for the label",
   "cls": "chicken",
   "bowlPrice": 10.0,
   "mayContain": [
    "Tree nuts"
   ]
  },
  {
   "id": "tofu",
   "name": "Sesame Garlic Tofu",
   "step": "protein",
   "oz": 4.5,
   "portion": "4.5 oz",
   "cal": 290.8,
   "p": 20.6,
   "c": 15.0,
   "f": 17.9,
   "allergens": [
    "Soy",
    "Wheat",
    "Sesame"
   ],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": false,
    "df": true
   },
   "spicy": 0,
   "desc": "Crispy roasted tofu in a sesame-garlic glaze. Plant-based.",
   "cls": "tofu",
   "bowlPrice": 9.0
  },
  {
   "id": "broccoli",
   "name": "Garlic Broccoli",
   "step": "veg",
   "oz": 3,
   "portion": "3 oz",
   "cal": 49.4,
   "p": 2.7,
   "c": 6.7,
   "f": 2.1,
   "allergens": [],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": true,
    "df": true
   },
   "spicy": 0,
   "desc": "Steamed crisp-tender, tossed in garlic oil."
  },
  {
   "id": "bulgogiveg",
   "name": "Bulgogi Veg",
   "step": "veg",
   "oz": 3,
   "portion": "3 oz",
   "cal": 47.5,
   "p": 1.4,
   "c": 6.3,
   "f": 2.2,
   "allergens": [
    "Soy",
    "Wheat",
    "Sesame"
   ],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": false,
    "df": true
   },
   "spicy": 0,
   "desc": "Zucchini, carrot & onion stir-fried with soy and sesame."
  },
  {
   "id": "greenbeans",
   "name": "Adobo Green Beans",
   "step": "veg",
   "oz": 3,
   "portion": "3 oz",
   "cal": 47.3,
   "p": 1.9,
   "c": 7.1,
   "f": 1.9,
   "allergens": [
    "Soy",
    "Wheat"
   ],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": false,
    "df": true
   },
   "spicy": 0,
   "desc": "Blistered with garlic and black pepper."
  },
  {
   "id": "cauliflower",
   "name": "Turmeric Roasted Cauliflower",
   "step": "veg",
   "oz": 3,
   "portion": "3 oz",
   "cal": 54.1,
   "p": 2.4,
   "c": 6.3,
   "f": 2.9,
   "allergens": [],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": true,
    "df": true
   },
   "spicy": 0,
   "desc": "Roasted at high heat with turmeric & cumin."
  },
  {
   "id": "cabbage",
   "name": "Wok Cabbage & Peppers",
   "step": "veg",
   "oz": 3,
   "portion": "3 oz",
   "cal": 46.7,
   "p": 1.5,
   "c": 7.1,
   "f": 1.8,
   "allergens": [
    "Soy",
    "Wheat"
   ],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": false,
    "df": true
   },
   "spicy": 0,
   "desc": "Crisp-edged cabbage, red pepper & onion."
  },
  {
   "id": "cucumber",
   "name": "Sesame Cucumber",
   "step": "topping",
   "oz": 1.5,
   "portion": "1.5 oz",
   "cal": 15.1,
   "p": 0.4,
   "c": 2.7,
   "f": 0.5,
   "allergens": [
    "Sesame"
   ],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": true,
    "df": true
   },
   "spicy": 0
  },
  {
   "id": "dochua",
   "name": "Pickled Carrot",
   "step": "topping",
   "oz": 1,
   "portion": "1 oz",
   "cal": 18.2,
   "p": 0.3,
   "c": 4.4,
   "f": 0.1,
   "allergens": [],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": true,
    "df": true
   },
   "spicy": 0,
   "desc": "Sweet-and-sour pickled carrot, Saigon style — our signature."
  },
  {
   "id": "redonion",
   "name": "Pickled Red Onion",
   "step": "topping",
   "oz": 0.75,
   "portion": "0.75 oz",
   "cal": 12.2,
   "p": 0.3,
   "c": 2.9,
   "f": 0.0,
   "allergens": [],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": true,
    "df": true
   },
   "spicy": 0
  },
  {
   "id": "slaw",
   "name": "Lime Slaw",
   "step": "topping",
   "oz": 1.5,
   "portion": "1.5 oz",
   "cal": 24.1,
   "p": 0.6,
   "c": 3.9,
   "f": 1.1,
   "allergens": [],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": true,
    "df": true
   },
   "spicy": 0
  },
  {
   "id": "cilonion",
   "name": "Cilantro-Onion",
   "step": "topping",
   "oz": 0.75,
   "portion": "0.75 oz",
   "cal": 8.3,
   "p": 0.3,
   "c": 1.9,
   "f": 0.1,
   "allergens": [],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": true,
    "df": true
   },
   "spicy": 0
  },
  {
   "id": "scallions",
   "name": "Scallions",
   "step": "topping",
   "oz": 0.25,
   "portion": "pinch",
   "cal": 2.5,
   "p": 0.1,
   "c": 0.6,
   "f": 0.0,
   "allergens": [],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": true,
    "df": true
   },
   "spicy": 0
  },
  {
   "id": "s_teriyaki",
   "name": "Teriyaki Sauce",
   "step": "sauce",
   "oz": 1.5,
   "portion": "1.5 oz",
   "cal": 43.5,
   "p": 2.7,
   "c": 8.8,
   "f": 0.0,
   "allergens": [
    "Soy",
    "Wheat"
   ],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": false,
    "df": true
   },
   "spicy": 0
  },
  {
   "id": "s_gochujang",
   "name": "Gochujang Sauce",
   "step": "sauce",
   "oz": 1,
   "portion": "1 oz",
   "cal": 49.8,
   "p": 0.9,
   "c": 8.0,
   "f": 1.6,
   "allergens": [
    "Soy",
    "Wheat",
    "Sesame"
   ],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": false,
    "df": true
   },
   "spicy": 2
  },
  {
   "id": "s_brown",
   "name": "Garlic-Ginger Brown Sauce",
   "step": "sauce",
   "oz": 1.5,
   "portion": "1.5 oz",
   "cal": 29.7,
   "p": 0.8,
   "c": 5.6,
   "f": 0.6,
   "allergens": [
    "Soy",
    "Wheat",
    "Sesame",
    "Mollusk (oyster)"
   ],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": false,
    "df": true
   },
   "spicy": 0
  },
  {
   "id": "s_mayo",
   "name": "Spicy Mayo",
   "step": "sauce",
   "oz": 1,
   "portion": "1 oz",
   "cal": 143.6,
   "p": 0.3,
   "c": 2.0,
   "f": 15.0,
   "allergens": [
    "Egg",
    "Sesame"
   ],
   "diet": {
    "vegan": false,
    "veg": true,
    "gf": true,
    "df": true
   },
   "spicy": 1
  },
  {
   "id": "s_nuoccham",
   "name": "Garlic-Lime Fish Sauce",
   "step": "sauce",
   "oz": 1.5,
   "portion": "1.5 oz cup",
   "cal": 31.6,
   "p": 0.5,
   "c": 8.1,
   "f": 0.0,
   "allergens": [
    "Fish"
   ],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": true,
    "df": true
   },
   "spicy": 1,
   "desc": "Light, tangy Saigon-style dipping sauce: fish sauce, lime, garlic, chili."
  },
  {
   "id": "s_raita",
   "name": "Cucumber Raita",
   "step": "sauce",
   "oz": 1.5,
   "portion": "1.5 oz",
   "cal": 17.9,
   "p": 2.5,
   "c": 1.9,
   "f": 0.1,
   "allergens": [
    "Milk"
   ],
   "diet": {
    "vegan": false,
    "veg": true,
    "gf": true,
    "df": false
   },
   "spicy": 0
  },
  {
   "id": "s_consomme",
   "name": "Birria Consommé (4 oz cup)",
   "step": "sauce",
   "oz": 4,
   "portion": "4 oz cup",
   "cal": 60,
   "p": 3,
   "c": 2,
   "f": 4.5,
   "allergens": [],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": true,
    "df": true
   },
   "spicy": 0,
   "desc": "Rich chile-beef broth for dipping or pouring."
  },
  {
   "id": "sesame",
   "name": "Toasted Sesame",
   "step": "finish",
   "oz": 0.1,
   "portion": "1 shake",
   "cal": 16.2,
   "p": 0.5,
   "c": 0.7,
   "f": 1.4,
   "allergens": [
    "Sesame"
   ],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": true,
    "df": true
   },
   "spicy": 0
  },
  {
   "id": "crispyonion",
   "name": "Crispy Onions",
   "step": "finish",
   "oz": 0.25,
   "portion": "pinch",
   "cal": 45,
   "p": 0.5,
   "c": 3,
   "f": 3.4,
   "allergens": [
    "Wheat",
    "Soy"
   ],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": false,
    "df": true
   },
   "spicy": 0
  },
  {
   "id": "lime",
   "name": "Lime Wedge",
   "step": "finish",
   "oz": 0.125,
   "portion": "1/8 lime",
   "cal": 2.5,
   "p": 0.1,
   "c": 0.9,
   "f": 0,
   "allergens": [],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": true,
    "df": true
   },
   "spicy": 0
  }
 ],
 "addons": [
  {
   "id": "avocado",
   "name": "Avocado (½, fanned)",
   "price": 2.0,
   "cal": 135,
   "p": 1.7,
   "c": 7.3,
   "f": 12.5,
   "allergens": [],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": true,
    "df": true
   }
  },
  {
   "id": "egg",
   "name": "Soft Scrambled Egg",
   "price": 1.5,
   "cal": 123.5,
   "p": 9.4,
   "c": 0.6,
   "f": 8.9,
   "allergens": [
    "Egg"
   ],
   "diet": {
    "vegan": false,
    "veg": true,
    "gf": true,
    "df": true
   }
  },
  {
   "id": "extrarice",
   "name": "Extra Rice (7 oz)",
   "price": 1.5,
   "cal": 289.7,
   "p": 5.6,
   "c": 63.5,
   "f": 0.6,
   "allergens": [],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": true,
    "df": true
   }
  },
  {
   "id": "extrasauce",
   "name": "Extra Sauce Cup",
   "price": 0.75,
   "sameAs": "sauce",
   "cal": 0,
   "p": 0,
   "c": 0,
   "f": 0,
   "allergens": [],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": true,
    "df": true
   }
  },
  {
   "id": "consomme",
   "name": "Extra Consommé (4 oz cup)",
   "price": 1.5,
   "cal": 60,
   "p": 3,
   "c": 2,
   "f": 4.5,
   "allergens": [],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": true,
    "df": true
   }
  },
  {
   "id": "double",
   "name": "Double Protein",
   "price": null,
   "cal": 0,
   "p": 0,
   "c": 0,
   "f": 0,
   "allergens": [],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": true,
    "df": true
   },
   "doublePrices": {
    "chicken": 3.5,
    "beef": 5.95,
    "tofu": 2.5
   }
  }
 ],
 "bowls": [
  {
   "id": "bulgogi-bowl",
   "name": "Bulgogi Bowl",
   "price": 11.5,
   "img": "bulgogi",
   "tags": [
    "Best seller",
    "Express"
   ],
   "desc": "Pear-marinated ribeye seared with caramelized edges, sautéed zucchini & carrot, sesame cucumber, pickled carrot and spicy mayo.",
   "build": {
    "base": "jasmine",
    "protein": "bulgogi",
    "veg": "bulgogiveg",
    "toppings": [
     "cucumber",
     "dochua",
     "scallions"
    ],
    "sauce": "s_mayo",
    "finish": [
     "sesame"
    ]
   },
   "sideCount": 2,
   "sub": "Comes with 2 sides"
  },
  {
   "id": "birria-bowl",
   "name": "Birria Beef Bowl",
   "price": 12.0,
   "img": "birria",
   "tags": [
    "Chef’s pick"
   ],
   "desc": "Guajillo-braised beef, slow-cooked 4 hours. Cilantro-onion, pickled red onion, lime slaw — plus a cup of rich consommé for dipping.",
   "build": {
    "base": "jasmine",
    "protein": "birria",
    "veg": null,
    "toppings": [
     "cilonion",
     "redonion",
     "slaw"
    ],
    "sauce": "s_consomme",
    "finish": [
     "lime"
    ]
   },
   "sideCount": 2,
   "sub": "Comes with 2 sides"
  },
  {
   "id": "beef-broccoli-bowl",
   "name": "Beef & Broccoli Bowl",
   "price": 11.0,
   "img": "bnb",
   "tags": [],
   "desc": "Wok-seared ribeye and garlic broccoli in our garlic-ginger brown sauce, with pickled carrot and scallions.",
   "build": {
    "base": "jasmine",
    "protein": "mongolian",
    "veg": "broccoli",
    "toppings": [
     "dochua",
     "scallions"
    ],
    "sauce": "s_brown",
    "finish": [
     "sesame"
    ]
   },
   "sideCount": 2,
   "sub": "Comes with 2 sides"
  },
  {
   "id": "mongolian-bowl",
   "name": "Mongolian Beef Bowl",
   "price": 11.0,
   "img": "mongolian",
   "tags": [],
   "desc": "Ribeye glazed in soy, brown sugar & ginger with scallions, wok cabbage & peppers, sesame cucumber and crispy onions.",
   "build": {
    "base": "jasmine",
    "protein": "mongolian",
    "veg": "cabbage",
    "toppings": [
     "cucumber",
     "scallions"
    ],
    "sauce": null,
    "finish": [
     "crispyonion"
    ]
   },
   "sideCount": 2,
   "sub": "Comes with 2 sides"
  },
  {
   "id": "beef-fried-rice",
   "name": "Beef Fried Rice",
   "price": 9.5,
   "img": "friedrice",
   "tags": [
    "Brunch fave"
   ],
   "desc": "Wok-fried egg rice with Mongolian beef, peas & carrots, topped with pickled carrot, spicy mayo and crispy onions.",
   "build": {
    "base": "friedrice",
    "protein": "mongolian",
    "proteinOz": 3,
    "veg": null,
    "toppings": [
     "dochua",
     "scallions"
    ],
    "sauce": "s_mayo",
    "finish": [
     "crispyonion"
    ]
   },
   "baseIncluded": true,
   "sideCount": 2,
   "sub": "Comes with 2 sides"
  },
  {
   "id": "teriyaki-bowl",
   "name": "Teriyaki Chicken Bowl",
   "price": 9.5,
   "img": "teriyaki",
   "tags": [
    "Best seller",
    "Express"
   ],
   "desc": "Char-grilled chicken thigh glazed in teriyaki with garlic broccoli, pickled carrot, scallions and toasted sesame.",
   "build": {
    "base": "jasmine",
    "protein": "teriyaki",
    "veg": "broccoli",
    "toppings": [
     "dochua",
     "scallions"
    ],
    "sauce": "s_teriyaki",
    "finish": [
     "sesame"
    ]
   },
   "sideCount": 2,
   "sub": "Comes with 2 sides"
  },
  {
   "id": "adobo-bowl",
   "name": "Chicken Adobo Bowl",
   "price": 9.0,
   "img": "adobo",
   "tags": [
    "Best value"
   ],
   "desc": "Filipino-style chicken thigh braised in soy, vinegar, garlic & bay leaf, with blistered green beans, pickled red onion and crispy onions.",
   "build": {
    "base": "jasmine",
    "protein": "adobo",
    "veg": "greenbeans",
    "toppings": [
     "redonion",
     "scallions"
    ],
    "sauce": null,
    "finish": [
     "crispyonion"
    ]
   },
   "sideCount": 2,
   "sub": "Comes with 2 sides"
  },
  {
   "id": "jerk-bowl",
   "name": "Jerk Chicken, Rice & Peas",
   "price": 10.0,
   "img": "jerk",
   "tags": [
    "Express"
   ],
   "desc": "Smoky-hot jerk chicken over coconut rice & peas, wok cabbage & peppers, lime slaw, pickled red onion and spicy mayo.",
   "build": {
    "base": "coconut",
    "protein": "jerk",
    "veg": "cabbage",
    "toppings": [
     "slaw",
     "redonion"
    ],
    "sauce": "s_mayo",
    "finish": [
     "lime"
    ]
   },
   "sideCount": 2,
   "sub": "Comes with 2 sides"
  },
  {
   "id": "gochujang-bowl",
   "name": "Gochujang Chicken Bowl",
   "price": 10.0,
   "img": "gochujang",
   "tags": [
    "Express"
   ],
   "desc": "Grilled chicken in sweet-hot Korean chili glaze with sautéed veg, sesame cucumber, pickled carrot and spicy mayo.",
   "build": {
    "base": "jasmine",
    "protein": "gochujang",
    "veg": "bulgogiveg",
    "toppings": [
     "cucumber",
     "dochua",
     "scallions"
    ],
    "sauce": "s_mayo",
    "finish": [
     "sesame"
    ]
   },
   "sideCount": 2,
   "sub": "Comes with 2 sides"
  },
  {
   "id": "tikka-bowl",
   "name": "Chicken Tikka Bowl",
   "price": 10.0,
   "img": "tikka",
   "tags": [],
   "desc": "Yogurt-marinated chicken in creamy tikka masala over turmeric basmati, with roasted turmeric cauliflower and cooling cucumber raita.",
   "build": {
    "base": "turmeric",
    "protein": "tikka",
    "veg": "cauliflower",
    "toppings": [
     "redonion",
     "cilonion"
    ],
    "sauce": "s_raita",
    "finish": [
     "lime"
    ]
   },
   "sideCount": 2,
   "sub": "Comes with 2 sides"
  },
  {
   "id": "tofu-bowl",
   "name": "Sesame Garlic Tofu Bowl",
   "price": 9.0,
   "img": "tofu",
   "tags": [
    "New",
    "Plant-based"
   ],
   "desc": "Crispy roasted tofu in sesame-garlic glaze with garlic broccoli, sesame cucumber, pickled carrot and teriyaki. 100% plant-based.",
   "build": {
    "base": "jasmine",
    "protein": "tofu",
    "veg": "broccoli",
    "toppings": [
     "cucumber",
     "dochua",
     "scallions"
    ],
    "sauce": "s_teriyaki",
    "finish": [
     "sesame"
    ]
   },
   "sideCount": 2,
   "sub": "Comes with 2 sides"
  }
 ],
 "combos": [
  {
   "id": "class-break",
   "name": "Class Break",
   "bowl": "gochujang-bowl",
   "addons": [
    "egg"
   ],
   "drink": "iced-tea",
   "price": 14.25,
   "alc": 14.25,
   "for": "Students — cheap & filling"
  },
  {
   "id": "office-express",
   "name": "Office Express",
   "bowl": "bulgogi-bowl",
   "addons": [
    "avocado"
   ],
   "drink": "can-soda",
   "price": 15.5,
   "alc": 16.0,
   "for": "Lunch at your desk in 15 seconds"
  },
  {
   "id": "saigon-brunch",
   "name": "Saigon Brunch",
   "bowl": "beef-fried-rice",
   "addons": [
    "egg"
   ],
   "drink": "caphe",
   "price": 15.45,
   "alc": 15.95,
   "for": "Late-morning brunch"
  },
  {
   "id": "afternoon-fuel",
   "name": "Afternoon Fuel",
   "bowl": "teriyaki-bowl",
   "addons": [
    "avocado"
   ],
   "drink": "caphe",
   "price": 16.0,
   "alc": 16.45,
   "for": "Beat the 3 PM slump"
  },
  {
   "id": "big-appetite",
   "name": "Big Appetite",
   "bowl": "jerk-bowl",
   "addons": [
    "double"
   ],
   "drink": "iced-tea",
   "price": 16.0,
   "alc": 16.25,
   "for": "Gym days & big hunger"
  },
  {
   "id": "birria-feast",
   "name": "Birria Feast",
   "bowl": "birria-bowl",
   "addons": [
    "consomme",
    "avocado"
   ],
   "drink": "caphe",
   "price": 19.5,
   "alc": 20.45,
   "for": "Treat yourself"
  }
 ],
 "drinks": [
  {
   "id": "caphe",
   "name": "Vietnamese Iced Coffee",
   "sub": "Cold brew & condensed milk · 16 oz",
   "price": 4.95,
   "img": "coffee",
   "cal": 140,
   "p": 3.4,
   "c": 23,
   "f": 3.9,
   "allergens": [
    "Milk"
   ],
   "diet": {
    "vegan": false,
    "veg": true,
    "gf": true,
    "df": false
   },
   "desc": "Dark-roast cold brew over sweetened condensed milk and ice. Strong, creamy, a little sweet.",
   "caffeine": true,
   "options": [
    {
     "id": "sweet",
     "label": "Sweetness",
     "choices": [
      {
       "id": "reg",
       "label": "Regular"
      },
      {
       "id": "less",
       "label": "Less sweet",
       "cal": -45,
       "c": -7.6
      }
     ]
    }
   ]
  },
  {
   "id": "iced-tea",
   "name": "Iced Tea",
   "sub": "Fresh-brewed black tea · 24 oz",
   "price": 2.75,
   "img": "tea",
   "cal": 0,
   "p": 0,
   "c": 0,
   "f": 0,
   "allergens": [],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": true,
    "df": true
   },
   "desc": "Brewed every 4 hours. Unsweetened — lime on request.",
   "caffeine": true
  },
  {
   "id": "can-soda",
   "name": "Can Soda",
   "sub": "12 oz can",
   "price": 2.5,
   "img": "soda",
   "cal": 140,
   "p": 0,
   "c": 39,
   "f": 0,
   "allergens": [],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": true,
    "df": true
   },
   "desc": "Ice-cold can.",
   "options": [
    {
     "id": "flavor",
     "label": "Flavor",
     "choices": [
      {
       "id": "coke",
       "label": "Coca-Cola"
      },
      {
       "id": "diet",
       "label": "Diet Coke",
       "cal": -140,
       "c": -39
      },
      {
       "id": "sprite",
       "label": "Sprite"
      }
     ]
    }
   ]
  },
  {
   "id": "fountain-soda",
   "name": "Fountain Soda",
   "sub": "16 oz cup",
   "price": 2.0,
   "img": "soda",
   "cal": 150,
   "p": 0,
   "c": 41,
   "f": 0,
   "allergens": [],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": true,
    "df": true
   },
   "desc": "Coca-Cola fountain, free ice.",
   "options": [
    {
     "id": "flavor",
     "label": "Flavor",
     "choices": [
      {
       "id": "coke",
       "label": "Coca-Cola"
      },
      {
       "id": "diet",
       "label": "Diet Coke",
       "cal": -150,
       "c": -41
      },
      {
       "id": "sprite",
       "label": "Sprite"
      }
     ]
    }
   ]
  },
  {
   "id": "water",
   "name": "Bottled Water",
   "sub": "16.9 oz",
   "price": 1.0,
   "img": "water",
   "cal": 0,
   "p": 0,
   "c": 0,
   "f": 0,
   "allergens": [],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": true,
    "df": true
   },
   "desc": "Still spring water."
  }
 ],
 "sides": [
  {
   "id": "side-chicken",
   "name": "Side of Teriyaki Chicken",
   "sub": "4 oz",
   "price": 3.5,
   "img": "chicken",
   "desc": "Char-grilled thigh in teriyaki glaze.",
   "cal": 209.9,
   "p": 30.15,
   "c": 2.75,
   "f": 7.97,
   "allergens": [
    "Soy",
    "Wheat"
   ],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": false,
    "df": true
   },
   "spicy": 0,
   "from": "teriyaki"
  },
  {
   "id": "side-beef",
   "name": "Side of Bulgogi Beef",
   "sub": "4 oz",
   "price": 5.95,
   "img": "mongolian",
   "desc": "Pear-marinated ribeye, seared to order.",
   "cal": 412.8,
   "p": 30.01,
   "c": 14.12,
   "f": 26.11,
   "allergens": [
    "Soy",
    "Wheat",
    "Sesame"
   ],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": false,
    "df": true
   },
   "spicy": 0,
   "from": "bulgogi"
  },
  {
   "id": "side-avocado",
   "name": "Avocado",
   "sub": "½ avocado, fanned",
   "price": 2.0,
   "img": "avocado",
   "addon": "avocado",
   "desc": "Sliced to order so it stays green.",
   "cal": 135,
   "p": 1.7,
   "c": 7.3,
   "f": 12.5,
   "allergens": [],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": true,
    "df": true
   }
  },
  {
   "id": "side-egg",
   "name": "Soft Scrambled Egg",
   "sub": "2.5 oz",
   "price": 1.5,
   "img": "egg",
   "addon": "egg",
   "desc": "Big, soft curds with scallion. Our brunch add-on.",
   "cal": 123.5,
   "p": 9.42,
   "c": 0.59,
   "f": 8.95,
   "allergens": [
    "Egg"
   ],
   "diet": {
    "vegan": false,
    "veg": true,
    "gf": true,
    "df": true
   }
  },
  {
   "id": "side-rice",
   "name": "Side of Jasmine Rice",
   "sub": "7 oz",
   "price": 1.5,
   "img": "rice",
   "addon": "extrarice",
   "desc": "Steamed fresh every 45 minutes.",
   "cal": 289.7,
   "p": 5.64,
   "c": 63.5,
   "f": 0.56,
   "allergens": [],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": true,
    "df": true
   }
  },
  {
   "id": "side-consomme",
   "name": "Birria Consommé",
   "sub": "4 oz cup",
   "price": 1.5,
   "img": "consomme",
   "addon": "consomme",
   "desc": "Chile-beef broth for dipping. Great with any beef bowl.",
   "cal": 60,
   "p": 3,
   "c": 2,
   "f": 4.5,
   "allergens": [],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": true,
    "df": true
   }
  },
  {
   "id": "side-sauce",
   "name": "Sauce Cup",
   "sub": "2 oz cup",
   "price": 0.75,
   "img": "sauce",
   "sauceCup": true,
   "desc": "Any house sauce on the side.",
   "cal": 0,
   "p": 0,
   "c": 0,
   "f": 0,
   "allergens": [],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": true,
    "df": true
   }
  },
  {
   "id": "ms-rice",
   "name": "Steamed Rice",
   "sub": "6 oz",
   "price": 2.5,
   "img": "rice",
   "cal": 250,
   "p": 4.8,
   "c": 54.4,
   "f": 0.5,
   "allergens": [],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": true,
    "df": true
   },
   "desc": "Thai jasmine, steamed fresh.",
   "spicy": 0,
   "mealSide": true,
   "est": true
  },
  {
   "id": "ms-kimchi",
   "name": "House Kimchi",
   "sub": "3.5 oz",
   "price": 2.5,
   "img": "kimchi",
   "cal": 25,
   "p": 1.5,
   "c": 4.5,
   "f": 0.4,
   "allergens": [
    "Fish"
   ],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": true,
    "df": true
   },
   "spicy": 1,
   "desc": "Napa cabbage and daikon fermented in-house with gochugaru, garlic and fish sauce.",
   "mealSide": true,
   "est": true
  },
  {
   "id": "ms-friedrice",
   "name": "Fried Rice",
   "sub": "6 oz",
   "price": 3.5,
   "img": "friedrice",
   "cal": 265,
   "p": 7.6,
   "c": 39.5,
   "f": 8.1,
   "allergens": [
    "Egg",
    "Soy",
    "Wheat",
    "Sesame"
   ],
   "diet": {
    "vegan": false,
    "veg": true,
    "gf": false,
    "df": true
   },
   "desc": "Wok-fried with egg, peas, carrot and scallion.",
   "spicy": 0,
   "mealSide": true,
   "est": true
  },
  {
   "id": "ms-peas",
   "name": "Buttered Peas",
   "sub": "3 oz",
   "price": 2.0,
   "img": "peas",
   "cal": 75,
   "p": 4.2,
   "c": 11.4,
   "f": 1.6,
   "allergens": [
    "Milk"
   ],
   "diet": {
    "vegan": false,
    "veg": true,
    "gf": true,
    "df": false
   },
   "desc": "Sweet green peas with a little butter and salt.",
   "spicy": 0,
   "mealSide": true,
   "est": true
  },
  {
   "id": "ms-cucumber",
   "name": "Korean Cucumber Salad",
   "sub": "4 oz",
   "price": 2.5,
   "img": "cucumbersalad",
   "cal": 70,
   "p": 1,
   "c": 10,
   "f": 3,
   "allergens": [
    "Sesame"
   ],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": true,
    "df": true
   },
   "spicy": 1,
   "desc": "Crisp cucumber, onion and scallion in sweet vinegar, gochugaru and sesame oil.",
   "mealSide": true,
   "est": true
  },
  {
   "id": "ms-coleslaw",
   "name": "Coleslaw",
   "sub": "4 oz",
   "price": 2.5,
   "img": "coleslaw",
   "cal": 150,
   "p": 0.8,
   "c": 12,
   "f": 11,
   "allergens": [
    "Egg"
   ],
   "diet": {
    "vegan": false,
    "veg": true,
    "gf": true,
    "df": true
   },
   "desc": "Shredded cabbage and carrot in creamy slaw dressing, rested overnight.",
   "spicy": 0,
   "mealSide": true,
   "est": true
  }
 ],
 "plates": [
  {
   "id": "karaage",
   "cat": "apps",
   "name": "Chicken Karaage Bites",
   "price": 6.5,
   "img": "karaage",
   "desc": "Crispy Japanese-style fried chicken thigh bites with sriracha mayo.",
   "cal": 430,
   "p": 28,
   "c": 18,
   "f": 27,
   "allergens": [
    "Soy",
    "Wheat",
    "Egg"
   ],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": false,
    "df": true
   },
   "spicy": 1,
   "sides": 0,
   "est": true,
   "tags": [
    "Best seller"
   ]
  },
  {
   "id": "potstickers",
   "cat": "apps",
   "name": "Pork Potstickers",
   "price": 7.0,
   "img": "potstickers",
   "desc": "Six pan-seared dumplings, pork & leek or pork & cabbage, with dipping sauce.",
   "cal": 380,
   "p": 16,
   "c": 40,
   "f": 17,
   "allergens": [
    "Wheat",
    "Soy",
    "Sesame"
   ],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": false,
    "df": true
   },
   "spicy": 0,
   "sides": 0,
   "est": true
  },
  {
   "id": "croquettes",
   "cat": "apps",
   "name": "Crispy Rice Croquettes",
   "price": 6.0,
   "img": "croquettes",
   "desc": "Three golden fried rice balls with melty cheese and scallion.",
   "cal": 420,
   "p": 12,
   "c": 48,
   "f": 20,
   "allergens": [
    "Milk",
    "Wheat",
    "Egg"
   ],
   "diet": {
    "vegan": false,
    "veg": true,
    "gf": false,
    "df": false
   },
   "spicy": 0,
   "sides": 0,
   "est": true
  },
  {
   "id": "wings",
   "cat": "apps",
   "name": "Chicken Wings",
   "price": 9.0,
   "img": "wings",
   "desc": "Six crispy wings tossed in your choice of sauce.",
   "cal": 620,
   "p": 48,
   "c": 10,
   "f": 42,
   "allergens": [
    "Soy",
    "Wheat"
   ],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": false,
    "df": true
   },
   "spicy": 1,
   "sides": 0,
   "est": true,
   "labelCheck": "Wing sauce allergens vary by flavor. Ask the line."
  },
  {
   "id": "cucumber-plate",
   "cat": "apps",
   "name": "Cucumber & Pickled Veg Plate",
   "price": 5.0,
   "img": "cucplate",
   "desc": "Cool smashed cucumbers and quick-pickled veg. Light and crunchy.",
   "cal": 110,
   "p": 2,
   "c": 14,
   "f": 5,
   "allergens": [],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": true,
    "df": true
   },
   "spicy": 0,
   "sides": 0,
   "est": true,
   "tags": [
    "Plant-based"
   ],
   "labelCheck": "Dressing recipe is being finalized. Ask staff about allergens."
  },
  {
   "id": "skewers",
   "cat": "apps",
   "name": "Chicken Skewers",
   "price": 7.5,
   "img": "skewers",
   "desc": "Two grilled marinated chicken thigh skewers with dipping sauce.",
   "cal": 300,
   "p": 28,
   "c": 10,
   "f": 15,
   "allergens": [
    "Soy",
    "Wheat"
   ],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": false,
    "df": true
   },
   "spicy": 0,
   "sides": 0,
   "est": true
  },
  {
   "id": "miso-soup",
   "cat": "soups",
   "name": "Miso Tofu Soup",
   "price": 5.0,
   "img": "miso",
   "desc": "Silky tofu, scallion and seaweed in savory miso broth.",
   "cal": 110,
   "p": 8,
   "c": 8,
   "f": 5,
   "allergens": [
    "Soy",
    "Fish"
   ],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": false,
    "df": true
   },
   "spicy": 0,
   "sides": 0,
   "est": true,
   "labelCheck": "Dashi contains fish."
  },
  {
   "id": "egg-drop",
   "cat": "soups",
   "name": "Egg Drop Soup",
   "price": 4.5,
   "img": "eggdrop",
   "desc": "Light, savory broth with silky ribbons of egg and scallion.",
   "cal": 90,
   "p": 6,
   "c": 6,
   "f": 4,
   "allergens": [
    "Egg"
   ],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": false,
    "df": true
   },
   "spicy": 0,
   "sides": 0,
   "est": true,
   "labelCheck": "Chicken broth base. Ask staff for full label."
  },
  {
   "id": "hot-sour",
   "cat": "soups",
   "name": "Hot & Sour Soup",
   "price": 5.5,
   "img": "hotsour",
   "desc": "Peppery, tangy broth with tofu, mushroom, pork and egg.",
   "cal": 180,
   "p": 12,
   "c": 14,
   "f": 8,
   "allergens": [
    "Soy",
    "Egg",
    "Wheat"
   ],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": false,
    "df": true
   },
   "spicy": 1,
   "sides": 0,
   "est": true
  },
  {
   "id": "bun-bo-hue",
   "cat": "soups",
   "name": "Bún Bò Huế",
   "price": 11.0,
   "img": "bunbo",
   "desc": "Spicy lemongrass beef and pork broth with rice noodles, tender beef, herbs and lime.",
   "cal": 620,
   "p": 38,
   "c": 70,
   "f": 18,
   "allergens": [
    "Fish",
    "Shellfish"
   ],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": false,
    "df": true
   },
   "spicy": 2,
   "sides": 0,
   "est": true,
   "tags": [
    "Chef’s pick"
   ],
   "labelCheck": "Shrimp paste can be left out on request."
  },
  {
   "id": "bulgogi-salad",
   "cat": "salads",
   "name": "Bulgogi Beef Salad",
   "price": 10.5,
   "img": "bulgogisalad",
   "desc": "Sweet-savory bulgogi beef over crisp greens, carrot and cucumber with sesame dressing.",
   "cal": 480,
   "p": 26,
   "c": 22,
   "f": 32,
   "allergens": [
    "Soy",
    "Sesame",
    "Wheat"
   ],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": false,
    "df": true
   },
   "spicy": 0,
   "sides": 0,
   "est": true
  },
  {
   "id": "carrot-ginger",
   "cat": "salads",
   "name": "Carrot Ginger Chopped Salad",
   "price": 7.0,
   "img": "carrotsalad",
   "desc": "Crunchy chopped veg and greens with bright carrot-ginger dressing.",
   "cal": 180,
   "p": 3,
   "c": 18,
   "f": 11,
   "allergens": [],
   "diet": {
    "vegan": true,
    "veg": true,
    "gf": true,
    "df": true
   },
   "spicy": 0,
   "sides": 0,
   "est": true,
   "tags": [
    "Plant-based"
   ],
   "labelCheck": "Dressing recipe is being finalized. Ask staff about allergens."
  },
  {
   "id": "goi-ga",
   "cat": "salads",
   "name": "Gỏi Gà",
   "price": 9.5,
   "img": "goiga",
   "desc": "Vietnamese chicken and cabbage salad with herbs, peanuts and nước chấm dressing.",
   "cal": 360,
   "p": 30,
   "c": 22,
   "f": 16,
   "allergens": [
    "Peanuts",
    "Fish"
   ],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": true,
    "df": true
   },
   "spicy": 1,
   "sides": 0,
   "est": true
  },
  {
   "id": "sesame-chicken-salad",
   "cat": "salads",
   "name": "Sesame Chicken Salad",
   "price": 9.5,
   "img": "sesamesalad",
   "desc": "Sliced chicken thigh over greens and cucumber with toasted sesame dressing.",
   "cal": 380,
   "p": 28,
   "c": 16,
   "f": 22,
   "allergens": [
    "Sesame",
    "Soy",
    "Wheat"
   ],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": false,
    "df": true
   },
   "spicy": 0,
   "sides": 0,
   "est": true
  },
  {
   "id": "cheesesteak",
   "cat": "sandwiches",
   "name": "Beef Knuckle Cheesesteak",
   "price": 12.5,
   "img": "cheesesteak",
   "desc": "Thin-sliced beef with sautéed onion and melted cheese on a toasted roll.",
   "cal": 720,
   "p": 42,
   "c": 52,
   "f": 38,
   "allergens": [
    "Milk",
    "Wheat"
   ],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": false,
    "df": false
   },
   "spicy": 0,
   "sides": 1,
   "est": true,
   "sub": "Comes with 1 side"
  },
  {
   "id": "banh-mi",
   "cat": "sandwiches",
   "name": "Chicken Banh Mi",
   "price": 10.5,
   "img": "banhmi",
   "desc": "Grilled chicken thigh, pickled veg, cilantro and jalapeño on a crisp baguette.",
   "cal": 560,
   "p": 32,
   "c": 62,
   "f": 20,
   "allergens": [
    "Wheat",
    "Egg",
    "Soy"
   ],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": false,
    "df": true
   },
   "spicy": 1,
   "sides": 1,
   "est": true,
   "tags": [
    "Saigon classic"
   ],
   "sub": "Comes with 1 side"
  },
  {
   "id": "fried-chicken-sandwich",
   "cat": "sandwiches",
   "name": "Fried Chicken Sandwich",
   "price": 10.5,
   "img": "friedchicken",
   "desc": "Crispy chicken thigh, pickles and slaw on a toasted bun.",
   "cal": 780,
   "p": 38,
   "c": 68,
   "f": 38,
   "allergens": [
    "Wheat",
    "Egg",
    "Milk"
   ],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": false,
    "df": false
   },
   "spicy": 0,
   "sides": 1,
   "est": true,
   "sub": "Comes with 1 side"
  },
  {
   "id": "jerk-sandwich",
   "cat": "sandwiches",
   "name": "Jerk Chicken Sandwich",
   "price": 10.5,
   "img": "jerksandwich",
   "desc": "Jerk-marinated chicken thigh with citrus slaw on a toasted bun.",
   "cal": 560,
   "p": 32,
   "c": 56,
   "f": 22,
   "allergens": [
    "Wheat"
   ],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": false,
    "df": true
   },
   "spicy": 2,
   "sides": 1,
   "est": true,
   "labelCheck": "Jerk seasoning blend — label checked by staff",
   "sub": "Comes with 1 side"
  },
  {
   "id": "birria-grilled-cheese",
   "cat": "sandwiches",
   "name": "Birria Grilled Cheese",
   "price": 12.5,
   "img": "birriagc",
   "desc": "Chile-braised beef and melted cheese on griddled bread, with a consommé cup for dipping.",
   "cal": 820,
   "p": 44,
   "c": 50,
   "f": 48,
   "allergens": [
    "Milk",
    "Wheat"
   ],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": false,
    "df": false
   },
   "spicy": 0,
   "sides": 1,
   "est": true,
   "tags": [
    "Chef’s pick"
   ],
   "sub": "Comes with 1 side"
  },
  {
   "id": "panini",
   "cat": "sandwiches",
   "name": "Chicken Bacon Ranch Panini",
   "price": 11.0,
   "img": "panini",
   "desc": "Chicken thigh, bacon, melted cheese and ranch, pressed and crisp.",
   "cal": 780,
   "p": 44,
   "c": 56,
   "f": 42,
   "allergens": [
    "Milk",
    "Wheat",
    "Egg"
   ],
   "diet": {
    "vegan": false,
    "veg": false,
    "gf": false,
    "df": false
   },
   "spicy": 0,
   "sides": 1,
   "est": true,
   "sub": "Comes with 1 side"
  }
 ],
 "steps": [
  {
   "id": "base",
   "label": "Base",
   "hint": "1 scoop (7 oz). Swap free — Egg Fried Rice +$1.50",
   "type": "one",
   "required": true
  },
  {
   "id": "protein",
   "label": "Protein",
   "hint": "Sets your bowl price",
   "type": "one",
   "required": true
  },
  {
   "id": "veg",
   "label": "Hot veggie",
   "hint": "1 scoop, included",
   "type": "one",
   "required": false
  },
  {
   "id": "topping",
   "label": "Fresh toppings",
   "hint": "Up to 3, included",
   "type": "many",
   "max": 3
  },
  {
   "id": "sauce",
   "label": "Sauce",
   "hint": "1 included",
   "type": "one",
   "required": false
  },
  {
   "id": "finish",
   "label": "Finish",
   "hint": "Included",
   "type": "many",
   "max": 3
  }
 ]
};
