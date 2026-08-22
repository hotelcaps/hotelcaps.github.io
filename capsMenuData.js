import { ref } from 'vue';

// This is the single source of truth for all menu information.
// To add, remove, or edit a menu item, you only need to change this file.
export const capsMenuData = ref([
    {
      "id": 1,
      "name": "Idiyappam",
      "category": "Breakfast & Breads",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Authentic steamed rice string hoppers, perfectly soft, light, and served warm.",
      "isBestseller": true,
      "image": "/images/menu/items/idiyappam.jpg",
      "specializations": [{ "name": "Regular", "price": 15, "isVeg": true }]
    },
    {
      "id": 2,
      "name": "Nice Pathiri",
      "category": "Breakfast & Breads",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Extremely thin and delicate traditional rice pancake, crafted for rich curries.",
      "isBestseller": false,
      "image": "/images/menu/items/nice-pathiri.jpg",
      "specializations": [{ "name": "Regular", "price": 13, "isVeg": true }]
    },
    {
      "id": 3,
      "name": "Puttu",
      "category": "Breakfast & Breads",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Classic steamed rice and coconut cake cylinder, a staple breakfast favorite.",
      "isBestseller": true,
      "image": "/images/menu/items/puttu.jpg",
      "specializations": [{ "name": "Regular", "price": 50, "isVeg": true }]
    },
    {
      "id": 4,
      "name": "Chapathi",
      "category": "Breakfast & Breads",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Soft, thin, and freshly roasted whole wheat bread cooked to perfection.",
      "isBestseller": false,
      "image": "/images/menu/items/chapathi.jpg",
      "specializations": [{ "name": "Regular", "price": 20, "isVeg": true }]
    },
    {
      "id": 5,
      "name": "Porotta",
      "category": "Breakfast & Breads",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Flaky, layered, and golden-brown traditional flatbread made fresh every day.",
      "isBestseller": true,
      "image": "/images/menu/items/porotta.jpg",
      "specializations": [{ "name": "Regular", "price": 19, "isVeg": true }]
    },
    {
      "id": 6,
      "name": "Nool Porotta",
      "category": "Breakfast & Breads",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Beautifully threaded, ultra-flaky flatbread offering a rich and crispy texture.",
      "isBestseller": false,
      "image": "/images/menu/items/nool-porotta.jpg",
      "specializations": [{ "name": "Regular", "price": 25, "isVeg": true }]
    },
    {
      "id": 7,
      "name": "Wheat Porotta",
      "category": "Breakfast & Breads",
      "outlet": "Multi Cuisine Restaurant",
      "info": "A healthier, layered whole wheat flatbread maintaining that classic flaky crunch.",
      "isBestseller": false,
      "image": "/images/menu/items/wheat-porotta.jpg",
      "specializations": [{ "name": "Regular", "price": 24, "isVeg": true }]
    },
    {
      "id": 8,
      "name": "Phulka",
      "category": "Breakfast & Breads",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Light, oil-free puffed wheat bread roasted directly over an open flame.",
      "isBestseller": false,
      "image": "/images/menu/items/phulka.jpg",
      "specializations": [{ "name": "Regular", "price": 16, "isVeg": true }]
    },
    {
      "id": 9,
      "name": "Manchow Soup",
      "category": "Soups",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Spicy, savory, and thick Asian soup topped with crispy fried noodles.",
      "isBestseller": true,
      "image": "/images/menu/items/manchow-soup.jpg",
      "specializations": [
        { "name": "Veg", "price": 140, "isVeg": true },
        { "name": "Chicken", "price": 160, "isVeg": false }
      ]
    },
    {
      "id": 10,
      "name": "Lemon Coriander Soup",
      "category": "Soups",
      "outlet": "Multi Cuisine Restaurant",
      "info": "A soothing, clear broth infused with fresh coriander and tangy lemon.",
      "isBestseller": false,
      "image": "/images/menu/items/lemon-coriander-soup.jpg",
      "specializations": [
        { "name": "Veg", "price": 140, "isVeg": true },
        { "name": "Chicken", "price": 160, "isVeg": false }
      ]
    },
    {
      "id": 11,
      "name": "East Chinese Noodle Soup",
      "category": "Soups",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Hearty, comforting broth packed with soft noodles and fresh savory ingredients.",
      "isBestseller": false,
      "image": "/images/menu/items/east-chinese-noodle-soup.jpg",
      "specializations": [
        { "name": "Veg", "price": 140, "isVeg": true },
        { "name": "Chicken", "price": 160, "isVeg": false }
      ]
    },
    {
      "id": 12,
      "name": "Sweetcorn / Hot & Sour / Clear Soup",
      "category": "Soups",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Your choice of our all-time favorite, freshly prepared hot Asian soups.",
      "isBestseller": true,
      "image": "/images/menu/items/sweetcorn-hotnsour-clear.jpg",
      "specializations": [
        { "name": "Veg", "price": 140, "isVeg": true },
        { "name": "Chicken", "price": 160, "isVeg": false }
      ]
    },
    {
      "id": 13,
      "name": "Choice of Cream Soup",
      "category": "Soups",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Rich, velvety cream soups. Choose from tomato, mushroom, veg, or chicken.",
      "isBestseller": false,
      "image": "/images/menu/items/choice-of-cream-soup.jpg",
      "specializations": [
        { "name": "Veg", "price": 140, "isVeg": true },
        { "name": "Chicken", "price": 160, "isVeg": false }
      ]
    },
    {
      "id": 14,
      "name": "Chicken 65",
      "category": "Starters",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Spicy, deep-fried chicken chunks marinated in traditional South Indian fiery spices.",
      "isBestseller": true,
      "image": "/images/menu/items/chicken-65.jpg",
      "specializations": [{ "name": "Regular", "price": 200, "isVeg": false }]
    },
    {
      "id": 15,
      "name": "Chicken 65 Boneless",
      "category": "Starters",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Boneless cubes of spicy, deep-fried chicken tossed in curry leaves.",
      "isBestseller": true,
      "image": "/images/menu/items/chicken-65-boneless.jpg",
      "specializations": [{ "name": "Regular", "price": 250, "isVeg": false }]
    },
    {
      "id": 16,
      "name": "Gobi 65",
      "category": "Starters",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Crispy fried cauliflower florets tossed in a spicy, aromatic red sauce.",
      "isBestseller": false,
      "image": "/images/menu/items/gobi-65.jpg",
      "specializations": [{ "name": "Regular", "price": 170, "isVeg": true }]
    },
    {
      "id": 17,
      "name": "Paneer 65",
      "category": "Starters",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Soft cottage cheese cubes perfectly fried and tossed in robust spices.",
      "isBestseller": false,
      "image": "/images/menu/items/paneer-65.jpg",
      "specializations": [{ "name": "Regular", "price": 210, "isVeg": true }]
    },
    {
      "id": 18,
      "name": "Mushroom 65",
      "category": "Starters",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Fresh button mushrooms coated in seasoned batter and fried until crispy.",
      "isBestseller": false,
      "image": "/images/menu/items/mushroom-65.jpg",
      "specializations": [{ "name": "Regular", "price": 190, "isVeg": true }]
    },
    {
      "id": 19,
      "name": "Dragon Chicken",
      "category": "Starters",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Fiery, Indo-Chinese style chicken strips tossed in a dark soy-garlic sauce.",
      "isBestseller": true,
      "image": "/images/menu/items/dragon-chicken.jpg",
      "specializations": [{ "name": "Regular", "price": 280, "isVeg": false }]
    },
    {
      "id": 20,
      "name": "Chicken Lollipop",
      "category": "Starters",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Crispy frenched chicken winglets served with a tangy szechwan dipping sauce.",
      "isBestseller": true,
      "image": "/images/menu/items/chicken-lollipop.jpg",
      "specializations": [{ "name": "Regular", "price": 250, "isVeg": false }]
    },
    {
      "id": 21,
      "name": "Honey Glazed Chicken",
      "category": "Starters",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Sweet, savory, and sticky chicken bites glazed with premium natural honey.",
      "isBestseller": false,
      "image": "/images/menu/items/honey-glazed-chicken.jpg",
      "specializations": [{ "name": "Regular", "price": 290, "isVeg": false }]
    },
    {
      "id": 22,
      "name": "Mushroom Pepper Ularthu",
      "category": "Starters",
      "outlet": "Multi Cuisine Restaurant",
      "info": "A dry, intense mushroom roast packed with freshly cracked black pepper.",
      "isBestseller": false,
      "image": "/images/menu/items/mushroom-pepper-ularthu.jpg",
      "specializations": [{ "name": "Regular", "price": 200, "isVeg": true }]
    },
    {
      "id": 23,
      "name": "Momos (Fried / Steamed)",
      "category": "Starters",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Deliciously stuffed dumplings, served either perfectly steamed or golden fried.",
      "isBestseller": true,
      "image": "/images/menu/items/momos-fried-steamed.jpg",
      "specializations": [
        { "name": "Veg", "price": 200, "isVeg": true },
        { "name": "Chicken", "price": 220, "isVeg": false }
      ]
    },
    {
      "id": 24,
      "name": "Tawa Fried Prawns",
      "category": "Starters",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Fresh, succulent prawns marinated in coastal spices and seared on iron.",
      "isBestseller": true,
      "image": "/images/menu/items/tawa-fried-prawns.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": false }]
    },
    {
      "id": 25,
      "name": "Fish 65",
      "category": "Starters",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Crispy, spice-battered fried fish cubes served with lemon and onions.",
      "isBestseller": false,
      "image": "/images/menu/items/fish-65.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": false }]
    },
    {
      "id": 26,
      "name": "Meals",
      "category": "Rice & Biriyani",
      "outlet": "Multi Cuisine Restaurant",
      "info": "A wholesome, traditional plated meal featuring rice and multiple homestyle curries.",
      "isBestseller": false,
      "image": "/images/menu/items/meals.jpg",
      "specializations": [{ "name": "Regular", "price": 110, "isVeg": true }]
    },
    {
      "id": 27,
      "name": "Pothichoru Veg",
      "category": "Rice & Biriyani",
      "outlet": "Multi Cuisine Restaurant",
      "info": "A nostalgic vegetarian rice meal tightly wrapped inside a roasted banana leaf.",
      "isBestseller": true,
      "image": "/images/menu/items/pothichoru-veg.jpg",
      "specializations": [{ "name": "Regular", "price": 110, "isVeg": true }]
    },
    {
      "id": 28,
      "name": "Chatti Choru Veg",
      "category": "Rice & Biriyani",
      "outlet": "Multi Cuisine Restaurant",
      "info": "An authentic vegetarian feast served directly inside a traditional earthen claypot.",
      "isBestseller": false,
      "image": "/images/menu/items/chatti-choru-veg.jpg",
      "specializations": [{ "name": "Regular", "price": 180, "isVeg": true }]
    },
    {
      "id": 29,
      "name": "Chatti Choru Non Veg",
      "category": "Rice & Biriyani",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Meat curries, roasts, and rice served hot in a rustic earthen pot.",
      "isBestseller": true,
      "image": "/images/menu/items/chatti-choru-non-veg.jpg",
      "specializations": [{ "name": "Regular", "price": 260, "isVeg": false }]
    },
    {
      "id": 30,
      "name": "Dum Chicken Biriyani",
      "category": "Rice & Biriyani",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Signature slow-cooked aromatic basmati rice layered with spiced, tender chicken chunks.",
      "isBestseller": true,
      "image": "/images/menu/items/dhum-chicken-biriyani.jpg",
      "specializations": [{ "name": "Regular", "price": 175, "isVeg": false }]
    },
    {
      "id": 31,
      "name": "Beef Biriyani",
      "category": "Rice & Biriyani",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Rich, intensely flavored local beef roast layered with fragrant basmati rice.",
      "isBestseller": true,
      "image": "/images/menu/items/beef-biriyani.jpg",
      "specializations": [{ "name": "Regular", "price": 200, "isVeg": false }]
    },
    {
      "id": 32,
      "name": "Mutton Biriyani",
      "category": "Rice & Biriyani",
      "outlet": "Multi Cuisine Restaurant",
      "info": "A royal delicacy of perfectly tenderized mutton layered with aromatic spices.",
      "isBestseller": false,
      "image": "/images/menu/items/mutton-biriyani.jpg",
      "specializations": [{ "name": "Regular", "price": 340, "isVeg": false }]
    },
    {
      "id": 33,
      "name": "Egg Biriyani",
      "category": "Rice & Biriyani",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Fragrant rice layered with boiled eggs and a deeply flavored masala base.",
      "isBestseller": false,
      "image": "/images/menu/items/egg-biriyani.jpg",
      "specializations": [{ "name": "Regular", "price": 150, "isVeg": false }]
    },
    {
      "id": 34,
      "name": "Vegetable Biriyani",
      "category": "Rice & Biriyani",
      "outlet": "Multi Cuisine Restaurant",
      "info": "A colorful medley of fresh garden vegetables cooked with aromatic rice.",
      "isBestseller": false,
      "image": "/images/menu/items/vegetable-biriyani.jpg",
      "specializations": [{ "name": "Regular", "price": 140, "isVeg": true }]
    },
    {
      "id": 35,
      "name": "Paneer Biriyani",
      "category": "Rice & Biriyani",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Soft cottage cheese cubes marinated and layered with spiced biryani rice.",
      "isBestseller": false,
      "image": "/images/menu/items/paneer-biriyani.jpg",
      "specializations": [{ "name": "Regular", "price": 180, "isVeg": true }]
    },
    {
      "id": 36,
      "name": "Mushroom Biriyani",
      "category": "Rice & Biriyani",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Earthy mushrooms slow-cooked into an aromatic, vegetarian delight.",
      "isBestseller": false,
      "image": "/images/menu/items/mushroom-biriyani.jpg",
      "specializations": [{ "name": "Regular", "price": 170, "isVeg": true }]
    },
    {
      "id": 37,
      "name": "Ghee Rice",
      "category": "Rice & Biriyani",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Premium white rice tossed with pure clarified butter, cashews, and raisins.",
      "isBestseller": false,
      "image": "/images/menu/items/ghee-rice.jpg",
      "specializations": [{ "name": "Regular", "price": 120, "isVeg": true }]
    },
    {
      "id": 38,
      "name": "Biriyani Rice",
      "category": "Rice & Biriyani",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Plain, flavorful, and spiced biryani rice served without the meat layer.",
      "isBestseller": false,
      "image": "/images/menu/items/biriyani-rice.jpg",
      "specializations": [{ "name": "Regular", "price": 130, "isVeg": true }]
    },
    {
      "id": 39,
      "name": "Veg Fried Rice",
      "category": "Rice & Biriyani",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Wok-tossed rice with finely chopped carrots, beans, and fresh spring onions.",
      "isBestseller": false,
      "image": "/images/menu/items/veg-fried-rice.jpg",
      "specializations": [{ "name": "Regular", "price": 150, "isVeg": true }]
    },
    {
      "id": 40,
      "name": "Paneer Fried Rice",
      "category": "Rice & Biriyani",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Classic vegetable fried rice tossed with golden fried paneer cubes.",
      "isBestseller": false,
      "image": "/images/menu/items/paneer-fried-rice.jpg",
      "specializations": [{ "name": "Regular", "price": 170, "isVeg": true }]
    },
    {
      "id": 41,
      "name": "Mushroom Fried Rice",
      "category": "Rice & Biriyani",
      "outlet": "Multi Cuisine Restaurant",
      "info": "A light and savory fried rice heavily featuring stir-fried button mushrooms.",
      "isBestseller": false,
      "image": "/images/menu/items/mushroom-fried-rice.jpg",
      "specializations": [{ "name": "Regular", "price": 160, "isVeg": true }]
    },
    {
      "id": 42,
      "name": "Egg Fried Rice",
      "category": "Rice & Biriyani",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Quick-tossed wok rice featuring fluffy scrambled eggs and mild soy sauce.",
      "isBestseller": false,
      "image": "/images/menu/items/egg-fried-rice.jpg",
      "specializations": [{ "name": "Regular", "price": 160, "isVeg": false }]
    },
    {
      "id": 43,
      "name": "Chicken Fried Rice",
      "category": "Rice & Biriyani",
      "outlet": "Multi Cuisine Restaurant",
      "info": "The classic Indo-Chinese favorite packed with shredded chicken and veggies.",
      "isBestseller": true,
      "image": "/images/menu/items/chicken-fried-rice.jpg",
      "specializations": [{ "name": "Regular", "price": 180, "isVeg": false }]
    },
    {
      "id": 44,
      "name": "Mixed Fried Rice",
      "category": "Rice & Biriyani",
      "outlet": "Multi Cuisine Restaurant",
      "info": "An ultimate combination of chicken, eggs, and prawns wok-tossed together.",
      "isBestseller": true,
      "image": "/images/menu/items/mixed-fried-rice.jpg",
      "specializations": [{ "name": "Regular", "price": 210, "isVeg": false }]
    },
    {
      "id": 45,
      "name": "Schezwan Veg Fried Rice",
      "category": "Rice & Biriyani",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Spicy, red pepper infused wok rice with a medley of fresh vegetables.",
      "isBestseller": false,
      "image": "/images/menu/items/schezwan-veg-fried-rice.jpg",
      "specializations": [{ "name": "Regular", "price": 160, "isVeg": true }]
    },
    {
      "id": 46,
      "name": "Schezwan Paneer Fried Rice",
      "category": "Rice & Biriyani",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Spicy Schezwan rice beautifully balanced with soft, mild paneer cubes.",
      "isBestseller": false,
      "image": "/images/menu/items/schezwan-paneer-fried-rice.jpg",
      "specializations": [{ "name": "Regular", "price": 180, "isVeg": true }]
    },
    {
      "id": 47,
      "name": "Schezwan Mushroom Fried Rice",
      "category": "Rice & Biriyani",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Hot and pungent fried rice layered with earthy mushroom slices.",
      "isBestseller": false,
      "image": "/images/menu/items/schezwan-mushroom-fried-rice.jpg",
      "specializations": [{ "name": "Regular", "price": 170, "isVeg": true }]
    },
    {
      "id": 48,
      "name": "Schezwan Egg Fried Rice",
      "category": "Rice & Biriyani",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Spicy schezwan fried rice enriched with wok-scrambled fluffy eggs.",
      "isBestseller": false,
      "image": "/images/menu/items/schezwan-egg-fried-rice.jpg",
      "specializations": [{ "name": "Regular", "price": 170, "isVeg": false }]
    },
    {
      "id": 49,
      "name": "Schezwan Chicken Fried Rice",
      "category": "Rice & Biriyani",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Fiery, garlic-rich fried rice loaded with tender chicken pieces.",
      "isBestseller": true,
      "image": "/images/menu/items/schezwan-chicken-fried-rice.jpg",
      "specializations": [{ "name": "Regular", "price": 190, "isVeg": false }]
    },
    {
      "id": 50,
      "name": "Schezwan Mixed Fried Rice",
      "category": "Rice & Biriyani",
      "outlet": "Multi Cuisine Restaurant",
      "info": "The spiciest, meatiest wok rice packed with chicken, egg, and seafood.",
      "isBestseller": false,
      "image": "/images/menu/items/schezwan-mixed-fried-rice.jpg",
      "specializations": [{ "name": "Regular", "price": 220, "isVeg": false }]
    },
    {
      "id": 51,
      "name": "Veg Noodles",
      "category": "Noodles",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Soft noodles stir-fried with crunchy cabbage, carrots, and light soy.",
      "isBestseller": false,
      "image": "/images/menu/items/veg-noodles.jpg",
      "specializations": [{ "name": "Regular", "price": 160, "isVeg": true }]
    },
    {
      "id": 52,
      "name": "Egg Noodles",
      "category": "Noodles",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Classic stir-fried noodles tossed seamlessly with fresh scrambled eggs.",
      "isBestseller": false,
      "image": "/images/menu/items/egg-noodles.jpg",
      "specializations": [{ "name": "Regular", "price": 170, "isVeg": false }]
    },
    {
      "id": 53,
      "name": "Chicken Noodles",
      "category": "Noodles",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Everyone's favorite wok-tossed noodles generously mixed with shredded chicken.",
      "isBestseller": true,
      "image": "/images/menu/items/chicken-noodles.jpg",
      "specializations": [{ "name": "Regular", "price": 180, "isVeg": false }]
    },
    {
      "id": 54,
      "name": "Mixed Noodles",
      "category": "Noodles",
      "outlet": "Multi Cuisine Restaurant",
      "info": "A heavy, satisfying portion of noodles featuring egg, chicken, and prawns.",
      "isBestseller": true,
      "image": "/images/menu/items/mixed-noodles.jpg",
      "specializations": [{ "name": "Regular", "price": 210, "isVeg": false }]
    },
    {
      "id": 55,
      "name": "Schezwan Veg Noodles",
      "category": "Noodles",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Spicy, garlic-heavy noodles tossed with an assortment of fresh vegetables.",
      "isBestseller": false,
      "image": "/images/menu/items/schezwan-veg-noodles.jpg",
      "specializations": [{ "name": "Regular", "price": 170, "isVeg": true }]
    },
    {
      "id": 56,
      "name": "Schezwan Egg Noodles",
      "category": "Noodles",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Fiery noodles intertwined with scrambled egg for a robust flavor.",
      "isBestseller": false,
      "image": "/images/menu/items/schezwan-egg-noodles.jpg",
      "specializations": [{ "name": "Regular", "price": 180, "isVeg": false }]
    },
    {
      "id": 57,
      "name": "Schezwan Chicken Noodles",
      "category": "Noodles",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Intensely spicy red noodles mixed with succulent pieces of chicken.",
      "isBestseller": false,
      "image": "/images/menu/items/schezwan-chicken-noodles.jpg",
      "specializations": [{ "name": "Regular", "price": 190, "isVeg": false }]
    },
    {
      "id": 58,
      "name": "Schezwan Mixed Noodles",
      "category": "Noodles",
      "outlet": "Multi Cuisine Restaurant",
      "info": "The ultimate spicy noodle experience, packed with an array of meats.",
      "isBestseller": false,
      "image": "/images/menu/items/schezwan-mixed-noodles.jpg",
      "specializations": [{ "name": "Regular", "price": 220, "isVeg": false }]
    },
    {
      "id": 59,
      "name": "Paal Kappa Beef",
      "category": "Traditional Highlights",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Creamy, coconut-milk mashed tapioca served alongside a dark, spicy beef roast.",
      "isBestseller": true,
      "image": "/images/menu/items/paal-kappa-beef.jpg",
      "specializations": [{ "name": "Regular", "price": 240, "isVeg": false }]
    },
    {
      "id": 60,
      "name": "Paal Kappa Chicken",
      "category": "Traditional Highlights",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Smooth mashed tapioca perfectly paired with a rich, aromatic chicken roast.",
      "isBestseller": false,
      "image": "/images/menu/items/paal-kappa-chicken.jpg",
      "specializations": [{ "name": "Regular", "price": 240, "isVeg": false }]
    },
    {
      "id": 61,
      "name": "Kizhi Porotta Chicken",
      "category": "Traditional Highlights",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Porotta and chicken gravy tied in a banana leaf and steam-roasted.",
      "isBestseller": true,
      "image": "/images/menu/items/kizhi-porotta-chicken.jpg",
      "specializations": [{ "name": "Regular", "price": 170, "isVeg": false }]
    },
    {
      "id": 62,
      "name": "Kizhi Porotta Beef",
      "category": "Traditional Highlights",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Flaky porottas soaked in beef gravy, steamed inside a banana leaf bundle.",
      "isBestseller": true,
      "image": "/images/menu/items/kizhi-porotta-beef.jpg",
      "specializations": [{ "name": "Regular", "price": 180, "isVeg": false }]
    },
    {
      "id": 63,
      "name": "Kizhi Porotta Egg",
      "category": "Traditional Highlights",
      "outlet": "Multi Cuisine Restaurant",
      "info": "A flavorful banana leaf bundle filled with porotta and rich egg roast.",
      "isBestseller": false,
      "image": "/images/menu/items/kizhi-porotta-egg.jpg",
      "specializations": [{ "name": "Regular", "price": 150, "isVeg": false }]
    },
    {
      "id": 64,
      "name": "Pothi Porotta Chicken",
      "category": "Traditional Highlights",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Classic folded leaf parcel sealing in the flavors of chicken and bread.",
      "isBestseller": false,
      "image": "/images/menu/items/pothi-porotta-chicken.jpg",
      "specializations": [{ "name": "Regular", "price": 170, "isVeg": false }]
    },
    {
      "id": 65,
      "name": "Pothi Porotta Beef",
      "category": "Traditional Highlights",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Traditional parcel packing beef roast and flatbread for an infused taste.",
      "isBestseller": false,
      "image": "/images/menu/items/pothi-porotta-beef.jpg",
      "specializations": [{ "name": "Regular", "price": 180, "isVeg": false }]
    },
    {
      "id": 66,
      "name": "Pothi Porotta Egg",
      "category": "Traditional Highlights",
      "outlet": "Multi Cuisine Restaurant",
      "info": "A simple, delicious leaf-wrapped parcel of porottas and savory egg curry.",
      "isBestseller": false,
      "image": "/images/menu/items/pothi-porotta-egg.jpg",
      "specializations": [{ "name": "Regular", "price": 150, "isVeg": false }]
    },
    {
      "id": 67,
      "name": "Kothu Porotta Chicken",
      "category": "Traditional Highlights",
      "outlet": "Multi Cuisine Restaurant",
      "info": "Minced flatbread violently chopped and stir-fried with chicken and spices.",
      "isBestseller": true,
      "image": "/images/menu/items/kothu-porotta-chicken.jpg",
      "specializations": [{ "name": "Regular", "price": 170, "isVeg": false }]
    },
    {
      "id": 68,
      "name": "Kothu Porotta Beef",
      "category": "Traditional Highlights",
      "outlet": "Multi Cuisine Restaurant",
      "info": "The quintessential street food experience featuring shredded bread and beef.",
      "isBestseller": true,
      "image": "/images/menu/items/kothu-porotta-beef.jpg",
      "specializations": [{ "name": "Regular", "price": 180, "isVeg": false }]
    },
    {
      "id": 69,
      "name": "Kothu Porotta Egg",
      "category": "Traditional Highlights",
      "outlet": "Multi Cuisine Restaurant",
      "info": "A lighter, savory mince of bread, scrambled eggs, and fragrant masala.",
      "isBestseller": false,
      "image": "/images/menu/items/kothu-porotta-egg.jpg",
      "specializations": [{ "name": "Regular", "price": 150, "isVeg": false }]
    },
    {
      "id": 70,
      "name": "Alfaham",
      "category": "Alfaham",
      "outlet": "Arabic Corner",
      "info": "Authentic, charcoal-grilled Arabian chicken marinated with secret Middle Eastern spices.",
      "isBestseller": true,
      "image": "/images/menu/items/alfaham.jpg",
      "specializations": [
        { "name": "Quarter", "price": 160, "isVeg": false },
        { "name": "Half", "price": 310, "isVeg": false },
        { "name": "Full", "price": 610, "isVeg": false }
      ]
    },
    {
      "id": 71,
      "name": "Peri Peri Alfaham",
      "category": "Alfaham",
      "outlet": "Arabic Corner",
      "info": "Juicy grilled chicken coated extensively in a hot, tangy peri-peri marinade.",
      "isBestseller": true,
      "image": "/images/menu/items/peri-peri-alfaham.jpg",
      "specializations": [
        { "name": "Quarter", "price": 170, "isVeg": false },
        { "name": "Half", "price": 330, "isVeg": false },
        { "name": "Full", "price": 620, "isVeg": false }
      ]
    },
    {
      "id": 72,
      "name": "BBQ Alfaham",
      "category": "Alfaham",
      "outlet": "Arabic Corner",
      "info": "A smoky, sweet, and sticky barbeque glazed version of our classic grill.",
      "isBestseller": false,
      "image": "/images/menu/items/bbq-alfaham.jpg",
      "specializations": [
        { "name": "Quarter", "price": 170, "isVeg": false },
        { "name": "Half", "price": 330, "isVeg": false },
        { "name": "Full", "price": 620, "isVeg": false }
      ]
    },
    {
      "id": 73,
      "name": "Pepper Alfaham",
      "category": "Alfaham",
      "outlet": "Arabic Corner",
      "info": "Charcoal grilled chicken rubbed generously with crushed, sharp black peppercorns.",
      "isBestseller": false,
      "image": "/images/menu/items/pepper-alfaham.jpg",
      "specializations": [
        { "name": "Quarter", "price": 170, "isVeg": false },
        { "name": "Half", "price": 330, "isVeg": false },
        { "name": "Full", "price": 620, "isVeg": false }
      ]
    },
    {
      "id": 74,
      "name": "Kanthari Alfaham",
      "category": "Alfaham",
      "outlet": "Arabic Corner",
      "info": "An extremely spicy regional twist infused with the fierce Kanthari chili.",
      "isBestseller": false,
      "image": "/images/menu/items/kanthari-alfaham.jpg",
      "specializations": [
        { "name": "Quarter", "price": 180, "isVeg": false },
        { "name": "Half", "price": 350, "isVeg": false },
        { "name": "Full", "price": 640, "isVeg": false }
      ]
    },
    {
      "id": 75,
      "name": "Honey Alfaham",
      "category": "Alfaham",
      "outlet": "Arabic Corner",
      "info": "A wonderfully caramelized, sweet exterior coating the tender charcoal-cooked meat.",
      "isBestseller": false,
      "image": "/images/menu/items/honey-alfaham.jpg",
      "specializations": [
        { "name": "Quarter", "price": 180, "isVeg": false },
        { "name": "Half", "price": 350, "isVeg": false },
        { "name": "Full", "price": 640, "isVeg": false }
      ]
    },
    {
      "id": 76,
      "name": "Honey Chilli Alfaham",
      "category": "Alfaham",
      "outlet": "Arabic Corner",
      "info": "The perfect sweet-and-spicy balance, glazed with honey and fiery chili flakes.",
      "isBestseller": true,
      "image": "/images/menu/items/honey-chilli-alfaham.jpg",
      "specializations": [
        { "name": "Quarter", "price": 180, "isVeg": false },
        { "name": "Half", "price": 350, "isVeg": false },
        { "name": "Full", "price": 640, "isVeg": false }
      ]
    },
    {
      "id": 77,
      "name": "Caps Special Alfaham Mandi",
      "category": "Alfaham Mandi Specials",
      "outlet": "Arabic Corner",
      "info": "Our signature, fully loaded Mandi platter topped with our chef's special grill.",
      "isBestseller": true,
      "image": "/images/menu/items/caps-special-alfaham-mandi.jpg",
      "specializations": [
        { "name": "Quarter", "price": 250, "isVeg": false },
        { "name": "Half", "price": 480, "isVeg": false },
        { "name": "Full", "price": 830, "isVeg": false }
      ]
    },
    {
      "id": 78,
      "name": "Alfaham Mandi",
      "category": "Alfaham Mandi",
      "outlet": "Arabic Corner",
      "info": "Traditional smoked Mandi rice served beneath a perfectly charred classic Alfaham.",
      "isBestseller": true,
      "image": "/images/menu/items/alfaham-mandi.jpg",
      "specializations": [
        { "name": "Quarter", "price": 220, "isVeg": false },
        { "name": "Half", "price": 410, "isVeg": false },
        { "name": "Full", "price": 780, "isVeg": false }
      ]
    },
    {
      "id": 79,
      "name": "Peri Peri Alfaham Mandi",
      "category": "Alfaham Mandi",
      "outlet": "Arabic Corner",
      "info": "Tangy and spicy peri-peri grilled chicken complementing rich, mild Mandi rice.",
      "isBestseller": false,
      "image": "/images/menu/items/peri-peri-alfaham-mandi.jpg",
      "specializations": [
        { "name": "Quarter", "price": 230, "isVeg": false },
        { "name": "Half", "price": 440, "isVeg": false },
        { "name": "Full", "price": 790, "isVeg": false }
      ]
    },
    {
      "id": 80,
      "name": "BBQ Alfaham Mandi",
      "category": "Alfaham Mandi",
      "outlet": "Arabic Corner",
      "info": "Sweet, smoky barbeque chicken nestled atop a bed of authentic Yemeni rice.",
      "isBestseller": false,
      "image": "/images/menu/items/bbq-alfaham-mandi.jpg",
      "specializations": [
        { "name": "Quarter", "price": 230, "isVeg": false },
        { "name": "Half", "price": 440, "isVeg": false },
        { "name": "Full", "price": 790, "isVeg": false }
      ]
    },
    {
      "id": 81,
      "name": "Pepper Alfaham Mandi",
      "category": "Alfaham Mandi",
      "outlet": "Arabic Corner",
      "info": "Sharp, black-pepper crusted chicken providing a bold contrast to the rice.",
      "isBestseller": false,
      "image": "/images/menu/items/pepper-alfaham-mandi.jpg",
      "specializations": [
        { "name": "Quarter", "price": 230, "isVeg": false },
        { "name": "Half", "price": 440, "isVeg": false },
        { "name": "Full", "price": 790, "isVeg": false }
      ]
    },
    {
      "id": 82,
      "name": "Kanthari Alfaham Mandi",
      "category": "Alfaham Mandi",
      "outlet": "Arabic Corner",
      "info": "Extreme heat meets subtle aromatics in this unique, chili-heavy Mandi variant.",
      "isBestseller": false,
      "image": "/images/menu/items/kanthari-alfaham-mandi.jpg",
      "specializations": [
        { "name": "Quarter", "price": 240, "isVeg": false },
        { "name": "Half", "price": 460, "isVeg": false },
        { "name": "Full", "price": 810, "isVeg": false }
      ]
    },
    {
      "id": 83,
      "name": "Honey Alfaham Mandi",
      "category": "Alfaham Mandi",
      "outlet": "Arabic Corner",
      "info": "A sweet, sticky glaze pairs beautifully with the slow-cooked savory grains.",
      "isBestseller": false,
      "image": "/images/menu/items/honey-alfaham-mandi.jpg",
      "specializations": [
        { "name": "Quarter", "price": 240, "isVeg": false },
        { "name": "Half", "price": 460, "isVeg": false },
        { "name": "Full", "price": 810, "isVeg": false }
      ]
    },
    {
      "id": 84,
      "name": "Honey Chilli Alfaham Mandi",
      "category": "Alfaham Mandi",
      "outlet": "Arabic Corner",
      "info": "The ultimate flavor bomb: sweet, spicy chicken over deeply aromatic rice.",
      "isBestseller": false,
      "image": "/images/menu/items/honey-chilli-alfaham-mandi.jpg",
      "specializations": [
        { "name": "Quarter", "price": 240, "isVeg": false },
        { "name": "Half", "price": 460, "isVeg": false },
        { "name": "Full", "price": 810, "isVeg": false }
      ]
    },
    {
      "id": 85,
      "name": "Mandi Rice",
      "category": "Alfaham Mandi",
      "outlet": "Arabic Corner",
      "info": "A generous, standalone portion of our fragrant, smoked, and spiced Arabian rice.",
      "isBestseller": false,
      "image": "/images/menu/items/mandi-rice.jpg",
      "specializations": [{ "name": "Regular", "price": 130, "isVeg": true }]
    },
    {
      "id": 86,
      "name": "Apple",
      "category": "Fruit juices",
      "outlet": "Chill N Chai",
      "info": "Freshly pressed, crisp, and naturally sweet apple juice to refresh your day.",
      "isBestseller": false,
      "image": "/images/menu/items/apple-juice.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 87,
      "name": "Anar",
      "category": "Fruit juices",
      "outlet": "Chill N Chai",
      "info": "A ruby-red, antioxidant-rich fresh pomegranate juice, served completely chilled.",
      "isBestseller": true,
      "image": "/images/menu/items/anar-juice.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 88,
      "name": "Grapes",
      "category": "Fruit juices",
      "outlet": "Chill N Chai",
      "info": "Sweet, slightly tart, and vibrant freshly crushed dark grape juice.",
      "isBestseller": false,
      "image": "/images/menu/items/grape-juice.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 89,
      "name": "Pineapple",
      "category": "Fruit juices",
      "outlet": "Chill N Chai",
      "info": "Tropical, tangy, and intensely refreshing pure pineapple juice with zero additives.",
      "isBestseller": true,
      "image": "/images/menu/items/pineapple-juice.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 90,
      "name": "Watermelon",
      "category": "Fruit juices",
      "outlet": "Chill N Chai",
      "info": "The ultimate summer cooler: pure, ice-cold, naturally sweet watermelon juice.",
      "isBestseller": true,
      "image": "/images/menu/items/watermelon-juice.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 91,
      "name": "Musambi",
      "category": "Fruit juices",
      "outlet": "Chill N Chai",
      "info": "Mildly sweet and wonderfully refreshing sweet lime juice squeezed to order.",
      "isBestseller": false,
      "image": "/images/menu/items/musambi-juice.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 92,
      "name": "Orange",
      "category": "Fruit juices",
      "outlet": "Chill N Chai",
      "info": "Classic, vibrant, and pulp-filled freshly squeezed orange juice.",
      "isBestseller": false,
      "image": "/images/menu/items/orange-juice.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 93,
      "name": "Chikku",
      "category": "Fruit juices",
      "outlet": "Chill N Chai",
      "info": "A thick, malty, and naturally sweet sapodilla extract served cold.",
      "isBestseller": false,
      "image": "/images/menu/items/chikku-juice.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 94,
      "name": "Mango",
      "category": "Fruit juices",
      "outlet": "Chill N Chai",
      "info": "Rich, golden, and heavenly mango juice representing the king of fruits.",
      "isBestseller": true,
      "image": "/images/menu/items/mango-juice.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 95,
      "name": "Chikku",
      "category": "Shakes",
      "outlet": "Chill N Chai",
      "info": "Creamy, malt-flavored shake blended thick with fresh sapodilla fruit.",
      "isBestseller": false,
      "image": "/images/menu/items/chikku-shake.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 96,
      "name": "Guava",
      "category": "Shakes",
      "outlet": "Chill N Chai",
      "info": "A unique, tropical, and slightly tart creamy milkshake experience.",
      "isBestseller": false,
      "image": "/images/menu/items/guava-shake.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 97,
      "name": "Papaya",
      "category": "Shakes",
      "outlet": "Chill N Chai",
      "info": "A sweet, vibrant orange shake packed with the goodness of papaya.",
      "isBestseller": false,
      "image": "/images/menu/items/papaya-shake.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 98,
      "name": "Mango",
      "category": "Shakes",
      "outlet": "Chill N Chai",
      "info": "The ultimate thick shake crafted from premium, sweet yellow mangoes.",
      "isBestseller": true,
      "image": "/images/menu/items/mango-shake.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 99,
      "name": "Dates",
      "category": "Shakes",
      "outlet": "Chill N Chai",
      "info": "A rich, energy-packed shake naturally sweetened with premium Arabian dates.",
      "isBestseller": true,
      "image": "/images/menu/items/dates-shake.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 100,
      "name": "Tender Coconut",
      "category": "Shakes",
      "outlet": "Chill N Chai",
      "info": "Cool, milky, and extremely refreshing shake featuring tender coconut meat.",
      "isBestseller": true,
      "image": "/images/menu/items/tender-coconut-shake.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 101,
      "name": "Chocolate",
      "category": "Shakes",
      "outlet": "Chill N Chai",
      "info": "A universally loved thick shake made with deep, rich cocoa.",
      "isBestseller": true,
      "image": "/images/menu/items/chocolate-shake.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 102,
      "name": "Strawberry",
      "category": "Shakes",
      "outlet": "Chill N Chai",
      "info": "Sweet, pink, and luscious classic strawberry flavored creamy shake.",
      "isBestseller": false,
      "image": "/images/menu/items/strawberry-shake.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 103,
      "name": "Oreo",
      "category": "Shakes",
      "outlet": "Chill N Chai",
      "info": "A crunch-filled, creamy delight loaded with crushed chocolate sandwich cookies.",
      "isBestseller": true,
      "image": "/images/menu/items/oreo-shake.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 104,
      "name": "Kitkat",
      "category": "Shakes",
      "outlet": "Chill N Chai",
      "info": "Wafer-chocolate perfection blended into a smooth, thick milk base.",
      "isBestseller": false,
      "image": "/images/menu/items/kitkat-shake.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 105,
      "name": "Badam",
      "category": "Shakes",
      "outlet": "Chill N Chai",
      "info": "A royal, nut-infused shake loaded with the richness of almonds.",
      "isBestseller": true,
      "image": "/images/menu/items/badam-shake.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 106,
      "name": "Rose Milk",
      "category": "Shakes",
      "outlet": "Chill N Chai",
      "info": "A nostalgic, fragrant pink shake flavored with cooling rose syrup.",
      "isBestseller": false,
      "image": "/images/menu/items/rose-milk-shake.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 107,
      "name": "Avocado",
      "category": "Shakes",
      "outlet": "Chill N Chai",
      "info": "A buttery, incredibly thick, and healthy green super-shake.",
      "isBestseller": true,
      "image": "/images/menu/items/avocado-shake.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 108,
      "name": "Mud Coffee",
      "category": "Shakes",
      "outlet": "Chill N Chai",
      "info": "An intense, heavy coffee-chocolate fusion shake for true caffeine lovers.",
      "isBestseller": false,
      "image": "/images/menu/items/mud-coffee-shake.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 109,
      "name": "Roohafza",
      "category": "Shakes",
      "outlet": "Chill N Chai",
      "info": "A classic, cooling herbal and floral milkshake, perfect for summers.",
      "isBestseller": false,
      "image": "/images/menu/items/roohafza-shake.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 110,
      "name": "Fig",
      "category": "Shakes",
      "outlet": "Chill N Chai",
      "info": "A unique, textured, and naturally sweet shake featuring dried figs.",
      "isBestseller": false,
      "image": "/images/menu/items/fig-shake.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 111,
      "name": "Jackfruit",
      "category": "Shakes",
      "outlet": "Chill N Chai",
      "info": "A dense, exotic shake harnessing the strong flavor of ripe jackfruit.",
      "isBestseller": false,
      "image": "/images/menu/items/jackfruit-shake.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 112,
      "name": "Custard Apple",
      "category": "Shakes",
      "outlet": "Chill N Chai",
      "info": "A gritty, incredibly creamy, and mildly sweet tropical fruit shake.",
      "isBestseller": false,
      "image": "/images/menu/items/custard-apple-shake.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 113,
      "name": "Kannur Cocktail",
      "category": "Shakes",
      "outlet": "Chill N Chai",
      "info": "The famous Malabar layered shake blending fruits, milk, and nuts.",
      "isBestseller": true,
      "image": "/images/menu/items/kannur-cocktail-shake.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 114,
      "name": "Normal",
      "category": "Avil milk",
      "outlet": "Chill N Chai",
      "info": "The classic, crunchy street-style drink made with roasted rice flakes.",
      "isBestseller": true,
      "image": "/images/menu/items/normal-avil-milk.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 115,
      "name": "Special",
      "category": "Avil milk",
      "outlet": "Chill N Chai",
      "info": "An upgraded version loaded with extra nuts, fruits, and ice cream.",
      "isBestseller": true,
      "image": "/images/menu/items/special-avil-milk.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 116,
      "name": "Tender Coconut",
      "category": "Avil milk",
      "outlet": "Chill N Chai",
      "info": "Roasted rice flakes submerged in a refreshing tender coconut milk base.",
      "isBestseller": false,
      "image": "/images/menu/items/tender-coconut-avil-milk.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 117,
      "name": "Cold Coffee",
      "category": "Cold beverages",
      "outlet": "Chill N Chai",
      "info": "A chilled, frothy, and perfectly sweet beverage to beat the heat.",
      "isBestseller": true,
      "image": "/images/menu/items/cold-coffee.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 118,
      "name": "Cold Boost",
      "category": "Cold beverages",
      "outlet": "Chill N Chai",
      "info": "A chilled, chocolate-malt milk drink loved by kids and adults alike.",
      "isBestseller": false,
      "image": "/images/menu/items/cold-boost.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 119,
      "name": "Cold Horlicks",
      "category": "Cold beverages",
      "outlet": "Chill N Chai",
      "info": "A classic, comforting malt-based beverage served refreshingly cold over ice.",
      "isBestseller": false,
      "image": "/images/menu/items/cold-horlicks.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 120,
      "name": "Tea",
      "category": "Hot beverages",
      "outlet": "Chill N Chai",
      "info": "A classic, comforting cup of traditional strong Indian milk tea.",
      "isBestseller": true,
      "image": "/images/menu/items/tea.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 121,
      "name": "Coffee",
      "category": "Hot beverages",
      "outlet": "Chill N Chai",
      "info": "A hot, frothy, and highly aromatic cup of strong brewed coffee.",
      "isBestseller": true,
      "image": "/images/menu/items/coffee.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 122,
      "name": "Boost",
      "category": "Hot beverages",
      "outlet": "Chill N Chai",
      "info": "A warm, comforting, and nostalgic chocolate-malt milk beverage.",
      "isBestseller": false,
      "image": "/images/menu/items/boost.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 123,
      "name": "Horlicks",
      "category": "Hot beverages",
      "outlet": "Chill N Chai",
      "info": "A warm, soothing malt milk drink for a relaxing evening.",
      "isBestseller": false,
      "image": "/images/menu/items/horlicks.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 124,
      "name": "Green Tea",
      "category": "Hot beverages",
      "outlet": "Chill N Chai",
      "info": "A light, healthy, and antioxidant-rich herbal infusion served piping hot.",
      "isBestseller": false,
      "image": "/images/menu/items/green-tea.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 125,
      "name": "Lemon Tea",
      "category": "Hot beverages",
      "outlet": "Chill N Chai",
      "info": "A refreshing black tea infused with a zesty squeeze of lemon.",
      "isBestseller": false,
      "image": "/images/menu/items/lemon-tea.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 126,
      "name": "Black Coffee",
      "category": "Hot beverages",
      "outlet": "Chill N Chai",
      "info": "A bold, dark, and undiluted cup of pure black brewed coffee.",
      "isBestseller": false,
      "image": "/images/menu/items/black-coffee.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 127,
      "name": "Black Tea",
      "category": "Hot beverages",
      "outlet": "Chill N Chai",
      "info": "A simple, strong, and deeply colored classic cup of black tea.",
      "isBestseller": false,
      "image": "/images/menu/items/black-tea.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 128,
      "name": "Green Apple",
      "category": "Mojito",
      "outlet": "Chill N Chai",
      "info": "A crisp, tart, and wildly refreshing green apple flavored carbonated mocktail.",
      "isBestseller": false,
      "image": "/images/menu/items/green-apple-mojito.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 129,
      "name": "Blue Curacao",
      "category": "Mojito",
      "outlet": "Chill N Chai",
      "info": "A vibrant, citrusy, and deeply refreshing blue curacao chilled cooler.",
      "isBestseller": true,
      "image": "/images/menu/items/blue-curacao-mojito.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 130,
      "name": "Passion Fruit",
      "category": "Mojito",
      "outlet": "Chill N Chai",
      "info": "A tropical, tangy, and sweet passion fruit infused minty mocktail.",
      "isBestseller": true,
      "image": "/images/menu/items/passion-fruit-mojito.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 131,
      "name": "Blueberry",
      "category": "Mojito",
      "outlet": "Chill N Chai",
      "info": "A deliciously sweet, purple-hued mocktail packed with muddled blueberries.",
      "isBestseller": false,
      "image": "/images/menu/items/blueberry-mojito.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 132,
      "name": "Strawberry",
      "category": "Mojito",
      "outlet": "Chill N Chai",
      "info": "A sweet, fruity, and vibrantly red strawberry and mint carbonated drink.",
      "isBestseller": false,
      "image": "/images/menu/items/strawberry-mojito.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 133,
      "name": "Pink Panther",
      "category": "Mocktails",
      "outlet": "Chill N Chai",
      "info": "A visually stunning, sweet, and creamy fruit-based signature mocktail.",
      "isBestseller": false,
      "image": "/images/menu/items/pink-panther-mocktail.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 134,
      "name": "Golden Taste",
      "category": "Mocktails",
      "outlet": "Chill N Chai",
      "info": "A citrus-heavy, zesty, and uniquely refreshing golden mocktail blend.",
      "isBestseller": false,
      "image": "/images/menu/items/golden-taste-mocktail.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 135,
      "name": "Golden Face",
      "category": "Mocktails",
      "outlet": "Chill N Chai",
      "info": "An exotic, tropical fruit mix designed to perfectly cool you down.",
      "isBestseller": false,
      "image": "/images/menu/items/golden-face-mocktail.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 136,
      "name": "Fresh Lime",
      "category": "Limes",
      "outlet": "Chill N Chai",
      "info": "The absolute classic. A simple, cold, and zesty fresh lime soda.",
      "isBestseller": true,
      "image": "/images/menu/items/fresh-lime.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 137,
      "name": "Mint Lime",
      "category": "Limes",
      "outlet": "Chill N Chai",
      "info": "A deeply refreshing lime cooler packed with freshly muddled mint leaves.",
      "isBestseller": true,
      "image": "/images/menu/items/mint-lime.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 138,
      "name": "Ginger Lime",
      "category": "Limes",
      "outlet": "Chill N Chai",
      "info": "A sharp, tangy lime juice finished with a zesty kick of ginger.",
      "isBestseller": false,
      "image": "/images/menu/items/ginger-lime.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 139,
      "name": "Grape Lime",
      "category": "Limes",
      "outlet": "Chill N Chai",
      "info": "A delightful fusion of tart lime and sweet dark grape extracts.",
      "isBestseller": false,
      "image": "/images/menu/items/grape-lime.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 140,
      "name": "Pineapple Lime",
      "category": "Limes",
      "outlet": "Chill N Chai",
      "info": "A tropical twist on the classic lime soda using fresh pineapple.",
      "isBestseller": false,
      "image": "/images/menu/items/pineapple-lime.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 141,
      "name": "Dark Lime",
      "category": "Limes",
      "outlet": "Chill N Chai",
      "info": "An intensely flavored, uniquely colored lime variation to quench your thirst.",
      "isBestseller": false,
      "image": "/images/menu/items/dark-lime.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 142,
      "name": "Magic Lime",
      "category": "Limes",
      "outlet": "Chill N Chai",
      "info": "A visually striking, secret-recipe lime drink that changes its color.",
      "isBestseller": false,
      "image": "/images/menu/items/magic-lime.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 143,
      "name": "Orange Lime",
      "category": "Limes",
      "outlet": "Chill N Chai",
      "info": "A double-citrus punch featuring fresh orange and tangy lime together.",
      "isBestseller": false,
      "image": "/images/menu/items/orange-lime.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 144,
      "name": "Fruit Salad",
      "category": "Fruit salads",
      "outlet": "Chill N Chai",
      "info": "A healthy, vibrant bowl packed with perfectly diced fresh seasonal fruits.",
      "isBestseller": false,
      "image": "/images/menu/items/fruit-salad.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
      "id": 145,
      "name": "Fruit Salad with Ice Cream",
      "category": "Fruit salads",
      "outlet": "Chill N Chai",
      "info": "Diced seasonal fruits topped with a generous scoop of rich vanilla ice cream.",
      "isBestseller": true,
      "image": "/images/menu/items/fruit-salad-with-ice-cream.jpg",
      "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
    },
    {
    "id": 146,
    "name": "Ginger Tea",
    "category": "Hot beverages",
    "outlet": "Chill N Chai",
    "info": "Warm, soothing milk tea infused with crushed fresh ginger to invigorate your senses.",
    "isBestseller": false,
    "image": "/images/menu/items/ginger-tea.jpg",
    "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
  },
  {
    "id": 147,
    "name": "Mint Tea",
    "category": "Hot beverages",
    "outlet": "Chill N Chai",
    "info": "A revitalizing, aromatic brew steeped with fresh garden mint leaves and light spices.",
    "isBestseller": false,
    "image": "/images/menu/items/mint-tea.jpg",
    "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
  },
  {
    "id": 148,
    "name": "Mint Tea",
    "category": "Hot beverages",
    "outlet": "Chill N Chai",
    "info": "A revitalizing, aromatic brew steeped with fresh garden mint leaves and light spices.",
    "isBestseller": false,
    "image": "/images/menu/items/mint-tea.jpg",
    "specializations": [{ "name": "Regular", "price": "Seasonal", "isVeg": true }]
  },
  {
    "id": 149,
    "name": "Mini Meals",
    "category": "Rice & Biriyani",
    "outlet": "Multi Cuisine Restaurant",
    "info": "A quick, satisfying portion of rice paired with essential traditional homestyle curries.",
    "isBestseller": false,
    "image": "/images/menu/items/mini-meals.jpg",
    "specializations": [{ "name": "Regular", "price": 60, "isVeg": true }]
  }
]);