<script setup>
import { ref } from 'vue';

// Category Mapping ensuring exact Outlet associations and 1-21 IDs for images
const categoryMap = {
  // Restaurant (14 Categories)
  "Breakfast": { id: 1, outlet: "Restaurant" },
  "Soups": { id: 2, outlet: "Restaurant" },
  "Starters": { id: 3, outlet: "Restaurant" },
  "Rice & Biryani": { id: 4, outlet: "Restaurant" },
  "Seafood": { id: 5, outlet: "Restaurant" },
  "Noodles": { id: 6, outlet: "Restaurant" },
  "Traditional Highlights": { id: 7, outlet: "Restaurant" },
  "Breads": { id: 8, outlet: "Restaurant" },
  "Farms & Flames": { id: 9, outlet: "Restaurant" },
  "Chicken": { id: 10, outlet: "Restaurant" },
  "Beef": { id: 11, outlet: "Restaurant" },
  "Mutton": { id: 12, outlet: "Restaurant" },
  "Duck": { id: 13, outlet: "Restaurant" },
  "Salads & Sides": { id: 14, outlet: "Restaurant" }, 
  // Arabic Corner (3 Categories)
  "Shawarma": { id: 15, outlet: "Arabic Corner" },
  "Mandi": { id: 16, outlet: "Arabic Corner" },
  "Arabic Grills": { id: 17, outlet: "Arabic Corner" },
  // Chill N Chai (4 Categories)
  "Mocktails": { id: 18, outlet: "Chill N Chai" },
  "Shakes & Juices": { id: 19, outlet: "Chill N Chai" },
  "Hot Beverages": { id: 20, outlet: "Chill N Chai" },
  "Specialities": { id: 21, outlet: "Chill N Chai" }
};

// 210 Items (Exactly 10 per category)
const rawData = [
  // 1. Breakfast
  {"id":101,"name":"Puttu Kadala","category":"Breakfast","info":"Steamed rice cake, black chickpea curry.","isBestseller":true,"specializations":[{"price":110}]},
  {"id":102,"name":"Appam & Stew","category":"Breakfast","info":"Lacy rice pancake with veg stew.","isBestseller":false,"specializations":[{"price":120}]},
  {"id":103,"name":"Ghee Roast","category":"Breakfast","info":"Crispy dosa cooked with clarified butter.","isBestseller":true,"specializations":[{"price":90}]},
  {"id":104,"name":"Masala Dosa","category":"Breakfast","info":"Roast filled with spiced potatoes.","isBestseller":false,"specializations":[{"price":90}]},
  {"id":105,"name":"Idli Sambar","category":"Breakfast","info":"Steamed rice cakes with lentil soup.","isBestseller":false,"specializations":[{"price":60}]},
  {"id":106,"name":"Poori Masala","category":"Breakfast","info":"Fried bread with potato curry.","isBestseller":false,"specializations":[{"price":90}]},
  {"id":107,"name":"Thattu Dosa Set","category":"Breakfast","info":"Set of small, thick dosas.","isBestseller":false,"specializations":[{"price":70}]},
  {"id":108,"name":"Onion Oothappam","category":"Breakfast","info":"Thick pancake topped with onions.","isBestseller":false,"specializations":[{"price":80}]},
  {"id":109,"name":"Noolputtu","category":"Breakfast","info":"String hoppers made from rice flour.","isBestseller":false,"specializations":[{"price":80}]},
  {"id":110,"name":"Upma","category":"Breakfast","info":"Savory semolina porridge.","isBestseller":false,"specializations":[{"price":60}]},

  // 2. Soups
  {"id":201,"name":"Manchow Soup","category":"Soups","info":"Spicy and sour soup with fried noodles.","isBestseller":true,"specializations":[{"price":140}]},
  {"id":202,"name":"Sweet Corn Veg Soup","category":"Soups","info":"Classic comforting sweet corn soup.","isBestseller":false,"specializations":[{"price":130}]},
  {"id":203,"name":"Hot & Sour Chicken Soup","category":"Soups","info":"Spicy, tangy soup with chicken shreds.","isBestseller":true,"specializations":[{"price":160}]},
  {"id":204,"name":"Cream of Tomato","category":"Soups","info":"Rich and creamy tomato soup.","isBestseller":false,"specializations":[{"price":120}]},
  {"id":205,"name":"Cream of Mushroom","category":"Soups","info":"Earth mushroom blended with cream.","isBestseller":false,"specializations":[{"price":140}]},
  {"id":206,"name":"Lemon Coriander Soup","category":"Soups","info":"Clear soup with lemon and coriander.","isBestseller":false,"specializations":[{"price":140}]},
  {"id":207,"name":"Clear Chicken Soup","category":"Soups","info":"Light and healthy clear chicken broth.","isBestseller":false,"specializations":[{"price":150}]},
  {"id":208,"name":"Seafood Chowder","category":"Soups","info":"Creamy soup loaded with mixed seafood.","isBestseller":false,"specializations":[{"price":180}]},
  {"id":209,"name":"Mutton Paya Soup","category":"Soups","info":"Traditional slow-cooked mutton broth.","isBestseller":false,"specializations":[{"price":190}]},
  {"id":210,"name":"Roasted Pumpkin Soup","category":"Soups","info":"Smooth and savory roasted pumpkin.","isBestseller":false,"specializations":[{"price":130}]},

  // 3. Starters
  {"id":301,"name":"Dragon Chicken","category":"Starters","info":"Spicy fried chicken starter in dark sauce.","isBestseller":true,"specializations":[{"price":280}]},
  {"id":302,"name":"Chicken Lollipop","category":"Starters","info":"Frenched chicken winglet, crispy fried.","isBestseller":false,"specializations":[{"price":250}]},
  {"id":303,"name":"Gobi Manchurian","category":"Starters","info":"Crispy cauliflower in tangy soy sauce.","isBestseller":true,"specializations":[{"price":180}]},
  {"id":304,"name":"Chilli Paneer Dry","category":"Starters","info":"Wok tossed paneer with bell peppers.","isBestseller":false,"specializations":[{"price":220}]},
  {"id":305,"name":"Tawa Fried Prawns","category":"Starters","info":"Prawns pan-fried on a griddle.","isBestseller":true,"specializations":[{"price":320}]},
  {"id":306,"name":"Crispy Garlic Potato","category":"Starters","info":"Crispy potatoes in a rich garlic sauce.","isBestseller":false,"specializations":[{"price":180}]},
  {"id":307,"name":"Mushroom Pepper Dry","category":"Starters","info":"Mushroom roast with cracked black pepper.","isBestseller":false,"specializations":[{"price":200}]},
  {"id":308,"name":"Chicken Tikka","category":"Starters","info":"Tandoor-roasted marinated chicken chunks.","isBestseller":false,"specializations":[{"price":260}]},
  {"id":309,"name":"Fish Fingers","category":"Starters","info":"Crumb-fried strips of white fish.","isBestseller":false,"specializations":[{"price":280}]},
  {"id":310,"name":"Veg Spring Rolls","category":"Starters","info":"Crispy rolls stuffed with julienne veggies.","isBestseller":false,"specializations":[{"price":160}]},

  // 4. Rice & Biryani
  {"id":401,"name":"CAPS Dhum Chicken Biriyani","category":"Rice & Biryani","info":"Our special slow-cooked layered biryani.","isBestseller":true,"specializations":[{"price":175}]},
  {"id":402,"name":"Beef Biriyani","category":"Rice & Biryani","info":"Flavorful and aromatic beef biryani.","isBestseller":true,"specializations":[{"price":200}]},
  {"id":403,"name":"Mutton Biriyani","category":"Rice & Biryani","info":"Rich and traditional mutton biryani.","isBestseller":false,"specializations":[{"price":340}]},
  {"id":404,"name":"Veg Fried Rice","category":"Rice & Biryani","info":"Wok-tossed fried rice with vegetables.","isBestseller":false,"specializations":[{"price":140}]},
  {"id":405,"name":"Chicken Fried Rice","category":"Rice & Biryani","info":"Classic Indo-Chinese chicken fried rice.","isBestseller":true,"specializations":[{"price":170}]},
  {"id":406,"name":"Mixed Fried Rice","category":"Rice & Biryani","info":"Fried rice with chicken, egg, and shrimp.","isBestseller":false,"specializations":[{"price":200}]},
  {"id":407,"name":"Ghee Rice","category":"Rice & Biryani","info":"Aromatic rice cooked with clarified butter.","isBestseller":false,"specializations":[{"price":120}]},
  {"id":408,"name":"Szechwan Chicken Rice","category":"Rice & Biryani","info":"Spicy Szechwan-style fried rice.","isBestseller":false,"specializations":[{"price":180}]},
  {"id":409,"name":"Prawns Biriyani","category":"Rice & Biryani","info":"Aromatic basmati rice cooked with fresh prawns.","isBestseller":false,"specializations":[{"price":320}]},
  {"id":410,"name":"Jeera Rice","category":"Rice & Biryani","info":"Basmati rice tempered with cumin seeds.","isBestseller":false,"specializations":[{"price":110}]},

  // 5. Seafood
  {"id":501,"name":"Meen Mulakitathu","category":"Seafood","info":"Spicy red fish curry, Kerala style.","isBestseller":true,"specializations":[{"price":250}]},
  {"id":502,"name":"Fish Mango Curry","category":"Seafood","info":"Fish curry simmered with raw mango.","isBestseller":false,"specializations":[{"price":260}]},
  {"id":503,"name":"Fish Tawa Fry","category":"Seafood","info":"Catch of the day, marinated and pan-fried.","isBestseller":true,"specializations":[{"price":280}]},
  {"id":504,"name":"Crab Roast","category":"Seafood","info":"Spicy and aromatic crab masala dry roast.","isBestseller":false,"specializations":[{"price":350}]},
  {"id":505,"name":"Squid Coconut Fry","category":"Seafood","info":"Squid rings stir-fried with coconut slices.","isBestseller":false,"specializations":[{"price":290}]},
  {"id":506,"name":"Prawns Mango Curry","category":"Seafood","info":"Prawns in a tangy coconut and mango gravy.","isBestseller":false,"specializations":[{"price":320}]},
  {"id":507,"name":"Malabari Fish Curry","category":"Seafood","info":"Rich coconut milk based fish curry.","isBestseller":false,"specializations":[{"price":260}]},
  {"id":508,"name":"Natholi Fry","category":"Seafood","info":"Crispy fried anchovies with curry leaves.","isBestseller":true,"specializations":[{"price":180}]},
  {"id":509,"name":"Karimeen Pollichathu","category":"Seafood","info":"Pearl spot fish baked in banana leaves.","isBestseller":true,"specializations":[{"price":380}]},
  {"id":510,"name":"Chemmeen Ularthiyathu","category":"Seafood","info":"Kerala style spicy prawn dry roast.","isBestseller":false,"specializations":[{"price":310}]},

  // 6. Noodles
  {"id":601,"name":"Veg Noodles","category":"Noodles","info":"Stir-fried noodles with crisp vegetables.","isBestseller":false,"specializations":[{"price":140}]},
  {"id":602,"name":"Egg Noodles","category":"Noodles","info":"Stir-fried noodles tossed with scrambled egg.","isBestseller":false,"specializations":[{"price":150}]},
  {"id":603,"name":"Chicken Hakka Noodles","category":"Noodles","info":"Classic non-spicy chicken noodles.","isBestseller":true,"specializations":[{"price":170}]},
  {"id":604,"name":"Szechwan Chicken Noodles","category":"Noodles","info":"Spicy noodles with red pepper sauce.","isBestseller":true,"specializations":[{"price":180}]},
  {"id":605,"name":"Mixed Noodles","category":"Noodles","info":"Loaded with chicken, egg, and prawns.","isBestseller":false,"specializations":[{"price":200}]},
  {"id":606,"name":"Mushroom Noodles","category":"Noodles","info":"Wok-tossed noodles with button mushrooms.","isBestseller":false,"specializations":[{"price":160}]},
  {"id":607,"name":"Chilli Garlic Veg Noodles","category":"Noodles","info":"Spicy garlic-infused vegetable noodles.","isBestseller":false,"specializations":[{"price":150}]},
  {"id":608,"name":"Singapore Chicken Noodles","category":"Noodles","info":"Curry-flavored stir-fried rice noodles.","isBestseller":false,"specializations":[{"price":190}]},
  {"id":609,"name":"Szechwan Mixed Noodles","category":"Noodles","info":"Extra spicy noodles with mixed meats.","isBestseller":false,"specializations":[{"price":210}]},
  {"id":610,"name":"Paneer Noodles","category":"Noodles","info":"Noodles tossed with soft paneer cubes.","isBestseller":false,"specializations":[{"price":170}]},

  // 7. Traditional Highlights
  {"id":701,"name":"Paal Kappa Beef Varattu","category":"Traditional Highlights","info":"Creamy tapioca topped with spicy beef roast.","isBestseller":true,"specializations":[{"price":220}]},
  {"id":702,"name":"Pothichoru (Non-Veg)","category":"Traditional Highlights","info":"Traditional meal wrapped in a banana leaf.","isBestseller":true,"specializations":[{"price":150}]},
  {"id":703,"name":"Kothu Porotta Beef","category":"Traditional Highlights","info":"Minced flatbread stir-fried with beef.","isBestseller":false,"specializations":[{"price":150}]},
  {"id":704,"name":"Pothi Porotta Chicken","category":"Traditional Highlights","info":"Layered bread and chicken wrapped in leaf.","isBestseller":false,"specializations":[{"price":150}]},
  {"id":705,"name":"Kappa Meen Curry","category":"Traditional Highlights","info":"Boiled tapioca with fiery red fish curry.","isBestseller":true,"specializations":[{"price":240}]},
  {"id":706,"name":"Chatti Choru","category":"Traditional Highlights","info":"Rice and curries served in an earthen pot.","isBestseller":false,"specializations":[{"price":280}]},
  {"id":707,"name":"Pothichoru (Veg)","category":"Traditional Highlights","info":"Vegetarian leaf-wrapped traditional meal.","isBestseller":false,"specializations":[{"price":130}]},
  {"id":708,"name":"Kothu Porotta Chicken","category":"Traditional Highlights","info":"Minced flatbread stir-fried with chicken.","isBestseller":false,"specializations":[{"price":140}]},
  {"id":709,"name":"Kappa Beef Kuzhachathu","category":"Traditional Highlights","info":"Tapioca mashed thoroughly with beef curry.","isBestseller":false,"specializations":[{"price":200}]},
  {"id":710,"name":"Pazham Pori Beef","category":"Traditional Highlights","info":"Sweet banana fritters paired with beef roast.","isBestseller":true,"specializations":[{"price":180}]},

  // 8. Breads
  {"id":801,"name":"Kerala Porotta","category":"Breads","info":"Flaky, layered traditional flatbread.","isBestseller":true,"specializations":[{"price":17}]},
  {"id":802,"name":"Wheat Porotta","category":"Breads","info":"Healthier layered whole wheat flatbread.","isBestseller":false,"specializations":[{"price":25}]},
  {"id":803,"name":"Chappathi","category":"Breads","info":"Soft, thin whole wheat bread.","isBestseller":false,"specializations":[{"price":20}]},
  {"id":804,"name":"Phulka","category":"Breads","info":"Puffed, oil-free whole wheat bread.","isBestseller":false,"specializations":[{"price":15}]},
  {"id":805,"name":"Nice Pathiri","category":"Breads","info":"Extremely thin and soft rice pancake.","isBestseller":false,"specializations":[{"price":12}]},
  {"id":806,"name":"Butter Naan","category":"Breads","info":"Tandoor baked bread brushed with butter.","isBestseller":true,"specializations":[{"price":45}]},
  {"id":807,"name":"Garlic Naan","category":"Breads","info":"Tandoor bread topped with minced garlic.","isBestseller":false,"specializations":[{"price":55}]},
  {"id":808,"name":"Tandoori Roti","category":"Breads","info":"Whole wheat bread baked in a clay oven.","isBestseller":false,"specializations":[{"price":30}]},
  {"id":809,"name":"Kulcha","category":"Breads","info":"Soft, mildly leavened Indian flatbread.","isBestseller":false,"specializations":[{"price":40}]},
  {"id":810,"name":"Coin Porotta","category":"Breads","info":"Miniature, bite-sized flaky porottas.","isBestseller":false,"specializations":[{"price":10}]},

  // 9. Farms & Flames
  {"id":901,"name":"Paneer Butter Masala","category":"Farms & Flames","info":"Creamy tomato gravy with soft paneer cubes.","isBestseller":true,"specializations":[{"price":210}]},
  {"id":902,"name":"Kadai Vegetable","category":"Farms & Flames","info":"Mixed veggies tossed with ground spices.","isBestseller":false,"specializations":[{"price":190}]},
  {"id":903,"name":"Mushroom Masala","category":"Farms & Flames","info":"Button mushrooms in a robust, spicy gravy.","isBestseller":false,"specializations":[{"price":190}]},
  {"id":904,"name":"Mix Veg Khuruma","category":"Farms & Flames","info":"Vegetables in a mild, sweet coconut base.","isBestseller":false,"specializations":[{"price":140}]},
  {"id":905,"name":"Gobi Manchurian Gravy","category":"Farms & Flames","info":"Cauliflower florets in tangy Chinese gravy.","isBestseller":true,"specializations":[{"price":170}]},
  {"id":906,"name":"Palak Paneer","category":"Farms & Flames","info":"Paneer cubes cooked in a smooth spinach puree.","isBestseller":false,"specializations":[{"price":220}]},
  {"id":907,"name":"Aloo Gobi Masala","category":"Farms & Flames","info":"Classic potato and cauliflower dry curry.","isBestseller":false,"specializations":[{"price":160}]},
  {"id":908,"name":"Dal Fry","category":"Farms & Flames","info":"Yellow lentils tempered with ghee and spices.","isBestseller":false,"specializations":[{"price":130}]},
  {"id":909,"name":"Dal Makhani","category":"Farms & Flames","info":"Slow-cooked black lentils in butter and cream.","isBestseller":true,"specializations":[{"price":180}]},
  {"id":910,"name":"Mushroom Paneer Varattiyathu","category":"Farms & Flames","info":"Mushroom and paneer dry pepper roast.","isBestseller":false,"specializations":[{"price":210}]},

  // 10. Chicken
  {"id":1001,"name":"Butter Chicken Masala","category":"Chicken","info":"Creamy, mildly sweet tomato-based chicken.","isBestseller":true,"specializations":[{"price":275}]},
  {"id":1002,"name":"Chicken Kondattam","category":"Chicken","info":"Spicy, sun-dried chili infused chicken fry.","isBestseller":true,"specializations":[{"price":260}]},
  {"id":1003,"name":"Malabari Kozhi Roast","category":"Chicken","info":"Traditional thick, onion-based Malabar roast.","isBestseller":false,"specializations":[{"price":250}]},
  {"id":1004,"name":"Chettinad Pepper Chicken","category":"Chicken","info":"Highly spiced chicken with black pepper.","isBestseller":false,"specializations":[{"price":260}]},
  {"id":1005,"name":"Kadai Chicken","category":"Chicken","info":"Chicken chunks cooked with bell peppers.","isBestseller":false,"specializations":[{"price":275}]},
  {"id":1006,"name":"Chilli Chicken Gravy","category":"Chicken","info":"Indo-Chinese style spicy chicken gravy.","isBestseller":true,"specializations":[{"price":240}]},
  {"id":1007,"name":"Chicken Tikka Masala","category":"Chicken","info":"Roasted chicken chunks in a spicy sauce.","isBestseller":false,"specializations":[{"price":280}]},
  {"id":1008,"name":"Garlic Chicken","category":"Chicken","info":"Wok-tossed chicken in a pungent garlic sauce.","isBestseller":false,"specializations":[{"price":250}]},
  {"id":1009,"name":"Varutharacha Kozhi Curry","category":"Chicken","info":"Chicken in roasted coconut and spice paste.","isBestseller":false,"specializations":[{"price":240}]},
  {"id":1010,"name":"Ginger Chicken","category":"Chicken","info":"Zesty chicken preparation with fresh ginger.","isBestseller":false,"specializations":[{"price":250}]},

  // 11. Beef
  {"id":1101,"name":"Beef Coconut Ularthu","category":"Beef","info":"Beef chunks roasted with coconut slices.","isBestseller":true,"specializations":[{"price":220}]},
  {"id":1102,"name":"Achayan's Beef Curry","category":"Beef","info":"Traditional central-Kerala style beef curry.","isBestseller":false,"specializations":[{"price":230}]},
  {"id":1103,"name":"Wayanadan Beef Fry","category":"Beef","info":"Dark, peppery, and spicy beef fry.","isBestseller":true,"specializations":[{"price":230}]},
  {"id":1104,"name":"Beef Idmulaku Fry","category":"Beef","info":"Fiercely spicy crushed chili beef fry.","isBestseller":false,"specializations":[{"price":220}]},
  {"id":1105,"name":"Beef Chilli","category":"Beef","info":"Indo-Chinese style spicy beef chunks.","isBestseller":false,"specializations":[{"price":210}]},
  {"id":1106,"name":"Beef Roast","category":"Beef","info":"Slow-roasted beef in a thick onion-tomato gravy.","isBestseller":false,"specializations":[{"price":200}]},
  {"id":1107,"name":"Beef Dry Fry (BDF)","category":"Beef","info":"Crispy, deep-fried spiced beef slices.","isBestseller":true,"specializations":[{"price":240}]},
  {"id":1108,"name":"High Range Beef Roast","category":"Beef","info":"Spicy roast inspired by the Western Ghats.","isBestseller":false,"specializations":[{"price":230}]},
  {"id":1109,"name":"Beef Vindaloo","category":"Beef","info":"Tangy and fiery Goan-style beef curry.","isBestseller":false,"specializations":[{"price":250}]},
  {"id":1110,"name":"Beef Pepper Masala","category":"Beef","info":"Semi-gravy beef with heavily crushed pepper.","isBestseller":false,"specializations":[{"price":230}]},

  // 12. Mutton
  {"id":1201,"name":"Mutton Varutharachathu","category":"Mutton","info":"Mutton cooked in a roasted coconut paste.","isBestseller":true,"specializations":[{"price":360}]},
  {"id":1202,"name":"Mutton Pepper Fry","category":"Mutton","info":"Dry mutton preparation with strong black pepper.","isBestseller":false,"specializations":[{"price":360}]},
  {"id":1203,"name":"Mutton Roganjosh","category":"Mutton","info":"Aromatic, bright red Kashmiri mutton curry.","isBestseller":true,"specializations":[{"price":380}]},
  {"id":1204,"name":"Chettinad Mutton Curry","category":"Mutton","info":"Fiercely spicy South Indian mutton preparation.","isBestseller":false,"specializations":[{"price":360}]},
  {"id":1205,"name":"Mutton Stew","category":"Mutton","info":"Mild, creamy coconut milk gravy with veggies.","isBestseller":false,"specializations":[{"price":350}]},
  {"id":1206,"name":"Mutton Kurma","category":"Mutton","info":"Rich, nut and coconut based mild gravy.","isBestseller":false,"specializations":[{"price":340}]},
  {"id":1207,"name":"Mutton Roast","category":"Mutton","info":"Thick onion and tomato based semi-dry roast.","isBestseller":false,"specializations":[{"price":350}]},
  {"id":1208,"name":"Bhuna Gosht","category":"Mutton","info":"Slow-cooked mutton with intense, reduced spices.","isBestseller":true,"specializations":[{"price":390}]},
  {"id":1209,"name":"Mutton Chukka","category":"Mutton","info":"Dry-roasted mutton chunks with curry leaves.","isBestseller":false,"specializations":[{"price":370}]},
  {"id":1210,"name":"Mutton Keema Masala","category":"Mutton","info":"Minced mutton cooked with peas and spices.","isBestseller":false,"specializations":[{"price":320}]},

  // 13. Duck
  {"id":1301,"name":"Tharavu Mappas","category":"Duck","info":"Duck cooked in a rich, creamy coriander and coconut gravy.","isBestseller":true,"specializations":[{"price":390}]},
  {"id":1302,"name":"Tharavu Kurumulaku Varattiyathu","category":"Duck","info":"Spicy duck pepper dry roast.","isBestseller":false,"specializations":[{"price":390}]},
  {"id":1303,"name":"Kerala Duck Curry","category":"Duck","info":"Traditional Kuttanadan style spicy duck curry.","isBestseller":true,"specializations":[{"price":390}]},
  {"id":1304,"name":"Thattukada Duck Roast","category":"Duck","info":"Street-style thick duck roast with shallots.","isBestseller":false,"specializations":[{"price":390}]},
  {"id":1305,"name":"Duck Chilli","category":"Duck","info":"Indo-Chinese twist to traditional duck chunks.","isBestseller":false,"specializations":[{"price":400}]},
  {"id":1306,"name":"Duck Stew","category":"Duck","info":"Mild duck preparation in coconut milk.","isBestseller":false,"specializations":[{"price":380}]},
  {"id":1307,"name":"Duck Coconut Fry","category":"Duck","info":"Fried duck pieces tossed with toasted coconut.","isBestseller":false,"specializations":[{"price":410}]},
  {"id":1308,"name":"Duck Vindaloo","category":"Duck","info":"Tangy, vinegar and chili-based duck curry.","isBestseller":false,"specializations":[{"price":390}]},
  {"id":1309,"name":"Kuttanadan Duck Roast","category":"Duck","info":"Authentic backwater-style rich duck roast.","isBestseller":true,"specializations":[{"price":420}]},
  {"id":1310,"name":"Duck Pepper Masala","category":"Duck","info":"Semi-gravy preparation heavily spiced with pepper.","isBestseller":false,"specializations":[{"price":390}]},

  // 14. Salads & Sides
  {"id":1401,"name":"Fresh Garden Salad","category":"Salads & Sides","info":"Sliced cucumbers, carrots, onions, and tomatoes.","isBestseller":false,"specializations":[{"price":90}]},
  {"id":1402,"name":"Russian Salad","category":"Salads & Sides","info":"Diced veg and fruits in a creamy mayo dressing.","isBestseller":false,"specializations":[{"price":140}]},
  {"id":1403,"name":"Mixed Raita","category":"Salads & Sides","info":"Cool yogurt with chopped onions and tomatoes.","isBestseller":true,"specializations":[{"price":60}]},
  {"id":1404,"name":"Roasted Papad (2 pcs)","category":"Salads & Sides","info":"Crispy, fire-roasted lentil wafers.","isBestseller":false,"specializations":[{"price":30}]},
  {"id":1405,"name":"Masala Papad","category":"Salads & Sides","info":"Fried papad topped with spicy onion-tomato mix.","isBestseller":false,"specializations":[{"price":50}]},
  {"id":1406,"name":"Kachumber Salad","category":"Salads & Sides","info":"Finely chopped tangy Indian salad.","isBestseller":false,"specializations":[{"price":80}]},
  {"id":1407,"name":"Pineapple Raita","category":"Salads & Sides","info":"Sweet and savory yogurt with pineapple chunks.","isBestseller":false,"specializations":[{"price":90}]},
  {"id":1408,"name":"Tossed Green Salad","category":"Salads & Sides","info":"Lettuce and greens lightly tossed in vinaigrette.","isBestseller":false,"specializations":[{"price":120}]},
  {"id":1409,"name":"Cucumber Salad","category":"Salads & Sides","info":"Refreshing sliced cucumbers with lemon and salt.","isBestseller":false,"specializations":[{"price":70}]},
  {"id":1410,"name":"Fried Papad (2 pcs)","category":"Salads & Sides","info":"Deep-fried crispy lentil wafers.","isBestseller":false,"specializations":[{"price":40}]},

  // 15. Shawarma (Arabic Corner)
  {"id":1501,"name":"Grilled Shawarma Roll","category":"Shawarma","info":"Marinated meat roasted on a spit, wrapped in bread.","isBestseller":true,"specializations":[{"price":150}]},
  {"id":1502,"name":"Shawarma Plate","category":"Shawarma","info":"Deconstructed shawarma served with hummus and pita.","isBestseller":true,"specializations":[{"price":180}]},
  {"id":1503,"name":"Spicy Mexican Shawarma","category":"Shawarma","info":"Shawarma loaded with jalapenos and spicy sauce.","isBestseller":false,"specializations":[{"price":160}]},
  {"id":1504,"name":"Whole Meat Shawarma","category":"Shawarma","info":"Extra meat, no veggies, packed with flavor.","isBestseller":true,"specializations":[{"price":190}]},
  {"id":1505,"name":"Special Cheese Shawarma","category":"Shawarma","info":"Classic roll loaded with melted cheese.","isBestseller":false,"specializations":[{"price":180}]},
  {"id":1506,"name":"Beef Shawarma Roll","category":"Shawarma","info":"Slow-roasted beef slices in classic Arabic bread.","isBestseller":false,"specializations":[{"price":170}]},
  {"id":1507,"name":"Rumali Shawarma","category":"Shawarma","info":"Shawarma meat wrapped in thin Rumali roti.","isBestseller":false,"specializations":[{"price":160}]},
  {"id":1508,"name":"Jumbo Shawarma","category":"Shawarma","info":"Extra-large roll for the ultimate craving.","isBestseller":false,"specializations":[{"price":220}]},
  {"id":1509,"name":"Shawarma Burger","category":"Shawarma","info":"Shawarma meat stuffed inside a toasted burger bun.","isBestseller":false,"specializations":[{"price":150}]},
  {"id":1510,"name":"Hummus Plate with Meat","category":"Shawarma","info":"Creamy hummus topped with fresh shawarma slices.","isBestseller":false,"specializations":[{"price":210}]},

  // 16. Mandi (Arabic Corner)
  {"id":1601,"name":"Alfaham Mandi","category":"Mandi","info":"Grilled chicken served over fragrant Mandi rice.","isBestseller":true,"specializations":[{"price":420}]},
  {"id":1602,"name":"Shawaya Mandi","category":"Mandi","info":"Roasted whole chicken with aromatic rice.","isBestseller":false,"specializations":[{"price":420}]},
  {"id":1603,"name":"Beef Mandi","category":"Mandi","info":"Tender, slow-cooked beef over traditional Mandi rice.","isBestseller":true,"specializations":[{"price":460}]},
  {"id":1604,"name":"Mutton Mandi","category":"Mandi","info":"Fall-off-the-bone mutton with authentic Yemeni rice.","isBestseller":true,"specializations":[{"price":580}]},
  {"id":1605,"name":"Chicken Madghout","category":"Mandi","info":"Chicken and rice cooked together in a pressure pot.","isBestseller":false,"specializations":[{"price":440}]},
  {"id":1606,"name":"Peri Peri Alfaham Mandi","category":"Mandi","info":"Spicy peri peri grilled chicken over rice.","isBestseller":false,"specializations":[{"price":450}]},
  {"id":1607,"name":"Fish Mandi","category":"Mandi","info":"Grilled Arabian style fish served with Mandi rice.","isBestseller":false,"specializations":[{"price":480}]},
  {"id":1608,"name":"Prawns Mandi","category":"Mandi","info":"Flavorful rice topped with spicy grilled prawns.","isBestseller":false,"specializations":[{"price":520}]},
  {"id":1609,"name":"BBQ Chicken Mandi","category":"Mandi","info":"Smoky BBQ coated chicken with traditional rice.","isBestseller":false,"specializations":[{"price":440}]},
  {"id":1610,"name":"Plain Mandi Rice","category":"Mandi","info":"A generous portion of flavorful, aromatic rice.","isBestseller":false,"specializations":[{"price":150}]},

  // 17. Arabic Grills (Arabic Corner)
  {"id":1701,"name":"Alfaham Chicken","category":"Arabic Grills","info":"Classic charcoal-grilled Arabian chicken.","isBestseller":true,"specializations":[{"price":320}]},
  {"id":1702,"name":"Shawaya Chicken","category":"Arabic Grills","info":"Machine-roasted juicy Arabic chicken.","isBestseller":false,"specializations":[{"price":320}]},
  {"id":1703,"name":"Peri Peri Alfaham","category":"Arabic Grills","info":"Grilled chicken coated in spicy Peri Peri sauce.","isBestseller":true,"specializations":[{"price":340}]},
  {"id":1704,"name":"Pepper Alfaham","category":"Arabic Grills","info":"Grilled chicken with a heavy black pepper rub.","isBestseller":false,"specializations":[{"price":340}]},
  {"id":1705,"name":"Honey Glazed Alfaham","category":"Arabic Grills","info":"Sweet and savory honey-brushed grilled chicken.","isBestseller":false,"specializations":[{"price":350}]},
  {"id":1706,"name":"Shish Taouk","category":"Arabic Grills","info":"Skewered and grilled marinated chicken cubes.","isBestseller":true,"specializations":[{"price":380}]},
  {"id":1707,"name":"Mutton Kebab","category":"Arabic Grills","info":"Minced mutton skewers grilled over charcoal.","isBestseller":false,"specializations":[{"price":420}]},
  {"id":1708,"name":"Chicken Tikka Kebab","category":"Arabic Grills","info":"Spicy, yogurt-marinated boneless chicken chunks.","isBestseller":false,"specializations":[{"price":360}]},
  {"id":1709,"name":"Mixed Arabic Grill","category":"Arabic Grills","info":"A grand platter of Alfaham, Kebabs, and Taouk.","isBestseller":true,"specializations":[{"price":850}]},
  {"id":1710,"name":"Green Chilli Alfaham","category":"Arabic Grills","info":"Grilled chicken marinated in fresh green chili paste.","isBestseller":false,"specializations":[{"price":340}]},

  // 18. Mocktails (Chill N Chai)
  {"id":1801,"name":"Blue Lagoon","category":"Mocktails","info":"A classic refreshing blue curacao mocktail.","isBestseller":true,"specializations":[{"price":100}]},
  {"id":1802,"name":"Mix Berry Cooler","category":"Mocktails","info":"Fizzy and sweet mixed berry drink.","isBestseller":false,"specializations":[{"price":100}]},
  {"id":1803,"name":"Virgin Mojito","category":"Mocktails","info":"Mint, lime, and soda perfectly muddled together.","isBestseller":true,"specializations":[{"price":90}]},
  {"id":1804,"name":"Green Apple Fizz","category":"Mocktails","info":"Crisp and tart green apple soda drink.","isBestseller":false,"specializations":[{"price":100}]},
  {"id":1805,"name":"Passion Fruit Mojito","category":"Mocktails","info":"Tropical passion fruit blended with mint.","isBestseller":false,"specializations":[{"price":110}]},
  {"id":1806,"name":"Cindrella","category":"Mocktails","info":"A sweet, magical fruit punch mocktail.","isBestseller":false,"specializations":[{"price":110}]},
  {"id":1807,"name":"Strawberry Delight","category":"Mocktails","info":"Crushed strawberries topped with fizz.","isBestseller":false,"specializations":[{"price":100}]},
  {"id":1808,"name":"Watermelon Breeze","category":"Mocktails","info":"Fresh watermelon juice lightly carbonated.","isBestseller":false,"specializations":[{"price":90}]},
  {"id":1809,"name":"Asian Ginger Fizz","category":"Mocktails","info":"Zesty ginger and lime refreshing cooler.","isBestseller":false,"specializations":[{"price":100}]},
  {"id":1810,"name":"Pina Colada (Virgin)","category":"Mocktails","info":"Creamy coconut and pineapple tropical blend.","isBestseller":true,"specializations":[{"price":130}]},

  // 19. Shakes & Juices (Chill N Chai)
  {"id":1901,"name":"Cookie & Cream Shake","category":"Shakes & Juices","info":"Thick, creamy shake loaded with crushed cookies.","isBestseller":true,"specializations":[{"price":130}]},
  {"id":1902,"name":"Chocolate Truffle Shake","category":"Shakes & Juices","info":"Rich chocolate shake for extreme cocoa lovers.","isBestseller":true,"specializations":[{"price":140}]},
  {"id":1903,"name":"Fresh Watermelon Juice","category":"Shakes & Juices","info":"Pure, cold-pressed refreshing watermelon.","isBestseller":false,"specializations":[{"price":90}]},
  {"id":1904,"name":"Fresh Orange Juice","category":"Shakes & Juices","info":"Freshly squeezed sweet citrus juice.","isBestseller":false,"specializations":[{"price":100}]},
  {"id":1905,"name":"Mango Alphanso Shake","category":"Shakes & Juices","info":"Thick shake made with premium mango puree.","isBestseller":false,"specializations":[{"price":120}]},
  {"id":1906,"name":"Sharjah Shake","category":"Shakes & Juices","info":"Classic Kerala style banana and milk shake.","isBestseller":true,"specializations":[{"price":100}]},
  {"id":1907,"name":"Strawberry Milkshake","category":"Shakes & Juices","info":"Creamy and sweet classic strawberry shake.","isBestseller":false,"specializations":[{"price":110}]},
  {"id":1908,"name":"Pineapple Juice","category":"Shakes & Juices","info":"Fresh, tangy, and sweet pineapple juice.","isBestseller":false,"specializations":[{"price":90}]},
  {"id":1909,"name":"Cotton Candy Magic","category":"Shakes & Juices","info":"A sweet, colorful, and magical kids' favorite.","isBestseller":false,"specializations":[{"price":130}]},
  {"id":1910,"name":"Dry Fruit Shake","category":"Shakes & Juices","info":"Energy-packed shake with premium nuts and dates.","isBestseller":true,"specializations":[{"price":160}]},

  // 20. Hot Beverages (Chill N Chai)
  {"id":2001,"name":"Classic Chai","category":"Hot Beverages","info":"Traditional, strong Indian spiced milk tea.","isBestseller":true,"specializations":[{"price":15}]},
  {"id":2002,"name":"Filter Coffee","category":"Hot Beverages","info":"Strong, frothy South Indian style coffee.","isBestseller":true,"specializations":[{"price":22}]},
  {"id":2003,"name":"Masala Chai","category":"Hot Beverages","info":"Tea infused with cardamom, ginger, and cloves.","isBestseller":false,"specializations":[{"price":20}]},
  {"id":2004,"name":"Black Tea (Kattan)","category":"Hot Beverages","info":"Strong black tea, lightly sweetened.","isBestseller":false,"specializations":[{"price":12}]},
  {"id":2005,"name":"Black Coffee","category":"Hot Beverages","info":"Strong, plain brewed dark coffee.","isBestseller":false,"specializations":[{"price":15}]},
  {"id":2006,"name":"Lemon Tea","category":"Hot Beverages","info":"Refreshing hot tea with a squeeze of fresh lime.","isBestseller":false,"specializations":[{"price":15}]},
  {"id":2007,"name":"Green Tea","category":"Hot Beverages","info":"Light, healthy, and antioxidant-rich tea.","isBestseller":false,"specializations":[{"price":25}]},
  {"id":2008,"name":"Hot Chocolate","category":"Hot Beverages","info":"Warm, creamy, and rich chocolate drink.","isBestseller":true,"specializations":[{"price":60}]},
  {"id":2009,"name":"Horlicks / Boost","category":"Hot Beverages","info":"Classic malt-based hot milk drink.","isBestseller":false,"specializations":[{"price":30}]},
  {"id":2010,"name":"Ginger Tea","category":"Hot Beverages","info":"Soothing milk tea infused with crushed ginger.","isBestseller":false,"specializations":[{"price":20}]},

  // 21. Specialities (Chill N Chai)
  {"id":2101,"name":"Royal Rose Falooda","category":"Specialities","info":"Layered dessert drink with vermicelli and ice cream.","isBestseller":true,"specializations":[{"price":190}]},
  {"id":2102,"name":"Dry Fruit Falooda","category":"Specialities","info":"Rich falooda loaded with premium nuts and dates.","isBestseller":true,"specializations":[{"price":220}]},
  {"id":2103,"name":"Fresh Fruit Salad","category":"Specialities","info":"A healthy mix of freshly diced seasonal fruits.","isBestseller":false,"specializations":[{"price":80}]},
  {"id":2104,"name":"Fruit Salad with Ice Cream","category":"Specialities","info":"Fresh fruits topped with a scoop of vanilla.","isBestseller":true,"specializations":[{"price":110}]},
  {"id":2105,"name":"Sizzling Brownie","category":"Specialities","info":"Hot chocolate brownie with vanilla ice cream.","isBestseller":true,"specializations":[{"price":180}]},
  {"id":2106,"name":"Elaneer Payasam","category":"Specialities","info":"Sweet, creamy pudding made with tender coconut.","isBestseller":true,"specializations":[{"price":120}]},
  {"id":2107,"name":"Gulab Jamun (2 pcs)","category":"Specialities","info":"Sweet milk-solid balls deep-fried in sugar syrup.","isBestseller":false,"specializations":[{"price":50}]},
  {"id":2108,"name":"Vanilla Ice Cream (2 Scoops)","category":"Specialities","info":"Classic, rich, and creamy vanilla ice cream.","isBestseller":false,"specializations":[{"price":60}]},
  {"id":2109,"name":"Chocolate Ice Cream (2 Scoops)","category":"Specialities","info":"Deep chocolate flavored premium ice cream.","isBestseller":false,"specializations":[{"price":70}]},
  {"id":2110,"name":"Caramel Custard","category":"Specialities","info":"Smooth egg custard glazed with sweet caramel.","isBestseller":false,"specializations":[{"price":90}]}
];

// Combine raw data with dynamic mappings (image IDs and slider logic)
const enhancedMenuData = ref(
  rawData.map(item => {
    const mapping = categoryMap[item.category] || { id: 1, outlet: 'Restaurant' };
    return {
      ...item,
      categoryId: mapping.id,
      outlet: mapping.outlet,
      image: `/images/menu/${mapping.id}.jpg`, // e.g. /images/menu/1.jpg through 21.jpg
      isSpecial: item.isBestseller 
    };
  })
);

// Define the data for our hero section
const heroImages = ref([
  '/images/menu/menu.jpg'
]);

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
  <main class="menu-page-wrapper min-h-screen bg-[#f9f7f3] dark:bg-[#040404]">

    <!-- Hero -->
    <PageHero 
      :images="heroImages"
      themeColorClass="text-[#125b12]"
    />

    <!-- Delicacies -->
    <PageGallery 
      :eyebrow="restaurantGalleryData.eyebrow"
      :title="restaurantGalleryData.title"
      :images="restaurantGalleryData.images"
      :themeTextClass="restaurantGalleryData.themeTextClass"
      :themeBgClass="restaurantGalleryData.themeBgClass"
    />

    <!-- THE MENU COMPONENT -->
    <CapsMenu :menuData="enhancedMenuData" />

  </main>
</template>

<style>
/* Global styles for the menu page */


</style>
