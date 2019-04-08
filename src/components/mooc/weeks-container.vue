<template>
   <div id="course-container" class="course-container">
      <div id="course-container-title" class="title-uc">
        {{moocInfo.title}}
        <a v-if="moocInfo.course_url" :href="moocInfo.course_url" class="no-link right">
          <i>Link to the course </i>
        </a>
      </div>
      <div class="content-uc">
        <p>
        <md-button class="md-raised md-primary"
          v-on:click="selected()">
          Create your Collab
        </md-button>
        </p>
        <div v-for="uc in weeks" :key="uc.title" v-bind:class="{ 'disabled-container': uc.disabled }">
           <div v-if="uc.disabled" class="disabled-tag">Coming Soon</div>
           <md-whiteframe md-elevation="1" v-bind:class="{ 'item-sections-no-hover': true, 'disabled-item': uc.disabled }">
              <uc-item v-bind:uc="uc" v-bind:categories="categories"></uc-item>
           </md-whiteframe>
        </div>
      </div>
   </div>
</template>

<script>
   import UcItem from '@/components/uc/uc-item.vue'
   import usecases from '@/assets/config_files/usecases.json'
   import collabAuthentication from '@/mixins/collabAuthentication.js'
   import mooc from '@/mixins/mooc.js'

   export default {
      name: 'ucContainer',
      components: {
         UcItem
      },
      data () {
         return {
            weeks: [],
            categories: usecases[1].categories,
            route: {},
            moocInfo: {}
         }
      },
      mixins: [collabAuthentication, mooc],
      methods: {
         selected () {
              this.$router.push({
                name: "mooc_form",
                params: {
                  'moocFullWeeks': this.weeks,
                  'moocFullName': this.moocInfo.title,
                },
                query: this.$route.query
              })
         },
         prettyfy (name) {
            return name.split('_').map(function (word) {
               return word.charAt(0).toUpperCase() + word.slice(1)
            }).join(' ')
         }
      },
      mounted () {
        var ucSelected = this.compact(this.$route.params.uc_name)
        // get the overall mooc info (title, url, etc)
        this.moocInfo = usecases[0].mooc.find((mooc) => {
          return this.compact(mooc.title) === ucSelected
        })
        document.querySelector('title').innerText = this.prettyfy(this.moocInfo.title)
        // get the external config for the weeks
        this.getMoocFullConfig(ucSelected)
        .then((config) => {
          this.weeks = config
        })
      }
   }
</script>

<style scoped>
   a.no-link,
   .md-theme-default a:not(.md-button) {
      color: #aacff1;
      cursor: pointer;
      text-decoration: none;
   }
   a.no-link:hover,
   .md-theme-default a:not(.md-button):hover {
      color: #000000;
   }
   .middle {
      vertical-align: middle;
   }
   .right {
      float: right;
   }
</style>
