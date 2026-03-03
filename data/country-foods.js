// ===================================
// Bite & Burn - Country Foods Database
// ===================================

const COUNTRY_FOODS = {
    LK: {
        name: 'Sri Lanka',
        traditional: 'Rice and Curry',
        meals: {
            breakfast: [
                { name: 'String Hoppers (Idiyappam)', desc: 'Rice flour noodles served with coconut sambol and curry', calories: 280, protein: 6, carbs: 52, prepTime: 30 },
                { name: 'Hoppers (Appa)', desc: 'Bowl-shaped pancake with egg, served with lunu miris', calories: 220, protein: 8, carbs: 35, prepTime: 25 },
                { name: 'Milk Rice (Kiribath)', desc: 'Rice cooked in coconut milk, served with lunu miris', calories: 350, protein: 7, carbs: 55, prepTime: 20 },
                { name: 'Roti with Dhal Curry', desc: 'Flatbread with lentil curry', calories: 320, protein: 12, carbs: 48, prepTime: 25 }
            ],
            lunch: [
                { name: 'Rice and Curry', desc: 'White rice with vegetable, fish or chicken curry, sambol', calories: 550, protein: 25, carbs: 70, prepTime: 45 },
                { name: 'Red Rice with Fish', desc: 'Healthy red rice with ambul thiyal (sour fish curry) and greens', calories: 450, protein: 28, carbs: 55, prepTime: 40 },
                { name: 'Jackfruit Curry with Rice', desc: 'Young jackfruit (polos) curry with rice', calories: 480, protein: 12, carbs: 65, prepTime: 50 },
                { name: 'Lamprais', desc: 'Rice with mixed curries wrapped in banana leaf', calories: 620, protein: 28, carbs: 68, prepTime: 60 }
            ],
            dinner: [
                { name: 'Rice with Fish Curry', desc: 'Light rice portion with fish curry and vegetables', calories: 420, protein: 28, carbs: 45, prepTime: 40 },
                { name: 'String Hoppers with Curry', desc: 'Evening portion with chicken or vegetable curry', calories: 350, protein: 18, carbs: 48, prepTime: 30 },
                { name: 'Pittu with Soya Curry', desc: 'Steamed rice flour cylinders with curry', calories: 380, protein: 15, carbs: 52, prepTime: 25 }
            ],
            snacks: [
                { name: 'Thala Guli', desc: 'Sesame balls with jaggery', calories: 120, protein: 4, carbs: 15, prepTime: 10 },
                { name: 'Aggala', desc: 'Roasted rice balls with pepper and coconut', calories: 150, protein: 3, carbs: 28, prepTime: 15 },
                { name: 'Banana', desc: 'Fresh banana', calories: 90, protein: 1, carbs: 23, prepTime: 1 }
            ]
        }
    },
    IN: {
        name: 'India',
        traditional: 'Biryani',
        meals: {
            breakfast: [
                { name: 'Idli Sambar', desc: 'Steamed rice cakes with lentil soup', calories: 250, protein: 8, carbs: 45, prepTime: 20 },
                { name: 'Poha', desc: 'Flattened rice with vegetables and peanuts', calories: 280, protein: 6, carbs: 48, prepTime: 15 },
                { name: 'Paratha with Curd', desc: 'Layered flatbread with yogurt', calories: 350, protein: 10, carbs: 42, prepTime: 20 },
                { name: 'Upma', desc: 'Semolina porridge with vegetables', calories: 220, protein: 5, carbs: 38, prepTime: 15 }
            ],
            lunch: [
                { name: 'Chicken Biryani', desc: 'Fragrant rice with spiced chicken', calories: 550, protein: 28, carbs: 65, prepTime: 60 },
                { name: 'Dal Rice', desc: 'Lentils with rice and vegetable side', calories: 420, protein: 16, carbs: 68, prepTime: 30 },
                { name: 'Roti with Paneer', desc: 'Flatbread with cottage cheese curry', calories: 480, protein: 22, carbs: 45, prepTime: 30 },
                { name: 'Thali', desc: 'Complete meal with rice, dal, vegetables, roti', calories: 620, protein: 20, carbs: 85, prepTime: 45 }
            ],
            dinner: [
                { name: 'Chapati with Sabzi', desc: 'Whole wheat bread with vegetable curry', calories: 380, protein: 12, carbs: 52, prepTime: 25 },
                { name: 'Khichdi', desc: 'Rice and lentil comfort food', calories: 320, protein: 14, carbs: 55, prepTime: 20 },
                { name: 'Dosa with Chutney', desc: 'Crispy rice crepe with coconut chutney', calories: 280, protein: 6, carbs: 42, prepTime: 20 }
            ],
            snacks: [
                { name: 'Dhokla', desc: 'Steamed fermented gram flour cake', calories: 160, protein: 6, carbs: 18, prepTime: 20 },
                { name: 'Lassi', desc: 'Yogurt drink', calories: 150, protein: 5, carbs: 24, prepTime: 5 }
            ]
        }
    },
    JP: {
        name: 'Japan',
        traditional: 'Sushi',
        meals: {
            breakfast: [
                { name: 'Japanese Breakfast Set', desc: 'Rice, miso soup, grilled fish, pickles', calories: 380, protein: 25, carbs: 48, prepTime: 30 },
                { name: 'Onigiri', desc: 'Rice balls with various fillings', calories: 180, protein: 4, carbs: 38, prepTime: 10 },
                { name: 'Tamagoyaki', desc: 'Japanese rolled omelette', calories: 150, protein: 12, carbs: 2, prepTime: 10 }
            ],
            lunch: [
                { name: 'Sushi Set', desc: 'Assorted fresh sushi', calories: 420, protein: 22, carbs: 55, prepTime: 45 },
                { name: 'Ramen', desc: 'Noodle soup with pork and egg', calories: 550, protein: 28, carbs: 62, prepTime: 30 },
                { name: 'Bento Box', desc: 'Balanced meal box with rice, protein, vegetables', calories: 480, protein: 24, carbs: 58, prepTime: 20 },
                { name: 'Udon', desc: 'Thick wheat noodles in broth', calories: 380, protein: 12, carbs: 68, prepTime: 15 }
            ],
            dinner: [
                { name: 'Grilled Salmon Set', desc: 'Salmon with rice, miso, vegetables', calories: 450, protein: 32, carbs: 42, prepTime: 30 },
                { name: 'Yakitori', desc: 'Grilled chicken skewers', calories: 320, protein: 28, carbs: 8, prepTime: 20 },
                { name: 'Tofu Steak', desc: 'Grilled tofu with vegetables', calories: 280, protein: 18, carbs: 15, prepTime: 15 }
            ],
            snacks: [
                { name: 'Edamame', desc: 'Steamed soybeans', calories: 120, protein: 11, carbs: 10, prepTime: 5 },
                { name: 'Mochi', desc: 'Rice cake', calories: 100, protein: 2, carbs: 22, prepTime: 5 }
            ]
        }
    },
    US: {
        name: 'United States',
        traditional: 'Hamburger',
        meals: {
            breakfast: [
                { name: 'Oatmeal with Berries', desc: 'Healthy oat breakfast with fresh berries', calories: 280, protein: 8, carbs: 48, prepTime: 10 },
                { name: 'Scrambled Eggs', desc: 'Eggs with whole wheat toast', calories: 320, protein: 18, carbs: 25, prepTime: 10 },
                { name: 'Greek Yogurt Parfait', desc: 'Yogurt with granola and fruit', calories: 350, protein: 15, carbs: 45, prepTime: 5 },
                { name: 'Avocado Toast', desc: 'Whole grain toast with avocado and egg', calories: 380, protein: 14, carbs: 32, prepTime: 10 }
            ],
            lunch: [
                { name: 'Grilled Chicken Salad', desc: 'Mixed greens with grilled chicken', calories: 420, protein: 35, carbs: 18, prepTime: 20 },
                { name: 'Turkey Sandwich', desc: 'Whole wheat bread with turkey and vegetables', calories: 450, protein: 28, carbs: 42, prepTime: 10 },
                { name: 'Lean Burger', desc: 'Lean beef patty with vegetables', calories: 520, protein: 32, carbs: 38, prepTime: 25 },
                { name: 'Quinoa Bowl', desc: 'Quinoa with vegetables and protein', calories: 480, protein: 22, carbs: 55, prepTime: 20 }
            ],
            dinner: [
                { name: 'Grilled Salmon', desc: 'With roasted vegetables', calories: 450, protein: 38, carbs: 15, prepTime: 25 },
                { name: 'Chicken Stir Fry', desc: 'Lean chicken with vegetables', calories: 380, protein: 32, carbs: 22, prepTime: 15 },
                { name: 'Baked Cod', desc: 'With quinoa and steamed broccoli', calories: 350, protein: 35, carbs: 28, prepTime: 30 }
            ],
            snacks: [
                { name: 'Apple with Peanut Butter', desc: 'Healthy snack combo', calories: 200, protein: 6, carbs: 25, prepTime: 3 },
                { name: 'Mixed Nuts', desc: 'Handful of almonds and walnuts', calories: 180, protein: 6, carbs: 8, prepTime: 1 }
            ]
        }
    },
    GB: {
        name: 'United Kingdom',
        traditional: 'Fish and Chips',
        meals: {
            breakfast: [
                { name: 'Porridge', desc: 'Oats with honey and berries', calories: 280, protein: 8, carbs: 48, prepTime: 10 },
                { name: 'Eggs on Toast', desc: 'Poached eggs on whole grain toast', calories: 320, protein: 18, carbs: 28, prepTime: 10 },
                { name: 'Full English (Light)', desc: 'Grilled tomatoes, mushrooms, eggs, toast', calories: 420, protein: 22, carbs: 32, prepTime: 25 }
            ],
            lunch: [
                { name: 'Jacket Potato', desc: 'Baked potato with beans and salad', calories: 450, protein: 15, carbs: 72, prepTime: 45 },
                { name: 'Shepherd\'s Pie', desc: 'Meat pie with mashed potato topping', calories: 520, protein: 28, carbs: 45, prepTime: 60 },
                { name: 'Ploughman\'s Lunch', desc: 'Cheese, bread, pickles, salad', calories: 480, protein: 18, carbs: 42, prepTime: 10 }
            ],
            dinner: [
                { name: 'Roast Chicken', desc: 'With vegetables and gravy', calories: 480, protein: 38, carbs: 25, prepTime: 60 },
                { name: 'Grilled Fish', desc: 'With peas and light chips', calories: 420, protein: 32, carbs: 35, prepTime: 25 },
                { name: 'Beef Stew', desc: 'Lean beef with vegetables', calories: 380, protein: 28, carbs: 32, prepTime: 45 }
            ],
            snacks: [
                { name: 'Crumpet with Jam', desc: 'Light snack', calories: 150, protein: 3, carbs: 28, prepTime: 5 },
                { name: 'Fruit Scone', desc: 'With minimal butter', calories: 180, protein: 4, carbs: 32, prepTime: 5 }
            ]
        }
    }
};

// Default meals for countries not in database
const DEFAULT_MEALS = {
    breakfast: [
        { name: 'Oatmeal', desc: 'Healthy morning oats with fruits', calories: 280, protein: 8, carbs: 48, prepTime: 10 },
        { name: 'Eggs and Toast', desc: 'Protein-rich breakfast', calories: 320, protein: 18, carbs: 25, prepTime: 10 },
        { name: 'Fruit Smoothie', desc: 'Blended fruits with yogurt', calories: 250, protein: 8, carbs: 42, prepTime: 5 }
    ],
    lunch: [
        { name: 'Grilled Chicken', desc: 'With rice and vegetables', calories: 480, protein: 35, carbs: 45, prepTime: 30 },
        { name: 'Fish with Rice', desc: 'Balanced protein meal', calories: 450, protein: 30, carbs: 48, prepTime: 30 },
        { name: 'Vegetable Stir Fry', desc: 'Mixed vegetables with protein', calories: 380, protein: 15, carbs: 42, prepTime: 15 }
    ],
    dinner: [
        { name: 'Lean Protein', desc: 'With steamed vegetables', calories: 380, protein: 32, carbs: 18, prepTime: 25 },
        { name: 'Soup and Bread', desc: 'Light evening meal', calories: 320, protein: 12, carbs: 45, prepTime: 15 },
        { name: 'Salad with Protein', desc: 'Fresh vegetables with grilled meat', calories: 350, protein: 28, carbs: 15, prepTime: 10 }
    ],
    snacks: [
        { name: 'Fresh Fruits', desc: 'Seasonal fruits', calories: 100, protein: 1, carbs: 25, prepTime: 2 },
        { name: 'Nuts', desc: 'Mixed nuts', calories: 180, protein: 6, carbs: 8, prepTime: 1 }
    ]
};

// Country-specific quick healthy meals for time-constrained swaps
const QUICK_MEALS = {
    LK: {
        breakfast: [
            { name: 'Kola Kenda', desc: 'Green herbal porridge — a traditional healthy drink', calories: 150, protein: 3, carbs: 28, prepTime: 8 },
            { name: 'Banana & Curd', desc: 'Fresh banana with buffalo curd and treacle', calories: 250, protein: 6, carbs: 45, prepTime: 2 },
            { name: 'Leftover Rice & Curry', desc: 'Reheat last night\'s rice and curry — classic Sri Lankan', calories: 350, protein: 12, carbs: 55, prepTime: 5 }
        ],
        lunch: [
            { name: 'Red Rice & Greens', desc: 'Red rice with gotukola sambol and fish', calories: 400, protein: 22, carbs: 45, prepTime: 15 },
            { name: 'Dhal Rice', desc: 'Simple dhal with white rice and pol sambol', calories: 380, protein: 14, carbs: 58, prepTime: 10 },
            { name: 'Vegetable Rice', desc: 'Steamed rice mixed with carrots and leeks', calories: 350, protein: 8, carbs: 60, prepTime: 15 },
            { name: 'Noodles with Egg', desc: 'Stir-fried noodles with egg and plenty of vegetables', calories: 380, protein: 12, carbs: 52, prepTime: 12 }
        ],
        dinner: [
            { name: 'Pittu with Coconut Milk', desc: 'Quick steamed rice flour with coconut milk gravy', calories: 340, protein: 8, carbs: 52, prepTime: 10 },
            { name: 'String Hoppers (Leftover)', desc: 'Reheated string hoppers with quick dhal', calories: 300, protein: 10, carbs: 48, prepTime: 5 },
            { name: 'Egg Roti', desc: 'Quick flatbread stuffed with spiced egg', calories: 320, protein: 14, carbs: 38, prepTime: 10 },
            { name: 'Dhal & Toast', desc: 'Quick red lentil dhal with bread', calories: 310, protein: 12, carbs: 45, prepTime: 10 }
        ],
        snacks: [
            { name: 'Boiled Chickpeas', desc: 'Boiled chickpeas with fresh coconut', calories: 160, protein: 8, carbs: 22, prepTime: 10 },
            { name: 'Banana', desc: 'Fresh Sri Lankan banana — ambul kesel or kolikuttu', calories: 90, protein: 1, carbs: 23, prepTime: 1 },
            { name: 'Coconut Roti Piece', desc: 'Quick coconut flatbread as a snack', calories: 130, protein: 3, carbs: 18, prepTime: 8 },
            { name: 'Curd & Treacle', desc: 'Buffalo curd with kithul treacle', calories: 160, protein: 5, carbs: 28, prepTime: 2 }
        ]
    },
    IN: {
        breakfast: [
            { name: 'Poha', desc: 'Quick flattened rice with peanuts and veggies', calories: 280, protein: 6, carbs: 48, prepTime: 10 },
            { name: 'Upma', desc: 'Semolina porridge with mustard seeds and vegetables', calories: 220, protein: 5, carbs: 38, prepTime: 10 },
            { name: 'Bread Omelette', desc: 'Egg omelette with bread — Indian street style', calories: 300, protein: 16, carbs: 28, prepTime: 8 },
            { name: 'Curd Rice', desc: 'Leftover rice mixed with yogurt and tempered', calories: 260, protein: 8, carbs: 42, prepTime: 5 }
        ],
        lunch: [
            { name: 'Quick Dal Rice', desc: 'Pressure-cooked dal with rice and pickle', calories: 380, protein: 14, carbs: 58, prepTime: 10 },
            { name: 'Egg Curry with Roti', desc: 'Quick egg masala with flatbread', calories: 400, protein: 18, carbs: 42, prepTime: 10 },
            { name: 'Vermicelli Upma', desc: 'Roasted vermicelli with vegetables', calories: 320, protein: 8, carbs: 55, prepTime: 12 },
            { name: 'Chapati Roll', desc: 'Rolled chapati with paneer or egg filling', calories: 380, protein: 16, carbs: 40, prepTime: 10 }
        ],
        dinner: [
            { name: 'Khichdi', desc: 'Rice and lentil comfort food with ghee', calories: 320, protein: 14, carbs: 55, prepTime: 10 },
            { name: 'Dosa with Chutney', desc: 'Quick crispy rice crepe with coconut chutney', calories: 280, protein: 6, carbs: 42, prepTime: 10 },
            { name: 'Curd Rice', desc: 'Comforting yogurt rice with pickle', calories: 260, protein: 8, carbs: 42, prepTime: 5 },
            { name: 'Egg Bhurji & Roti', desc: 'Spiced scrambled eggs with chapati', calories: 350, protein: 18, carbs: 32, prepTime: 10 }
        ],
        snacks: [
            { name: 'Lassi', desc: 'Refreshing yogurt drink — sweet or salted', calories: 150, protein: 5, carbs: 24, prepTime: 3 },
            { name: 'Masala Chai & Biscuits', desc: 'Spiced tea with digestive biscuits', calories: 130, protein: 3, carbs: 22, prepTime: 5 },
            { name: 'Roasted Chana', desc: 'Roasted chickpeas with spices', calories: 160, protein: 8, carbs: 22, prepTime: 1 },
            { name: 'Banana', desc: 'Fresh banana — quick energy', calories: 90, protein: 1, carbs: 23, prepTime: 1 }
        ]
    },
    JP: {
        breakfast: [
            { name: 'Onigiri', desc: 'Rice balls with nori and filling', calories: 180, protein: 4, carbs: 38, prepTime: 5 },
            { name: 'Tamagoyaki', desc: 'Quick Japanese rolled omelette', calories: 150, protein: 12, carbs: 2, prepTime: 8 },
            { name: 'Natto & Rice', desc: 'Fermented soybeans over rice', calories: 280, protein: 16, carbs: 38, prepTime: 3 },
            { name: 'Miso Soup & Toast', desc: 'Instant miso with whole grain toast', calories: 200, protein: 8, carbs: 28, prepTime: 5 }
        ],
        lunch: [
            { name: 'Bento Box', desc: 'Pre-prepared balanced meal box', calories: 480, protein: 24, carbs: 58, prepTime: 5 },
            { name: 'Udon', desc: 'Quick thick wheat noodles in broth', calories: 380, protein: 12, carbs: 68, prepTime: 10 },
            { name: 'Tamago Don', desc: 'Egg over rice bowl', calories: 400, protein: 16, carbs: 55, prepTime: 8 },
            { name: 'Ochazuke', desc: 'Green tea poured over rice with toppings', calories: 280, protein: 8, carbs: 48, prepTime: 5 }
        ],
        dinner: [
            { name: 'Tofu Steak', desc: 'Quick grilled tofu with soy glaze', calories: 280, protein: 18, carbs: 15, prepTime: 10 },
            { name: 'Yakitori', desc: 'Quick grilled chicken skewers', calories: 320, protein: 28, carbs: 8, prepTime: 10 },
            { name: 'Cold Soba', desc: 'Chilled buckwheat noodles with dipping sauce', calories: 300, protein: 10, carbs: 55, prepTime: 8 },
            { name: 'Egg Drop Soup & Rice', desc: 'Quick soup with steamed rice', calories: 320, protein: 12, carbs: 45, prepTime: 8 }
        ],
        snacks: [
            { name: 'Edamame', desc: 'Steamed soybeans with sea salt', calories: 120, protein: 11, carbs: 10, prepTime: 5 },
            { name: 'Mochi', desc: 'Sweet rice cake', calories: 100, protein: 2, carbs: 22, prepTime: 1 },
            { name: 'Senbei', desc: 'Rice crackers', calories: 80, protein: 2, carbs: 18, prepTime: 1 },
            { name: 'Fruit', desc: 'Fresh seasonal fruit', calories: 80, protein: 1, carbs: 20, prepTime: 1 }
        ]
    },
    US: {
        breakfast: [
            { name: 'Overnight Oats', desc: 'Pre-soaked oats with milk and berries — ready to eat', calories: 280, protein: 10, carbs: 45, prepTime: 2 },
            { name: 'Avocado Toast', desc: 'Whole grain toast with mashed avocado and egg', calories: 380, protein: 14, carbs: 32, prepTime: 5 },
            { name: 'Greek Yogurt Parfait', desc: 'Yogurt with granola and fruit', calories: 290, protein: 14, carbs: 38, prepTime: 3 },
            { name: 'Scrambled Eggs & Toast', desc: 'Quick eggs with whole wheat toast', calories: 320, protein: 18, carbs: 25, prepTime: 8 }
        ],
        lunch: [
            { name: 'Veggie Wrap', desc: 'Tortilla with hummus, lettuce, tomato', calories: 350, protein: 10, carbs: 45, prepTime: 5 },
            { name: 'Chicken Caesar Salad', desc: 'Pre-cooked chicken over romaine with dressing', calories: 400, protein: 30, carbs: 15, prepTime: 8 },
            { name: 'PB&J Sandwich', desc: 'Peanut butter and jam on whole grain', calories: 380, protein: 12, carbs: 48, prepTime: 3 }
        ],
        dinner: [
            { name: 'Chicken Stir Fry', desc: 'Quick lean chicken with vegetables', calories: 380, protein: 32, carbs: 22, prepTime: 10 },
            { name: 'Sheet Pan Chicken', desc: 'Chicken and veggies roasted together', calories: 400, protein: 35, carbs: 15, prepTime: 25 },
            { name: 'Cheese Omelette', desc: 'Three-egg omelette with cheese and toast', calories: 420, protein: 25, carbs: 20, prepTime: 8 },
            { name: 'Quesadilla', desc: 'Quick cheese and veggie quesadilla', calories: 400, protein: 18, carbs: 38, prepTime: 8 }
        ],
        snacks: [
            { name: 'Apple with Peanut Butter', desc: 'Healthy snack combo', calories: 200, protein: 6, carbs: 25, prepTime: 2 },
            { name: 'Trail Mix', desc: 'Nuts, seeds and dried fruit', calories: 200, protein: 6, carbs: 20, prepTime: 1 },
            { name: 'Cheese & Crackers', desc: 'Whole grain crackers with cheese slices', calories: 180, protein: 8, carbs: 18, prepTime: 2 },
            { name: 'Mixed Nuts', desc: 'Handful of almonds and walnuts', calories: 180, protein: 6, carbs: 8, prepTime: 1 }
        ]
    },
    GB: {
        breakfast: [
            { name: 'Porridge', desc: 'Quick oats with honey and berries', calories: 280, protein: 8, carbs: 48, prepTime: 5 },
            { name: 'Eggs on Toast', desc: 'Quick poached eggs on whole grain toast', calories: 320, protein: 18, carbs: 28, prepTime: 8 },
            { name: 'Toast & Marmite', desc: 'Whole grain toast with Marmite spread', calories: 200, protein: 6, carbs: 32, prepTime: 3 },
            { name: 'Cereal with Milk', desc: 'Wholegrain cereal with semi-skimmed milk and banana', calories: 260, protein: 8, carbs: 45, prepTime: 2 }
        ],
        lunch: [
            { name: 'Ploughman\'s Lunch', desc: 'Cheese, bread, pickles and salad', calories: 480, protein: 18, carbs: 42, prepTime: 5 },
            { name: 'Beans on Toast', desc: 'Baked beans on whole grain toast', calories: 340, protein: 14, carbs: 52, prepTime: 5 },
            { name: 'Cheese & Pickle Sandwich', desc: 'Classic English sandwich with cheddar', calories: 400, protein: 16, carbs: 42, prepTime: 5 },
            { name: 'Soup & Bread Roll', desc: 'Tinned soup with a fresh bread roll', calories: 350, protein: 10, carbs: 48, prepTime: 5 }
        ],
        dinner: [
            { name: 'Beans & Eggs on Toast', desc: 'Baked beans with fried egg on toast', calories: 380, protein: 20, carbs: 45, prepTime: 8 },
            { name: 'Cheese Toastie', desc: 'Grilled cheese sandwich with side salad', calories: 400, protein: 18, carbs: 35, prepTime: 8 },
            { name: 'Fish Fingers & Peas', desc: 'Quick fish fingers with mushy peas', calories: 380, protein: 22, carbs: 35, prepTime: 10 },
            { name: 'Quick Pasta', desc: 'Pasta with tinned tomato sauce and cheese', calories: 420, protein: 14, carbs: 62, prepTime: 10 }
        ],
        snacks: [
            { name: 'Crumpet with Jam', desc: 'Toasted crumpet with jam', calories: 150, protein: 3, carbs: 28, prepTime: 3 },
            { name: 'Fruit Scone', desc: 'With minimal butter', calories: 180, protein: 4, carbs: 32, prepTime: 2 },
            { name: 'Rich Tea Biscuits', desc: 'Classic biscuits with tea', calories: 100, protein: 2, carbs: 18, prepTime: 2 },
            { name: 'Apple', desc: 'Fresh apple — quick and healthy', calories: 80, protein: 0, carbs: 21, prepTime: 1 }
        ]
    },
    DEFAULT: {
        breakfast: [
            { name: 'Overnight Oats', desc: 'Pre-soaked oats with milk and berries — ready to eat', calories: 280, protein: 10, carbs: 45, prepTime: 2 },
            { name: 'Banana & Peanut Butter Toast', desc: 'Whole grain toast with peanut butter and banana', calories: 310, protein: 9, carbs: 42, prepTime: 5 },
            { name: 'Yogurt & Granola Bowl', desc: 'Greek yogurt with granola and honey', calories: 290, protein: 14, carbs: 38, prepTime: 3 },
            { name: 'Boiled Eggs', desc: 'Two boiled eggs with a slice of bread', calories: 260, protein: 18, carbs: 15, prepTime: 10 }
        ],
        lunch: [
            { name: 'Tuna Sandwich', desc: 'Whole wheat bread with canned tuna and veggies', calories: 400, protein: 28, carbs: 35, prepTime: 7 },
            { name: 'Instant Noodle Upgrade', desc: 'Noodles with a boiled egg, spinach and sesame', calories: 380, protein: 14, carbs: 52, prepTime: 8 },
            { name: 'Hummus & Crackers Plate', desc: 'Hummus with crackers, carrot and cucumber sticks', calories: 320, protein: 10, carbs: 40, prepTime: 5 }
        ],
        dinner: [
            { name: 'Vegetable Rice Bowl', desc: 'Brown rice with steamed vegetables', calories: 350, protein: 10, carbs: 60, prepTime: 15 },
            { name: 'Cheese Omelette', desc: 'Three-egg omelette with cheese and toast', calories: 420, protein: 25, carbs: 20, prepTime: 8 },
            { name: 'Quick Pasta', desc: 'Pasta with tomato sauce and cheese', calories: 400, protein: 14, carbs: 58, prepTime: 10 },
            { name: 'Bean Salad', desc: 'Canned beans, tomato with lime dressing', calories: 350, protein: 14, carbs: 35, prepTime: 7 }
        ],
        snacks: [
            { name: 'Trail Mix', desc: 'Nuts, seeds and dried fruit', calories: 200, protein: 6, carbs: 20, prepTime: 1 },
            { name: 'Fruit Salad', desc: 'Mixed fresh fruits', calories: 120, protein: 1, carbs: 30, prepTime: 5 },
            { name: 'Rice Cakes with Honey', desc: 'Light and crunchy with a drizzle of honey', calories: 130, protein: 2, carbs: 28, prepTime: 2 },
            { name: 'Cheese & Crackers', desc: 'Whole grain crackers with cheese slices', calories: 180, protein: 8, carbs: 18, prepTime: 2 }
        ]
    }
};

// Get meals for a country
function getMealsForCountry(countryCode) {
    return COUNTRY_FOODS[countryCode]?.meals || DEFAULT_MEALS;
}

// Get country name
function getCountryName(countryCode) {
    const country = COUNTRIES.find(c => c.code === countryCode);
    return country?.name || 'Your Country';
}
