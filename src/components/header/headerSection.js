import LocalStorageUtils from "@/Utils/local-storage-utils";
import { Component, Vue } from "vue-facing-decorator";

@Component
export default class HeaderSection extends Vue {
  profileName = "";
  status = "";
  logoutCount = "";

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
