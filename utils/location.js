import axios from "axios";

const GOOGLE_API_KEY = "AIzaSyCTCDNDtYPCpAD0FaKgHgdzCjMN1QUHnt4";

export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}

export const getAddress = async (lat, lng) => {
  const url = `https://api.radar.io/v1/geocode/reverse?coordinates=${lat}%2C${lng}`;

  const response = await fetch(url, {
    headers: {
      Authorization: "prj_test_pk_eda761809c8683896bc6f9d787188b2525cb9257",
    },
  });

  if (!response.ok) {
    throw new Error("Faild to fetch address!");
  }

  const data = await response.json();
  const address = data.addresses[0].formattedAddress;
  return address;
};

// const GOOGLE_MAPS_API = "prj_test_sk_8bf42d334dcd356edf6b1d4ceb411ba158cd6f5b";

// export const getMapPreview = async (lat, lng) => {

// try {
//   const response = await axios.get(
//     `https://api.radar.io/v1/geocode/reverse?coordinates=${lat},${lng}`,
//     {
//       headers: {
//         Authorization: "prj_test_pk_eda761809c8683896bc6f9d787188b2525cb9257",
//       },
//     }
//   );

//   return response;
// } catch (error) {
//   console.log("error: ", error);
//   return;
// }
// };
