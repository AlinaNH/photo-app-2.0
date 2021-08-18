<template>
  <div
    class="row center"
    style="height: 100%;"
  >
    <div class="flex lg4">
      <va-card>
        <va-card-title class="display-5">
          Log Out
        </va-card-title>
        <va-card-content>
          <div class="center">
            You are sucessfully log out!
          </div>
          <div class="clear" />
          <div class="center">
            <va-button @click="$router.push('/')">
              Return to main page
            </va-button>
          </div>
        </va-card-content>
      </va-card>
    </div>
  </div>
</template>