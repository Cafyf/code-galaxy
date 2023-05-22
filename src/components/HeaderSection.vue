<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">Code Galaxy </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item list-1">
              <span class="nav-link" href="#">{{profileName}}</span>
            </li>
            <li class="nav-item list-1">
              <span class="nav-link" href="#">{{'('+status+')'}}</span>
            </li>
            <li class="nav-item list-2">
              <router-link to="/session" class="nav-link" href="#">Session</router-link>
            </li>
            <li class="nav-item list-2">
             <router-link to="/progress" class="nav-link" href="#">Progress</router-link>
            </li>
            <li class="nav-item list-2 ">
             <router-link to="/submission" class="nav-link">Submission</router-link>

            </li>
             <li  class="nav-item list-2 ml-auto ">
             <a @click="logout" class="nav-link">LogOut</a>

            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>


<script>
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
</script>

<style scoped>
nav{
     font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
a{
  cursor: pointer;
}
.profile-card {
  position: absolute;
  top: 100%;
  right: 10px;
  z-index: 999;
}
.list-1{
   font-size: 12px;
   margin-left: -18px;
    margin-right: 5px;
}
.list-2{
    font-weight: bolder !important;
}
.card {
  width: 200px;
}
</style>
