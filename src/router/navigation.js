
import router from "@/router"; // Adjust the path if needed

export const navigateTo = (routeName, query = {}) => {
 const routeConfig = query && Object.keys(query).length ? { name: routeName, query } : { name: routeName };
  router.push(routeConfig).catch((err) => {
    if (err.name !== "NavigationDuplicated") {
      console.error("Navigation error:", err);
    }
  });
};

