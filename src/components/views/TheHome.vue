// component used for the first page accessed by the user
<template>
  <div class="flex justify-center">
    <transition name="welcome" appear>
      <div class="modal flex justify-around items-center flex-col mt-10">
        <div class="text-center">
          <h1 class="text-xl">Welcome to dacxi's Cryptocurrency Platform,</h1>
          <h2 class="text-sm text-white mt-5">
            click the button below to access all services available!
          </h2>
        </div>

        <div>
          <router-link to="/dashboard"><button>Dashboard</button></router-link>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
h1 {
  color: white;
  z-index: 2;
  font-weight: ;
}

button {
  color: white;
  border: 2px solid white;
  padding: 0.5rem 2rem;
  border-radius: 40px;
  transition: 0.25s;
}
button:hover{
   background-color:  white;
   color: #2f52a0;
}

.modal {
  background-color: #2f52a0;
  display: flex;
  padding: 1rem 3rem;

  height: 250px;
  border-radius: 10px;
  letter-spacing: 1px;
}

#coin {
  width: 50px;

  z-index: 1;
}
.welcome-enter-from {
  opacity: 0;
  transform: translateY(100px);
}
.welcome-enter-active {
  transition: all 1.25s;
}
</style>
