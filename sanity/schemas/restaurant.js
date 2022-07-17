export default {
  name: "restaurant",
  title: "Restaurant",
  type: "document",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Restaurant Name",
      validation: (Rule) => Rule.max(200),
    },
    {
      name: "short_description",
      type: "string",
      title: "Short description",
    },

    {
      name: "image",
      type: "image",
      title: "Image of Restaurant",
    },

    {
      name: "lat",
      type: "number",
      title: "Latitude of Restaurant",
    },
    {
      name: "long",
      type: "number",
      title: "Lonitude of Restaurant",
    },
    {
      name: "address",
      type: "string",
      title: "Restaurant Address",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "rating",
      type: "number",
      title: "Enter Rating(Between 1 and 5)",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(5)
          .error("Please enter a Value between 1 and 5"),
    },

    {
      name: "type",
      title: "Category",
      validation: (Rule) => Rule.required(),
      type: "reference",
      to: [{ type: "category" }],
    },
    {
      name: "dishes",
      type: "array",
      title: "Dishes",

      of: [{ type: "reference", to: [{ type: "dish" }] }],
    },
  ],
};
