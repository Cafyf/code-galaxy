export default {
    name:'HeaderSection',
  data() {
    return {
      profileName:'',
      status:'',
      logoutCount:'',
    };
  },
  methods: {
  logout(){
       localStorage.clear();
        window.location.reload();
  }
  },
  created(){
    const userinfo=JSON.parse(localStorage.getItem('user-info'));
    this.profileName=userinfo.name;
    this.status=userinfo.userProfile.status;
  }
};
