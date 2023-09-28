
const FormatPrice = ({ price }) => {


  return Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    
    // Two number after decimal 
    maximumFractionDigits: 2,

    // Convert Paise into Rupees by dividing 100
  }).format(price / 100);
};

export default FormatPrice;
