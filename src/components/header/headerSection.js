import LocalStorageUtils from "@/Utils/local-storage-utils";
import { Component, Vue } from "vue-facing-decorator";
import getImage from "../../Utils/asset-utils.js"

@Component
export default class HeaderSection extends Vue {
  profileName = "";
  status = "";
  logoutCount = "";
  showpopup=false;

  getImage = getImage;

  logout() {
    LocalStorageUtils.clear();
    window.location.reload();
  };

  created() {
    const userinfo = LocalStorageUtils.getItem("user-info");
    this.profileName = userinfo.name;
    this.status = userinfo.userProfile.status;
  };

}
