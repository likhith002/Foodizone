export default {
  name: "dish",
  title: "Dish",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name of dish",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "short_description",
      type: "string",
      title: "Short description",
      validation: (Rule) => Rule.required(),
    },

    {
      name: "price",
      type: "number",
      title: "Price of dish in Rupees",
    },

    {
      name: "image",
      title: "mage of dish",
      type: "image",
    },
  ],
};
