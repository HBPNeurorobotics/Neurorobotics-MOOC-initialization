<template>
   <div id="uc-container" class="uc-container">
      <div
         id="uc-container-title"
         class="title-uc"
      >
        Please select a use case
      </div>
      <div class="content-uc">
        <div
           v-for="uc in usecases"
           :key="uc.title"
           v-bind:class="{ 'disabled-container': uc.disabled }"
           v-on:click="selected(uc)"
        >
           <div v-if="uc.disabled" class="disabled-tag">Coming Soon</div>
           <md-whiteframe
              md-elevation="2"
              class="item-sections"
              v-bind:class="{ 'disabled-item': uc.disabled }"
           >
              <uc-item v-bind:uc="uc" v-bind:categories="categories"></uc-item>
           </md-whiteframe>
        </div>
      </div>
      <!-- if the url is not correct show index of UCs -->
      <div v-if="!usecases">
         <div v-for="index in indexes" :key="index">
            <router-link :to="index">{{ index }}</router-link>
         </div>
      </div>
   </div>
</template>

<script>
   import ucItem from './uc-item.vue'
   import usecases from '@/assets/config_files/usecases.json'
   import storageManager from '@/mixins/storageManager.js'

   export default {
      name: 'ucContainer',
      components: {
         'uc-item': ucItem
      },
      data () {
         return {
            usecases: {},
            indexes: [],
            categories: usecases[1].categories,
            route: {}
         }
      },
      methods: {
         selected (uc) {
            if (!uc.disabled) {
              let ucName = uc.title.toLowerCase().replace(/\s/g, '')
              let category = this.$route.params.list_usecases
              if (uc.dataprotected &&
                !storageManager.termsAcceptedLocally(category)) {
                this.$router.push({
                  name: 'termsandconditions',
                  params: {
                    'list_usecases': category,
                    'uc_name': ucName
                  }
                });
              } else {
                this.$router.push({name: uc.next, params: {'uc_name': ucName}})
              }
            }
         },
         prettyfy (name) {
            return name.split('_').map(function (word) {
               return word.charAt(0).toUpperCase() + word.slice(1)
            }).join(' ')
         }
      },
      mounted () {
        var ucSelected = this.$route.path.replace(/\//g, '')
        this.usecases = usecases[0][ucSelected]
        if (!this.usecases) {
         this.indexes = Object.keys(usecases[0]);
        }
        var title = ucSelected
        document.querySelector('title').innerText = this.prettyfy(title)
      }
   }
</script>

