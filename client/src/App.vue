<template>
  <router-view />
</template>
<style>
html, body {
  height: 100%;
}

img {
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hidden {
  display: none;
}

.visible {
  display: flex;
}

.clear {
  width: 100%;
  height: 30px;
}

.scrolling-wrapper {
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}

.scroll-card {
  display: inline-block;
}
</style>