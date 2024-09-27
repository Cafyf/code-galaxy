import { Component, Vue } from "vue-facing-decorator";

@Component
export default class HeaderSection extends Vue {
  profileName = '';
  status = '';
  logoutCount = '';

  logout() {
    localStorage.clear();
    window.location.reload();
  };

  created() {
    const userinfo = JSON.parse(localStorage.getItem('user-info'));
    this.profileName = userinfo.name;
    this.status = userinfo.userProfile.status;
  };
};
