
import router from "@/router"; // Adjust the path if needed

export const navigateTo = (routeName, query = {}) => {
  router.push({ name: routeName, query }).catch((err) => {
    if (err.name !== "NavigationDuplicated") {
      console.error("Navigation error:", err);
    }
  });
};

