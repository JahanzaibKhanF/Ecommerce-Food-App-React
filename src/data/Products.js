import cheezy from "../assets/cheezy.webp";
import s1 from "../assets/s1.webp";
import s2 from "../assets/s2.webp";
import s3 from "../assets/s3.webp";
import s4 from "../assets/s4.webp";
import s5 from "../assets/s5.webp";
import s6 from "../assets/s6.webp";
import somewhatlocal_1 from "../assets/somewhatlocal_1.webp";
import somewhatlocal_2 from "../assets/somewhatlocal_2.webp";
import somewhatlocal_3 from "../assets/somewhatlocal_3.webp";
import somewhatlocal_4 from "../assets/somewhatlocal_4.webp";
import somewhatlocal_5 from "../assets/somewhatlocal_5.webp";

const products = [
    {
      id: 1,
      title: "Cheese Sticks",
      img: s1,
      details:
        "Freshly Baked Bread Filled with the Yummiest Cheese Blend to Satisfy your Cravings.",
     
      prices:[ {type:"Regular", price:"560.00"},{type:"Large", price:"1760.00"},{type:"Party",price:"2660.00"}],
      extra:[{type:"Chicken Regular", price:"1360.00"},{type:"Cheese Regular", price:"1360.00"}],
      category: "starters",
    },
    {
      id: 2,
      title: "Oven Baked Wings",
      img: s2,
      details: "Fresh Oven Baked Wings Served With Dip Sauce",
      prices:[ {type:"Regular", price:"560.00"}],
      
      
      category: "starters",
    },
    {
      id: 3,
      title: "Flaming Wings",
      img: s3,
      details:
        "Fresh Oven Baked Wings Tossed In Hot Peri Peri Sauce and Served With Dip Sauce",
      
        prices:[ {type:"Regular", price:"560.00"}],
      category: "starters",
    },
    {
      id: 4,
      title: "Calzone Chunks",
      img: s4,
      details: "4 Pcs Stuffed Calzone Chunks Served with Sauce & Fries",
      prices:[ {type:"Regular", price:"960.00"}],
      category: "starters",
    },
    {
      id: 5,
      title: "Arabic Rolls",
      img: s5,
      details: "4 Pcs Arabic Rolls Stuffed with Yummiest Mix Served with Sauce",
      prices:[ {type:"Regular", price:"560.00"}],
      category: "starters",
    },
    {
      id: 6,
      title: "Behari Rolls",
      img: s6,
      details: "4 Pcs Behari Rolls Stuffed with Yummiest Mix Served with Sauce",
      prices:[ {type:"Regular", price:"590.00"}],
      category: "starters",
    },
    { id:7,
        title: "Cheezy Tikka",
        img: cheezy,
        details:
          "A Cheezy Fusion! A Cheese Sauce base with Tikka topping. Topped with Jalapenos, Onions our special Cheezy Sauce.",
       
        category: "cheezyAddition",
        prices:[ {type:"Regular", price:"560.00"},{type:"Large", price:"1,760.00"},{type:"Party",price:"2,660.00"}],

      },
      
    { id:8
    ,
        title: "Chicken Tikka",
        img: somewhatlocal_1,
        details:
          "Tender Chunks of Marinated Grilled Chicken with Savory Onion",
          prices:[ {type:"Regular", price:"560.00"}],
        category: "someWhatLocal",
      },
      
      { id:9,
          title: "Chicken Fajita",
          img: somewhatlocal_2,
          details:
            "An Authentic Taste of Fajita Marinated Chicken Onion and Bell Peppers.",
            prices:[ {type:"Regular", price:"560.00"}],
          category: "someWhatLocal",
        },
        
        { id:10,
            title: "Chicken Lover",
            img: somewhatlocal_3,
            details:
              "Extreme Quantity of Chicken and Onion with Rich Mozzarella Cheese",
              prices:[ {type:"Regular", price:"560.00"}],
            category: "someWhatLocal",
          },
          
          { id:11,
              title: "Chicken Tandoori",
              img: somewhatlocal_4,
              details:
                "Our Traditionally Developed Tandoori Chicken with Onion, Olives, Jalapeno and Tomato Sauce",
                prices:[ {type:"Regular", price:"560.00"}],
              category: "someWhatLocal",
            },
            
            { id:12,
                title: "Hot n Spicy",
                img: somewhatlocal_5,
                details:
                  "Hot and Spicy Chicken Onion, Jalapeno",
                  prices:[ {type:"Regular", price:"560.00"}],
                category: "someWhatLocal",
              },
  ];

  export default products;