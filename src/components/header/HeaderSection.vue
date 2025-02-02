<style lang="css" scoped src="./header.css"></style>
<script src="./headerSection.js"></script>
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
              <span class="nav-link" href="#">{{ profileName }}</span>
            </li>
            <li class="nav-item list-1">
              <span class="nav-link" href="#">{{ "(" + status + ")" }}</span>
            </li>
            <li class="nav-item list-2">
              <router-link to="/session" class="nav-link" href="#"
                >Session</router-link
              >
            </li>
            <li class="nav-item list-2">
              <router-link to="/progress" class="nav-link" href="#"
                >Progress</router-link
              >
            </li>
            <li class="nav-item list-2">
              <router-link to="/submission" class="nav-link"
                >Submission</router-link
              >
            </li>
          </ul>
        </div>
        <div class="popup-overlay logout-popup">
          <div class="dropdown">
            <button
              class="btn buttonRegion"
              type="button"
              data-dispaly="static"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                class="justify-content-end logout-icon"
                width="20"
                :src="getImage('logouticon.jpg')"
                alt=""
              />
              <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
              <li> User:<span class="user">Shilpa</span></li>
              <li> <img  width="20" :src="getImage('logout-img.jpg')" @click="logout()"><span class="pl-3 signout">
                Signout</span></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
