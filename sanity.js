import sanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";
const client = sanityClient({
  projectId: "8xw8s2ee",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-10-21",
});

const builder = ImageUrlBuilder(client);

export const UrlFor = (source) => builder.image(source);
export default client;
