import sanityClient from "@sanity/client";
// import { ImageUrlBuilder } from "@sanity/image-url";
import imageUrlBuilder from "@sanity/image-url";

const client = sanityClient({
  projectId: "jnw1bu3n",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-10-21",
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;
