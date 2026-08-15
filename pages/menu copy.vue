<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import 'swiper/css';

// Import only the necessary icon for the collapsed nav dropdown
import { PhCaretDown } from '@phosphor-icons/vue';

// Register GSAP plugins
gsap.registerPlugin(ScrollToPlugin);

// --- 1. DATA: SINGLE SOURCE OF TRUTH ---
const menuData = ref([
    {"id":1,"name":"Puttu Kadala","category":"Breakfast","info":"Steamed rice cake, black chickpea curry.","isBestseller":true,"specializations":[{"name":"","price":110,"isVeg":true}]},
    {"id":2,"name":"Noolputtu","category":"Breads","info":"String hoppers made from rice flour.","isBestseller":false,"specializations":[{"name":"","price":15,"isVeg":true}]},
    {"id":3,"name":"Pathiri","category":"Breads","info":"Thin rice flour pancake.","isBestseller":false,"specializations":[{"name":"","price":12,"isVeg":true}]},
    {"id":4,"name":"Appam","category":"Breads","info":"Lacy rice pancake with a soft center.","isBestseller":false,"specializations":[{"name":"","price":15,"isVeg":true}]},
    {"id":5,"name":"Poori Masala","category":"Breakfast","info":"Fried bread with potato curry.","isBestseller":false,"specializations":[{"name":"","price":90,"isVeg":true}]},
    {"id":6,"name":"Thattu Dosa Set","category":"Breakfast","info":"Set of small, thick dosas.","isBestseller":false,"specializations":[{"name":"","price":70,"isVeg":true}]},
    {"id":7,"name":"Plain Roast","category":"Breakfast","info":"Crispy, thin rice and lentil crepe.","isBestseller":false,"specializations":[{"name":"","price":80,"isVeg":true}]},
    {"id":8,"name":"Ghee Roast","category":"Breakfast","info":"Plain roast cooked with clarified butter.","isBestseller":true,"specializations":[{"name":"","price":90,"isVeg":true}]},
    {"id":9,"name":"Masala Dosa","category":"Breakfast","info":"Roast filled with spiced potatoes.","isBestseller":true,"specializations":[{"name":"","price":90,"isVeg":true}]},
    {"id":10,"name":"Plain Oothappam","category":"Breakfast","info":"Thick rice pancake.","isBestseller":false,"specializations":[{"name":"","price":60,"isVeg":true}]},
    {"id":11,"name":"Special Oothappam","category":"Breakfast","info":"Topped with onion, tomato, carrot.","isBestseller":false,"specializations":[{"name":"","price":80,"isVeg":true}]},
    {"id":12,"name":"Iddly Set","category":"Breakfast","info":"Steamed rice and lentil cakes.","isBestseller":false,"specializations":[{"name":"","price":60,"isVeg":true}]},
    {"id":13,"name":"Manchow Soup","category":"Soups","info":"Spicy and sour soup with fried noodles.","isBestseller":false,"specializations":[{"name":"Veg","price":140,"isVeg":true},{"name":"Chicken","price":160,"isVeg":false}]},
    {"id":14,"name":"Lemon Coriander Soup","category":"Soups","info":"Clear soup with lemon and coriander.","isBestseller":false,"specializations":[{"name":"Veg","price":140,"isVeg":true},{"name":"Chicken","price":160,"isVeg":false}]},
    {"id":15,"name":"East Chinese Noodle Soup","category":"Soups","info":"A hearty noodle soup.","isBestseller":false,"specializations":[{"name":"Veg","price":140,"isVeg":true},{"name":"Chicken","price":160,"isVeg":false}]},
    {"id":16,"name":"All Time Favorite Asian Soup","category":"Soups","info":"Sweet Corn, Hot & Sour, or Clear.","isBestseller":false,"specializations":[{"name":"Veg","price":140,"isVeg":true},{"name":"Chicken","price":160,"isVeg":false}]},
    {"id":17,"name":"Choice Of Cream Soup","category":"Soups","info":"Tomato, Mushroom, or Chicken.","isBestseller":false,"specializations":[{"name":"Veg","price":140,"isVeg":true},{"name":"Chicken","price":160,"isVeg":false}]},
    {"id":18,"name":"Dragon Chicken","category":"Starters","info":"Spicy fried chicken starter.","isBestseller":true,"specializations":[{"name":"","price":280,"isVeg":false}]},
    {"id":19,"name":"Chicken Lollipop","category":"Starters","info":"Frenched chicken winglet.","isBestseller":false,"specializations":[{"name":"","price":250,"isVeg":false}]},
    {"id":20,"name":"Peri Peri Chicken Pops","category":"Starters","info":"Spicy bite-sized chicken pops.","isBestseller":false,"specializations":[{"name":"","price":260,"isVeg":false}]},
    {"id":21,"name":"Honey Glazed Chicken","category":"Starters","info":"Sweet and savory glazed chicken.","isBestseller":false,"specializations":[{"name":"","price":290,"isVeg":false}]},
    {"id":22,"name":"Tawa Fried Prawns","category":"Starters","info":"Prawns pan-fried on a griddle.","isBestseller":true,"specializations":[{"name":"","price":320,"isVeg":false}]},
    {"id":23,"name":"Hot Crispy Garlic Potato","category":"Starters","info":"Crispy potatoes in a garlic sauce.","isBestseller":false,"specializations":[{"name":"","price":180,"isVeg":true}]},
    {"id":24,"name":"Mushroom Pepper Ularthu","category":"Starters","info":"Mushroom roast with black pepper.","isBestseller":false,"specializations":[{"name":"","price":200,"isVeg":true}]},
    {"id":25,"name":"Momos","category":"Starters","info":"Fried or Steamed dumplings.","isBestseller":false,"specializations":[{"name":"Veg","price":200,"isVeg":true},{"name":"Chicken","price":220,"isVeg":false}]},
    {"id":26,"name":"Veg Meals","category":"Rice & Biryani","info":"Traditional Kerala vegetarian thali.","isBestseller":false,"specializations":[{"name":"","price":140,"isVeg":true}]},
    {"id":27,"name":"Fish Curry Meals","category":"Rice & Biryani","info":"Kerala meals with fish curry.","isBestseller":true,"specializations":[{"name":"","price":160,"isVeg":false}]},
    {"id":28,"name":"CAPS Dhum Chicken Biriyani","category":"Rice & Biryani","info":"Our special slow-cooked biryani.","isBestseller":true,"specializations":[{"name":"","price":175,"isVeg":false}]},
    {"id":29,"name":"Beef Biriyani","category":"Rice & Biryani","info":"Flavorful beef biryani.","isBestseller":false,"specializations":[{"name":"","price":200,"isVeg":false}]},
    {"id":30,"name":"Mutton Biriyani","category":"Rice & Biryani","info":"Rich and aromatic mutton biryani.","isBestseller":false,"specializations":[{"name":"","price":340,"isVeg":false}]},
    {"id":31,"name":"Ghee Rice","category":"Rice & Biryani","info":"Rice cooked with clarified butter.","isBestseller":false,"specializations":[{"name":"","price":120,"isVeg":true}]},
    {"id":32,"name":"Veg Fried Rice","category":"Rice & Biryani","info":"Wok-tossed fried rice with vegetables.","isBestseller":false,"specializations":[{"name":"","price":140,"isVeg":true}]},
    {"id":33,"name":"Egg Fried Rice","category":"Rice & Biryani","info":"Wok-tossed fried rice with egg.","isBestseller":false,"specializations":[{"name":"","price":150,"isVeg":false}]},
    {"id":57,"name":"Paneer Fried Rice","category":"Rice & Biryani","info":"Wok-tossed fried rice with vegetables and paneer.","isBestseller":false,"specializations":[{"name":"","price":160,"isVeg":true}]},
    {"id":34,"name":"Chicken Fried Rice","category":"Rice & Biryani","info":"Classic chicken fried rice.","isBestseller":false,"specializations":[{"name":"","price":170,"isVeg":false}]},
    {"id":35,"name":"Mixed Fried Rice","category":"Rice & Biryani","info":"Fried rice with chicken, egg, and shrimp.","isBestseller":false,"specializations":[{"name":"","price":200,"isVeg":false}]},
    {"id":36,"name":"Szechwan Veg Fried Rice","category":"Rice & Biryani","info":"Spicy Szechwan-style fried rice.","isBestseller":false,"specializations":[{"name":"","price":150,"isVeg":true}]},
    {"id":37,"name":"Szechwan Egg Fried Rice","category":"Rice & Biryani","info":"Spicy Szechwan-style fried rice with egg.","isBestseller":false,"specializations":[{"name":"","price":160,"isVeg":false}]},
    {"id":38,"name":"Szechwan Chicken Fried Rice","category":"Rice & Biryani","info":"Spicy Szechwan-style fried rice with chicken.","isBestseller":false,"specializations":[{"name":"","price":180,"isVeg":false}]},
    {"id":39,"name":"Szechwan Mixed Fried Rice","category":"Rice & Biryani","info":"Spicy Szechwan-style fried rice with mixed meats.","isBestseller":false,"specializations":[{"name":"","price":210,"isVeg":false}]},
    {"id":40,"name":"Alfaham Mandi","category":"Rice & Biryani","info":"Grilled chicken with flavored rice.","isBestseller":false,"specializations":[{"name":"Full","price":760,"isVeg":false},{"name":"Half","price":420,"isVeg":false},{"name":"Quarter","price":210,"isVeg":false}]},
    {"id":41,"name":"Shawaya Mandi","category":"Rice & Biryani","info":"Roasted chicken with flavored rice.","isBestseller":false,"specializations":[{"name":"Full","price":760,"isVeg":false},{"name":"Half","price":420,"isVeg":false},{"name":"Quarter","price":210,"isVeg":false}]},
    {"id":42,"name":"Meen Mulakitathu","category":"Seafood","info":"Spicy fish curry.","isBestseller":false,"specializations":[{"name":"As per size","price":0,"isVeg":false}]},
    {"id":43,"name":"Fish Mango Curry","category":"Seafood","info":"Fish curry with raw mango.","isBestseller":false,"specializations":[{"name":"As per size","price":0,"isVeg":false}]},
    {"id":100,"name":"Crab Varuthu Vattichathu","category":"Seafood","info":"Crab roast.","isBestseller":false,"specializations":[{"name":"As per size","price":0,"isVeg":false}]},
    {"id":101,"name":"Fish Tawa Fry","category":"Seafood","info":"Pan-fried fish.","isBestseller":false,"specializations":[{"name":"As per size","price":0,"isVeg":false}]},
    {"id":102,"name":"Fish Malabari Fry","category":"Seafood","info":"Malabar style fried fish.","isBestseller":false,"specializations":[{"name":"As per size","price":0,"isVeg":false}]},
    {"id":103,"name":"Chemmeenum Koonthalum Ularthiyathu","category":"Seafood","info":"Prawn and squid roast.","isBestseller":false,"specializations":[{"name":"As per size","price":0,"isVeg":false}]},
    {"id":104,"name":"Podimeen Fry","category":"Seafood","info":"Small fish fry.","isBestseller":false,"specializations":[{"name":"As per size","price":0,"isVeg":false}]},
    {"id":105,"name":"Koonthal Varattiyathu","category":"Seafood","info":"Squid roast.","isBestseller":false,"specializations":[{"name":"As per size","price":0,"isVeg":false}]},
    {"id":106,"name":"Koonthal Coconut Dry Fry","category":"Seafood","info":"Squid fry with coconut.","isBestseller":false,"specializations":[{"name":"As per size","price":0,"isVeg":false}]},
    {"id":44,"name":"Alfaham Chicken","category":"Grills & Fries","info":"Charcoal-grilled Arabian chicken.","isBestseller":true,"specializations":[{"name":"Full","price":600,"isVeg":false},{"name":"Half","price":320,"isVeg":false},{"name":"Quarter","price":160,"isVeg":false}]},
    {"id":45,"name":"Special Alfaham","category":"Grills & Fries","info":"Peri Peri, Orange, Pepper, or BBQ.","isBestseller":true,"specializations":[{"name":"Full","price":620,"isVeg":false},{"name":"Half","price":340,"isVeg":false},{"name":"Quarter","price":170,"isVeg":false}]},
    {"id":46,"name":"Fried Chicken","category":"Grills & Fries","info":"Classic crispy fried chicken.","isBestseller":false,"specializations":[{"name":"Full","price":620,"isVeg":false},{"name":"Half","price":340,"isVeg":false},{"name":"Quarter","price":170,"isVeg":false}]},
    {"id":47,"name":"Shawaya Chicken","category":"Grills & Fries","info":"Roasted Arabian chicken.","isBestseller":false,"specializations":[{"name":"Full","price":600,"isVeg":false},{"name":"Half","price":320,"isVeg":false},{"name":"Quarter","price":160,"isVeg":false}]},
    {"id":48,"name":"Masala Shawaya","category":"Grills & Fries","info":"Spiced roasted chicken.","isBestseller":false,"specializations":[{"name":"Full","price":620,"isVeg":false},{"name":"Half","price":340,"isVeg":false},{"name":"Quarter","price":170,"isVeg":false}]},
    {"id":49,"name":"Veg Noodles","category":"Noodles","info":"Stir-fried noodles with vegetables.","isBestseller":false,"specializations":[{"name":"","price":140,"isVeg":true}]},
    {"id":50,"name":"Egg Noodles","category":"Noodles","info":"Stir-fried noodles with egg.","isBestseller":false,"specializations":[{"name":"","price":150,"isVeg":false}]},
    {"id":51,"name":"Chicken Noodles","category":"Noodles","info":"Stir-fried noodles with chicken.","isBestseller":false,"specializations":[{"name":"","price":170,"isVeg":false}]},
    {"id":52,"name":"Mixed Noodles","category":"Noodles","info":"Noodles with chicken, egg, and shrimp.","isBestseller":false,"specializations":[{"name":"","price":200,"isVeg":false}]},
    {"id":53,"name":"Szechwan Veg Noodles","category":"Noodles","info":"Spicy Szechwan noodles with vegetables.","isBestseller":false,"specializations":[{"name":"","price":150,"isVeg":true}]},
    {"id":54,"name":"Szechwan Egg Noodles","category":"Noodles","info":"Spicy Szechwan noodles with egg.","isBestseller":false,"specializations":[{"name":"","price":160,"isVeg":false}]},
    {"id":55,"name":"Szechwan Chicken Noodles","category":"Noodles","info":"Spicy Szechwan noodles with chicken.","isBestseller":false,"specializations":[{"name":"","price":180,"isVeg":false}]},
    {"id":56,"name":"Szechwan Mixed Noodles","category":"Noodles","info":"Spicy Szechwan noodles with mixed meats.","isBestseller":false,"specializations":[{"name":"","price":210,"isVeg":false}]},
    {"id":58,"name":"Mushroom Noodles","category":"Noodles","info":"Stir-fried noodles with mushrooms.","isBestseller":false,"specializations":[{"name":"","price":150,"isVeg":true}]},
    {"id":59,"name":"Paal Kappa Beef Varattu","category":"Traditional Highlights","info":"Tapioca and beef roast.","isBestseller":true,"specializations":[{"name":"","price":220,"isVeg":false}]},
    {"id":60,"name":"Pothi Porotta Chicken","category":"Traditional Highlights","info":"Layered bread with chicken, wrapped.","isBestseller":false,"specializations":[{"name":"","price":150,"isVeg":false}]},
    {"id":61,"name":"Kothu Porotta Beef","category":"Traditional Highlights","info":"Minced bread with beef.","isBestseller":false,"specializations":[{"name":"","price":150,"isVeg":false}]},
    {"id":62,"name":"Kappa Beef Kuzhachathu","category":"Traditional Highlights","info":"Mashed tapioca with beef curry.","isBestseller":false,"specializations":[{"name":"","price":200,"isVeg":false}]},
    {"id":63,"name":"Pothichoru","category":"Traditional Highlights","info":"Meal wrapped in a banana leaf.","isBestseller":false,"specializations":[{"name":"Veg","price":130,"isVeg":true},{"name":"Non Veg","price":150,"isVeg":false}]},
    {"id":64,"name":"Kerala Porotta","category":"Breads","info":"Layered flatbread.","isBestseller":true,"specializations":[{"name":"","price":17,"isVeg":true}]},
    {"id":65,"name":"Wheat Porotta","category":"Breads","info":"Whole wheat flatbread.","isBestseller":false,"specializations":[{"name":"","price":25,"isVeg":true}]},
    {"id":66,"name":"Chappathi","category":"Breads","info":"Thin whole wheat bread.","isBestseller":false,"specializations":[{"name":"","price":20,"isVeg":true}]},
    {"id":67,"name":"Phulka","category":"Breads","info":"Puffed whole wheat bread.","isBestseller":false,"specializations":[{"name":"","price":15,"isVeg":true}]},
    {"id":107,"name":"Nice Pathiri","category":"Breads","info":"Very thin rice pancake.","isBestseller":false,"specializations":[{"name":"","price":12,"isVeg":true}]},
    {"id":68,"name":"Paneer Butter Masala","category":"Farms & Flames","info":"Creamy paneer curry.","isBestseller":true,"specializations":[{"name":"","price":210,"isVeg":true}]},
    {"id":69,"name":"Kadai Vegetable","category":"Farms & Flames","info":"Mixed vegetables in a wok.","isBestseller":false,"specializations":[{"name":"","price":210,"isVeg":true}]},
    {"id":70,"name":"Matar Paneer Masala","category":"Farms & Flames","info":"Peas and paneer in a tomato gravy.","isBestseller":false,"specializations":[{"name":"","price":210,"isVeg":true}]},
    {"id":71,"name":"Mix Veg. Khuruma","category":"Farms & Flames","info":"Mixed vegetables in a coconut gravy.","isBestseller":false,"specializations":[{"name":"","price":140,"isVeg":true}]},
    {"id":72,"name":"Mushroom Masala","category":"Farms & Flames","info":"Mushroom in a spicy gravy.","isBestseller":false,"specializations":[{"name":"","price":190,"isVeg":true}]},
    {"id":73,"name":"Mushroom Paneer Varattiyathu","category":"Farms & Flames","info":"Mushroom and paneer roast.","isBestseller":false,"specializations":[{"name":"","price":210,"isVeg":true}]},
    {"id":74,"name":"Green Peas Masala","category":"Farms & Flames","info":"Green peas in a spicy gravy.","isBestseller":false,"specializations":[{"name":"","price":140,"isVeg":true}]},
    {"id":75,"name":"Chinese Side Dishes (Dry / Gravy)","category":"Farms & Flames","info":"Chilli, Manchurian, Garlic, or Ginger style.","isBestseller":false,"specializations":[{"name":"Mushroom","price":190,"isVeg":true},{"name":"Paneer","price":210,"isVeg":true},{"name":"Gobi","price":190,"isVeg":true}]},
    {"id":76,"name":"Chicken Kondattam","category":"Chicken","info":"Spicy dry fried chicken.","isBestseller":false,"specializations":[{"name":"","price":260,"isVeg":false}]},
    {"id":77,"name":"Malabari Kozhi Roast","category":"Chicken","info":"Malabar style chicken roast.","isBestseller":false,"specializations":[{"name":"","price":250,"isVeg":false}]},
    {"id":78,"name":"Varutharacha Kozhi Curry","category":"Chicken","info":"Chicken curry with roasted coconut gravy.","isBestseller":false,"specializations":[{"name":"","price":240,"isVeg":false}]},
    {"id":79,"name":"Chettinad Pepper Chicken Masala","category":"Chicken","info":"Spicy Chettinad style chicken.","isBestseller":false,"specializations":[{"name":"","price":260,"isVeg":false}]},
    {"id":80,"name":"Kanjirapally Kozhi Curry","category":"Chicken","info":"A special chicken curry.","isBestseller":false,"specializations":[{"name":"","price":260,"isVeg":false}]},
    {"id":81,"name":"Butter Chicken Masala","category":"Chicken","info":"Creamy tomato-based chicken curry.","isBestseller":true,"specializations":[{"name":"","price":275,"isVeg":false}]},
    {"id":82,"name":"Kadai Chicken","category":"Chicken","info":"Chicken cooked in a wok.","isBestseller":false,"specializations":[{"name":"","price":275,"isVeg":false}]},
    {"id":83,"name":"Chicken Kolhapuri","category":"Chicken","info":"Spicy Kolhapuri style chicken.","isBestseller":false,"specializations":[{"name":"","price":280,"isVeg":false}]},
    {"id":84,"name":"Murgh Do Pyaza","category":"Chicken","info":"Chicken curry with onions.","isBestseller":false,"specializations":[{"name":"","price":280,"isVeg":false}]},
    {"id":85,"name":"Kozhi Malli Peralan","category":"Chicken","info":"Coriander based chicken dish.","isBestseller":false,"specializations":[{"name":"","price":260,"isVeg":false}]},
    {"id":86,"name":"Chicken 65","category":"Chicken","info":"Spicy deep-fried chicken.","isBestseller":false,"specializations":[{"name":"","price":200,"isVeg":false}]},
    {"id":128,"name":"Chinese Side Dishes (Chicken)","category":"Chicken","info":"Chilli, Manchurian, Ginger, or Garlic style.","isBestseller":false,"specializations":[{"name":"","price":260,"isVeg":false}]},
    {"id":87,"name":"Beef Coconut Ularthu","category":"Beef","info":"Beef roast with coconut pieces.","isBestseller":true,"specializations":[{"name":"","price":220,"isVeg":false}]},
    {"id":88,"name":"Achayan's Beef Curry","category":"Beef","info":"A traditional style beef curry.","isBestseller":false,"specializations":[{"name":"","price":230,"isVeg":false}]},
    {"id":89,"name":"Wayanadan Beef Fry","category":"Beef","info":"Wayanad style beef fry.","isBestseller":false,"specializations":[{"name":"","price":230,"isVeg":false}]},
    {"id":90,"name":"High Range Beef Roast","category":"Beef","info":"Spicy beef roast from the high ranges.","isBestseller":false,"specializations":[{"name":"","price":230,"isVeg":false}]},
    {"id":91,"name":"Beef Idmulaku Fry","category":"Beef","info":"Spicy beef fry.","isBestseller":false,"specializations":[{"name":"","price":220,"isVeg":false}]},
    {"id":92,"name":"Mutton Varutharachathu","category":"Mutton","info":"Mutton with roasted coconut gravy.","isBestseller":false,"specializations":[{"name":"","price":360,"isVeg":false}]},
    {"id":93,"name":"Mutton Pepper Fry","category":"Mutton","info":"Spicy mutton pepper fry.","isBestseller":false,"specializations":[{"name":"","price":360,"isVeg":false}]},
    {"id":94,"name":"Mutton Roganjosh","category":"Mutton","info":"Aromatic mutton curry.","isBestseller":false,"specializations":[{"name":"","price":360,"isVeg":false}]},
    {"id":95,"name":"Chettinad Mutton Curry","category":"Mutton","info":"Spicy Chettinad style mutton.","isBestseller":false,"specializations":[{"name":"","price":360,"isVeg":false}]},
    {"id":96,"name":"Tharavu Mappas","category":"Duck","info":"Duck curry in a creamy coconut gravy.","isBestseller":false,"specializations":[{"name":"","price":390,"isVeg":false}]},
    {"id":97,"name":"Tharavu Kurumulaku Varattiyathu","category":"Duck","info":"Duck pepper roast.","isBestseller":false,"specializations":[{"name":"","price":390,"isVeg":false}]},
    {"id":98,"name":"Kerala Duck Curry","category":"Duck","info":"Traditional Kerala style duck curry.","isBestseller":false,"specializations":[{"name":"","price":390,"isVeg":false}]},
    {"id":99,"name":"Thattukada Duck Roast","category":"Duck","info":"Street style duck roast.","isBestseller":false,"specializations":[{"name":"","price":390,"isVeg":false}]},
    {"id":108,"name":"Mix Berry Cooler","category":"Mocktails","info":"Refreshing mixed berry drink.","isBestseller":false,"specializations":[{"name":"","price":100,"isVeg":true}]},
    {"id":109,"name":"Cindrella","category":"Mocktails","info":"A magical mocktail.","isBestseller":false,"specializations":[{"name":"","price":100,"isVeg":true}]},
    {"id":110,"name":"Melon Berry","category":"Mocktails","info":"Watermelon and berry fusion.","isBestseller":false,"specializations":[{"name":"","price":100,"isVeg":true}]},
    {"id":111,"name":"Asian Ginger Fizz","category":"Mocktails","info":"A zesty ginger drink.","isBestseller":false,"specializations":[{"name":"","price":100,"isVeg":true}]},
    {"id":112,"name":"Blue Lagoon","category":"Mocktails","info":"A classic blue mocktail.","isBestseller":false,"specializations":[{"name":"","price":100,"isVeg":true}]},
    {"id":113,"name":"Choice of Mojito","category":"Mocktails","info":"Virgin (Plain), Passion Fruit, Green Apple, Strawberry, etc.","isBestseller":false,"specializations":[{"name":"","price":100,"isVeg":true}]},
    {"id":114,"name":"Cookie & Cream","category":"Shakes & Juices","info":"A classic cookie shake.","isBestseller":false,"specializations":[{"name":"","price":130,"isVeg":true}]},
    {"id":115,"name":"Cotton Candy Magic","category":"Shakes & Juices","info":"A sweet and magical shake.","isBestseller":false,"specializations":[{"name":"","price":130,"isVeg":true}]},
    {"id":116,"name":"Seasonal Specialities","category":"Shakes & Juices","info":"Apple, Mango, Papaya, Chikku, Guava, etc.","isBestseller":false,"specializations":[{"name":"","price":100,"isVeg":true}]},
    {"id":117,"name":"Ice Cream Shakes","category":"Shakes & Juices","info":"Vanilla, Butter Scotch, Chocolate, Mango, Berry, etc.","isBestseller":false,"specializations":[{"name":"","price":100,"isVeg":true}]},
    {"id":118,"name":"Seasonal Fruit Juices","category":"Shakes & Juices","info":"Pineapple, Mango, Orange, Watermelon, Grape.","isBestseller":false,"specializations":[{"name":"","price":90,"isVeg":true}]},
    {"id":119,"name":"Tea","category":"Hot Beverages","info":"A classic cup of tea.","isBestseller":false,"specializations":[{"name":"","price":15,"isVeg":true}]},
    {"id":120,"name":"Coffee","category":"Hot Beverages","info":"A strong cup of coffee.","isBestseller":false,"specializations":[{"name":"","price":22,"isVeg":true}]},
    {"id":121,"name":"Lemon Tea","category":"Hot Beverages","info":"A refreshing lemon tea.","isBestseller":false,"specializations":[{"name":"","price":12,"isVeg":true}]},
    {"id":122,"name":"Health Drink","category":"Hot Beverages","info":"Boost or Horlicks.","isBestseller":false,"specializations":[{"name":"","price":30,"isVeg":true}]},
    {"id":123,"name":"Falooda","category":"Specialities","info":"Rich dessert with vermicelli, ice cream, and nuts.","isBestseller":true,"specializations":[{"name":"","price":120,"isVeg":true}]},
    {"id":124,"name":"Fruit Salad","category":"Specialities","info":"A mix of fresh fruits.","isBestseller":false,"specializations":[{"name":"","price":80,"isVeg":true}]},
    {"id":125,"name":"Gulab Jamun","category":"Specialities","info":"Sweet milk-solid balls in syrup.","isBestseller":false,"specializations":[{"name":"","price":50,"isVeg":true}]},
    {"id":126,"name":"Elaneer Payasam","category":"Specialities","info":"Tender coconut pudding.","isBestseller":false,"specializations":[{"name":"","price":90,"isVeg":true}]},
    {"id":127,"name":"Ice Cream Scoop","category":"Specialities","info":"Vanilla, Butter Scotch, Strawberry, Pista, Mango.","isBestseller":false,"specializations":[{"name":"","price":40,"isVeg":true}]},
    {"id":129,"name":"Mint Porotta","category":"Breads","info":"Porotta with a touch of mint.","isBestseller":false,"specializations":[{"name":"","price":25,"isVeg":true}]}
]);

// --- STATE MANAGEMENT ---
const isVegOnly = ref(false);
const activeCategory = ref(null);
const isCollapsedNavOpen = ref(false);
const isSticky = ref(false);

// --- COMPUTED PROPERTIES ---
const filteredMenu = computed(() => {
    if (!isVegOnly.value) return menuData.value;
    return menuData.value.map(item => ({
        ...item,
        specializations: item.specializations.filter(spec => spec.isVeg)
    })).filter(item => item.specializations.length > 0);
});

const filteredCategories = computed(() => {
    const categories = [...new Set(filteredMenu.value.map(item => item.category))];
    if (categories.length > 0 && !activeCategory.value) {
      activeCategory.value = categories[0];
    }
    return categories;
});

const bestsellers = computed(() => {
    return menuData.value.filter(item => item.isBestseller);
});

// --- CONFIGURATION OBJECTS ---
const categoryConfig = {
  "Breakfast": { color: "yellow" }, "Soups": { color: "green" },
  "Starters": { color: "orange" }, "Rice & Biryani": { color: "amber" },
  "Seafood": { color: "blue" }, "Grills & Fries": { color: "crimson" },
  "Noodles": { color: "rose" }, "Traditional Highlights": { color: "lime" },
  "Breads": { color: "cyan" }, "Farms & Flames": { color: "emerald" },
  "Chicken": { color: "red"}, "Beef": { color: "red"},
  "Mutton": { color: "red"}, "Duck": { color: "red"},
  "Mocktails": { color: "blue"}, "Shakes & Juices": { color: "orange"},
  "Hot Beverages": { color: "amber"}, "Specialities": { color: "yellow"},
  "Default": { color: "slate" }
};

const tailwindColors = {
  orange: {text:'text-orange-500',border:'border-orange-200',bgColor:'bg-orange-500',shadowColor:'rgb(251 146 60 / 0.4)',cardBg:'bg-orange-200'},
  yellow: {text:'text-yellow-500',border:'border-yellow-200',bgColor:'bg-yellow-500',shadowColor:'rgb(234 179 8 / 0.4)',cardBg:'bg-yellow-200'},
  blue: {text:'text-blue-500',border:'border-blue-200',bgColor:'bg-blue-500',shadowColor:'rgb(59 130 246 / 0.4)',cardBg:'bg-blue-200'},
  green: {text:'text-green-500',border:'border-green-200',bgColor:'bg-green-500',shadowColor:'rgb(34 197 94 / 0.4)',cardBg:'bg-green-200'},
  crimson: {text:'text-red-600',border:'border-red-200',bgColor:'bg-red-600',shadowColor:'rgb(220 38 38 / 0.4)',cardBg:'bg-red-200'},
  amber: {text:'text-amber-500',border:'border-amber-200',bgColor:'bg-amber-500',shadowColor:'rgb(245 158 11 / 0.4)',cardBg:'bg-amber-200'},
  rose: {text:'text-rose-500',border:'border-rose-200',bgColor:'bg-rose-500',shadowColor:'rgb(244 63 94 / 0.4)',cardBg:'bg-rose-200'},
  lime: {text:'text-lime-500',border:'border-lime-200',bgColor:'bg-lime-500',shadowColor:'rgb(132 204 22 / 0.4)',cardBg:'bg-lime-200'},
  cyan: {text:'text-cyan-500',border:'border-cyan-200',bgColor:'bg-cyan-500',shadowColor:'rgb(6 182 212 / 0.4)',cardBg:'bg-cyan-200'},
  emerald: {text:'text-emerald-500',border:'border-emerald-200',bgColor:'bg-emerald-500',shadowColor:'rgb(16 185 129 / 0.4)',cardBg:'bg-emerald-200'},
  red: {text:'text-red-500',border:'border-red-200',bgColor:'bg-red-500',shadowColor:'rgb(239 68 68 / 0.4)',cardBg:'bg-red-200'},
  slate: {text:'text-slate-500',border:'border-slate-200',bgColor:'bg-slate-500',shadowColor:'rgb(100 116 139 / 0.4)',cardBg:'bg-slate-200'}
};

const activeCategoryInfo = computed(() => {
  const category = activeCategory.value || 'Default';
  const config = categoryConfig[category] || categoryConfig.Default;
  return tailwindColors[config.color] || tailwindColors.slate;
});

const getCategoryStyles = (category) => {
  const config = categoryConfig[category] || categoryConfig.Default;
  return tailwindColors[config.color] || tailwindColors.slate;
};

const restaurantGalleryData = {
  eyebrow: "Our Delicacies",
  title: "Flavors That Speak for Us",
  themeTextClass: "text-[#03a661]",
  themeBgClass: "bg-[#03a661]",
  images: [
    { src: "/images/restaurant/food/1.jpg", alt: "CAPS Delicacy" },
    { src: "/images/restaurant/food/2.jpg", alt: "CAPS Delicacy" },
    { src: "/images/restaurant/food/3.jpg", alt: "CAPS Delicacy" },
    { src: "/images/restaurant/food/4.jpg", alt: "CAPS Delicacy" },
    { src: "/images/restaurant/food/5.jpg", alt: "CAPS Delicacy" },
    { src: "/images/restaurant/food/6.jpg", alt: "CAPS Delicacy" },
    { src: "/images/restaurant/food/7.jpg", alt: "CAPS Delicacy" },
    { src: "/images/restaurant/food/8.jpg", alt: "CAPS Delicacy" },
    { src: "/images/restaurant/food/9.jpg", alt: "CAPS Delicacy" },
    { src: "/images/restaurant/food/10.jpg", alt: "CAPS Delicacy" },
    { src: "/images/restaurant/food/11.jpg", alt: "CAPS Delicacy" },
    { src: "/images/restaurant/food/12.jpg", alt: "CAPS Delicacy" },
    { src: "/images/restaurant/food/13.jpg", alt: "CAPS Delicacy" },
    { src: "/images/restaurant/food/14.jpg", alt: "CAPS Delicacy" },
    { src: "/images/restaurant/food/15.jpg", alt: "CAPS Delicacy" },
    { src: "/images/restaurant/food/16.jpg", alt: "CAPS Delicacy" },
    { src: "/images/restaurant/food/17.jpg", alt: "CAPS Delicacy" },
    { src: "/images/restaurant/food/18.jpg", alt: "CAPS Delicacy" },
    { src: "/images/restaurant/food/19.jpg", alt: "CAPS Delicacy" },
    { src: "/images/restaurant/food/20.jpg", alt: "CAPS Delicacy" },
    { src: "/images/restaurant/food/21.jpg", alt: "CAPS Delicacy" },
    { src: "/images/restaurant/food/22.jpg", alt: "CAPS Delicacy" },
  ]
};

// --- REFS for DOM elements ---
const bestsellerSwiperEl = ref(null);

// --- METHODS ---
const handleScrollToCategory = (category) => {
  const safeId = category.replace(/[^a-zA-Z0-9]/g, '-');
  const navEl = document.getElementById('category-nav-container');
  const infoEl = document.getElementById('info-section');
  let navHeight = navEl ? navEl.offsetHeight : 0;
  
  const currentScrollPosition = window.scrollY || window.pageYOffset;
  const navTop = navEl.getBoundingClientRect().top + navEl.offsetHeight;

  if(currentScrollPosition < navTop + navHeight + 500) {
    gsap.to(window, {
      duration: 1, 
      scrollTo: { y: `#section-${safeId}`, offsetY: 400}, // Adjusted offset
      ease: 'power2.inOut'
    });
  } else {
    gsap.to(window, {
      duration: 1, 
      scrollTo: { y: `#section-${safeId}`, offsetY: 200 }, // Adjusted offset
      ease: 'power2.inOut'
    });
  }
  
  if (isSticky.value) {
    isCollapsedNavOpen.value = false;
  }
  
};

const getItemsForCategory = (category) => {
  return filteredMenu.value.filter(item => item.category === category);
};

// ---- CLICKED OUTSIDE ---
const accordionRef = ref(null);

const handleClickOutside = (event) => {
  // If the accordion exists and the click was NOT inside it, close it.
  if (accordionRef.value && !accordionRef.value.contains(event.target)) {
    isCollapsedNavOpen.value = false; // Replace with your state variable
  }
};

// Add and remove the listener to prevent memory leaks
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

// --- ACCORDION OVERFLOW ---
const expandedNavRef = ref(null);
const isNavOverflowing = ref(false);

watch(isCollapsedNavOpen, async (isOpen) => {
  if (isOpen) {
    // Wait for the DOM to update so the element is visible
    await nextTick(); 
    if (expandedNavRef.value) {
      const navTop = expandedNavRef.value.getBoundingClientRect().top;
      const availableHeight = window.innerHeight - navTop;
      
      // Check if the content is taller than the available space
      if (expandedNavRef.value.scrollHeight > availableHeight) {
        isNavOverflowing.value = true;
        document.body.style.overflow = 'hidden'; // Lock background scroll
      }
    }
  } else {
    // Reset everything when the menu closes
    isNavOverflowing.value = false;
    document.body.style.overflow = ''; 
  }
});

// --- LIFECYCLE HOOKS ---
let scrollTriggerObserver;
let categoryObservers = [];

onMounted(() => {

  window.scrollTo(0, 0); // Scrolls to the top (x: 0, y: 0)

  // Init Bestseller Swiper
  if (bestsellerSwiperEl.value) {
    new Swiper(bestsellerSwiperEl.value, {
      modules: [Autoplay],
      slidesPerView: 'auto',
      spaceBetween: 24,
      loop: true,
      delay: 0,
      speed: 3000,
      freeMode: true,
      autoplay: { delay: 0, disableOnInteraction: false },
    });
  }

  // Sticky Nav Logic
  const sentinel = document.querySelector('#sticky-sentinel');
  const sections = document.querySelectorAll('.menu-category-section');
  const navEl = document.getElementById('category-nav-container');

  if (sentinel) {
    const handleScroll = () => {
      const sentinelTop = sentinel.getBoundingClientRect().top;
      isSticky.value = sentinelTop <= 80; // 80px is 5rem (h-20 of header)
      if (!isSticky.value) {
        isCollapsedNavOpen.value = false;
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    onUnmounted(() => window.removeEventListener('scroll', handleScroll));
  }

  // Scroll Spy Logic
  nextTick(() => {
    const navHeight = document.getElementById('category-nav-container')?.offsetHeight || 100;
    const offset = 80 + navHeight; // Header height + nav height

    sections.forEach(section => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          activeCategory.value = entry.target.dataset.category;
        }
      }, { rootMargin: `-${offset}px 0px -${window.innerHeight - offset - 100}px 0px` });
      observer.observe(section);
      categoryObservers.push(observer);
    });
  });
});

onUnmounted(() => {
  if (scrollTriggerObserver) scrollTriggerObserver.disconnect();
  categoryObservers.forEach(observer => observer.disconnect());
});

// 1. Core Meta Values
const pageTitle = 'Interactive Restaurant Menu | Hotel CAPS, Koduvayur, Palakkad'
const pageDesc = 'Browse the Hotel CAPS restaurant menu online, featuring multi-cuisine favorites, bestsellers, our delicacies, snacks, beverages & more.'
const canonicalUrl = 'https://capsfamily.in/menu'
const ogImage = 'https://capsfamily.in/images/favicons/caps-menu-og-image.jpg'

// 2. Structured Link and JSON-LD Schema Injection
useHead({
  link: [
    { rel: 'canonical', href: canonicalUrl }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Menu",
        "name": pageTitle,
        "description": pageDesc,
        "url": canonicalUrl,
        "mainEntity": {
          "@type": "Restaurant",
          "name": "Hotel CAPS Multi-Cuisine Restaurant",
          "url": "https://capsfamily.in/restaurant",
          "telephone": [
            "+919207517064",
            "+918848369567"
          ],
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Main Road, Pittupeedika",
            "addressLocality": "Koduvayur",
            "addressRegion": "Kerala",
            "postalCode": "678501",
            "addressCountry": "IN"
          }
        }
      })
    }
  ]
})

// 3. Nuxt 4 SEO Composable (Search & Social Cards)
useSeoMeta({
  title: pageTitle,
  description: pageDesc,
  ogTitle: pageTitle,
  ogDescription: pageDesc,
  ogUrl: canonicalUrl,
  ogImage: ogImage,
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDesc,
  twitterImage: ogImage
})

</script>

<template>
  <div class="menu-page-wrapper">
    <div class="gradient-background"></div>
    <!-- The MenuHeader component is now defined inside this file -->
    <header id="menu-header" class="bg-gradient-to-t from-emerald-600 to-emerald-950 relative text-center border-b-8 border-white border-opacity-60 px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-16">
      <div class="relative z-10 flex flex-col items-center">
        <div class="font-display text-gray-900">
          <div class="my-8">
            <p class="font-decorative font-semibold text-3xl md:text-4xl text-red-300">Multi-Cuisine Restaurant</p>
          </div>
          <h2 class="font-sans text-4xl font-bold text-amber-500 md:text-5xl lg:text-6xl tracking-widest ">MENU</h2>
          <h3 class="text-2xl font-semibold text-violet-200 md:text-3xl lg:text-4xl tracking-widest pt-16">FAST HOME DELIVERY</h3>
        </div>
      </div>
    </header>

    <!-- The Bestsellers component is now defined inside this file -->
    <section id="bestsellers-section" class="py-8 lg:py-16 bg-gradient-to-b from-emerald-600 to-emerald-950 border-t-8 border-white border-opacity-60 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 class="font-display text-3xl font-semibold text-amber-300 tracking-wider text-center mb-12">Bestsellers</h3>
        <div ref="bestsellerSwiperEl" class="swiper bestseller-swiper">
          <div class="swiper-wrapper pb-4">
            <div v-for="item in bestsellers" :key="item.id" class="swiper-slide " style="width: 280px;">
              <div class="bg-white p-6 rounded-xl bg-gradient-to-r from-amber-200 to-yellow-500 shadow-lg text-center h-full border-b-4 border-amber-400">
                <div class="w-12 h-12 mx-auto mb-4"></div>
                <h4 class="font-sans font-bold text-lg">{{ item.name }}</h4>
                <div class="mt-2 space-y-1 text-sm text-left">
                  <div v-for="(spec, i) in item.specializations" :key="i" class="flex justify-between items-center">
                    <span class="text-gray-600 font-sans">{{ spec.name || 'Regular' }}</span>
                    <span class="font-number font-semibold text-gray-800">{{ spec.price > 0 ? `₹${spec.price}` : '' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Delicacies -->
    <PageGallery 
      :eyebrow="restaurantGalleryData.eyebrow"
      :title="restaurantGalleryData.title"
      :images="restaurantGalleryData.images"
      :themeTextClass="restaurantGalleryData.themeTextClass"
      :themeBgClass="restaurantGalleryData.themeBgClass"
    />

    <!-- The MenuInfo component is now defined inside this file -->
    <section id="info-section" class="p-10 bg-gradient-to-r from-rose-400 to-orange-400">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-8">
        <div class="text-center border-2 border-yellow-300 bg-yellow-50/50 rounded-2xl p-6 space-y-2">
          <div class="flex items-center justify-center space-x-2">
            <h4 class="text-xl font-bold text-yellow-800 font-sans">Food Allergy Notice</h4>
          </div>
          <p class="text-yellow-700 font-body">If you have a food allergy or special dietary requirement, please inform a member of staff.</p>
        </div>
        <p class="text-center text-gray-500 text-sm font-sans">GST extra applicable.</p>
      </div>
    </section>
    
    <div id="sticky-sentinel"></div>
    
    <!-- The MenuNav component is now defined inside this file -->
    <ClientOnly>
      <nav 
        id="category-nav-container" ref="accordionRef"
        class="sticky z-20 transition-all duration-300"
        :class="{ 'is-sticky': isSticky, 'top-[5rem]': isSticky }"
      >
        <div class="flex justify-center items-center pt-4 mb-2 space-x-4">
          <span class="font-sans font-semibold text-gray-700 transition-colors">{{ isVegOnly ? 'Pure Veg Only' : 'All Items' }}</span>
          <input type="checkbox" id="veg-toggle" class="hidden peer" :checked="isVegOnly" @change="isVegOnly = $event.target.checked">
          <label for="veg-toggle" class="relative w-14 h-8 bg-red-200 rounded-full cursor-pointer p-1 veg-toggle-label">
            <div class="w-6 h-6 bg-rose-800 rounded-full shadow-md transform transition-transform veg-toggle-dot"></div>
          </label>
        </div>
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            v-if="isSticky" 
            class="w-full flex justify-between items-center cursor-pointer p-3 rounded-lg shadow-md bg-slate-100"
            @click="isCollapsedNavOpen = !isCollapsedNavOpen"
          >
            <div class="flex items-center space-x-3">
              <div class="w-6 h-6 rounded-full" :class="activeCategoryInfo.bgColor"></div>
              <span class="font-sans font-bold">{{ activeCategory || 'Select Category' }}</span>
            </div>
            <PhCaretDown class="text-2xl transition-transform duration-300" :class="{ 'rotate-180': isCollapsedNavOpen }" />
          </div>

          <div 
            ref="expandedNavRef"
            class="flex flex-wrap overflow-x-hidden overflow-y-auto gap-3 justify-center py-4 transition-all duration-300"
            :class="{ 'hidden': isSticky && !isCollapsedNavOpen }"
            :style="isNavOverflowing ? { maxHeight: `calc(100vh - 6rem)` } : {}"
          >
            <template v-for="category in filteredCategories" :key="category">
              <button 
                @click="handleScrollToCategory(category)"
                class="flex items-center space-x-2 py-2 px-4 rounded-full font-sans font-bold"
                :class="[
                  category === activeCategory ? ` category-btn border: isHovered active text-white ${getCategoryStyles(category).bgColor} ` : ` ${getCategoryStyles(category).border} category-btn border-solid border shadow-md text-gray-700 `
                ]"
                :style="category === activeCategory ? { '--shadow-color': getCategoryStyles(category).shadowColor } : {}"
              >
                <div class="w-6 h-6 rounded-full" 
                :class="[
                  category === activeCategory ? 'bg-white': `${getCategoryStyles(category).bgColor}` 
                ]"></div>
                <span class="text-sm">{{ category }}</span>
              </button>
            </template>
          </div>
        </div>
      </nav>
    </ClientOnly>
    
    <!-- The MenuList component is now defined inside this file -->
    <section id="full-menu-section" class="py-16 lg:py-24 bg-[linear-gradient(to_bottom,_theme(colors.red.50),_theme(colors.orange.50),_theme(colors.amber.50),_theme(colors.yellow.50),_theme(colors.lime.50),_theme(colors.green.50),_theme(colors.emerald.50),_theme(colors.teal.50),_theme(colors.cyan.50),_theme(colors.sky.50),_theme(colors.blue.50),_theme(colors.indigo.50),_theme(colors.violet.50),_theme(colors.purple.50),_theme(colors.fuchsia.50),_theme(colors.pink.50),_theme(colors.rose.50),_theme(colors.slate.50),_theme(colors.gray.50),_theme(colors.zinc.50),_theme(colors.neutral.50),_theme(colors.stone.50))]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="menu-display-area" class="space-y-20">
          <section 
            v-for="category in filteredCategories" 
            :key="category"
            :id="`section-${category.replace(/[^a-zA-Z0-9]/g, '-')}`"
            class="menu-category-section pt-4"
            :data-category="category"
          >
            <h3 
              class="menu-category-title font-display text-2xl sm:text-3xl font-semibold mb-10"
              :class="[getCategoryStyles(category).text, getCategoryStyles(category).border]"
            >
              <span class="px-4 bg-slate-50">{{ category }}</span>
            </h3>
            
            <div class="grid md:grid-cols-2 gap-x-12 gap-y-10">
              <div :class="getCategoryStyles(category).border, getCategoryStyles(category).cardBg"  v-for="item in getItemsForCategory(category)" :key="item.id" class="rounded-2xl border-4 p-4 shadow-xl menu-item flex flex-col space-y-2 " >
                <div class="flex items-start  space-x-4">
                  <div class="w-10 h-10 flex-shrink rounded-full" :class="getCategoryStyles(category).bgColor"></div>
                  <div>
                    <h4 class="font-sans font-bold text-lg">{{ item.name }}</h4>
                    <p class="text-sm text-gray-500 font-body">{{ item.info }}</p>
                  </div>
                </div>
                <div class="pl-14 space-y-1">
                  <div 
                    v-for="(spec, i) in item.specializations" 
                    :key="i" 
                    class="specialization-row flex justify-between items-center text-sm"
                  >
                    <div class="flex items-center font-sans">
                      <span class="h-2 w-2 rounded-full mr-2" :class="spec.isVeg ? 'bg-green-500' : 'bg-red-600'"></span>
                      <span class="text-base">{{ spec.name || '' }}</span>
                    </div>
                    <span class="font-number text-xl font-semibold text-gray-800">{{ spec.price > 0 ? `₹${spec.price}` : 'Market Price' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
/* Global styles for the menu page */
:root {
  --color-orange-rgb: 249 115 22; --color-yellow-rgb: 234 179 8; --color-blue-rgb: 59 130 246;
  --color-green-rgb: 34 197 94; --color-crimson-rgb: 220 38 38;
}
.menu-page-wrapper {
  background-color: #f8fafc;
  color: #1f2937;
  overflow-x: hidden;
}
#category-nav-container.is-sticky {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  position: fixed;
  top: 5rem;
  width: 100%;
}
.category-btn {
  transition: all 0.2s ease-in-out;
  /* box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1); */
  white-space: nowrap;
}
.category-btn.active {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 10px 15px -3px var(--shadow-color), 0 4px 6px -4px var(--shadow-color);
}
.category-btn:not(.active):hover {
  background-color: rgba(0,0,0, 0.3);
  color: white;
}
.veg-toggle-label { transition: background-color 0.3s ease; }
#veg-toggle:checked + .veg-toggle-label { background-color: #16a34a; }
#veg-toggle:checked + .veg-toggle-label .veg-toggle-dot { transform: translateX(100%); background-color: white; }

.menu-category-title { 
  display: flex; 
  align-items: center; 
  text-align: center; 
}
.menu-category-title::before, .menu-category-title::after { 
  content: ''; 
  flex-grow: 1; 
  border-bottom: 2px solid; 
}
.menu-category-title:not(:empty)::before { 
  margin-right: 1.5rem; 
}
.menu-category-title:not(:empty)::after { 
  margin-left: 1.5rem; 
}
</style>
