// import RazorpayCheckout from "react-native-razorpay";
import RazorpayCheckout from "react-native-razorpay";
import { Text, TouchableHighlight, SafeAreaView } from "react-native";
import React from "react";

const Razorpay = () => {
  return (
    <SafeAreaView style={{ marginVertical: 80, marginHorizontal: 80 }}>
      <TouchableHighlight
        onPress={() => {
          var options = {
            description: "Credits towards consultation",
            image: "https://i.imgur.com/3g7nmJC.jpg",
            currency: "INR",
            key: "rzp_test_KppFuubh5s9NqA",
            amount: "500",
            name: "Acme Corp",
            order_id: "order_NSXhWJHvIeBbDw",
            prefill: {
              email: "arpit09chauhan@gmail.com",
              contact: "6397365442",
              name: "Arpit Chauhan",
            },
            theme: { color: "#53a20e" },
          };
          console.log(RazorpayCheckout.open);
          console.log(typeof RazorpayCheckout);
          RazorpayCheckout.open(options)
            .then((data) => {
              // handle success
              alert(`Success: ${data.razorpay_payment_id}`);
            })
            .catch((error) => {
              // handle failure
              console.log(error);
              console.log(JSON.stringify(error));
              // alert(`Error: ${error.code} | ${error.description}`);
            }); //"~49.0.15",
        }}
      >
        {/* Add a child element, for example, Text */}
        <Text>Click me</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

export default Razorpay;
