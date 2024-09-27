<script>
import OkCancel from "@/components/okCancel.vue";

export default {
  name: "listTitle",
  components: {OkCancel},

  props: {
    item: {
      type: Object,
      required: true
    },

    isEdit:{
      type: Boolean,
      required: true,
    }

  },

  methods: {
    editTitle(){
      this.$emit("edit-title", this.item.id);
    },

    saveTitle(){
      this.$emit("save-title", this.item.id);
    },

    cancelEdit() {
      this.$emit("cancel-edit", this.item.id);
    },
  },
}
</script>

<template>
  <div v-if="!isEdit">
    <span class="fs-6" @click="editTitle()"> {{ item.title }} </span>
  </div>
  <div v-else>
    <input class="border-black border-2"
           v-model="item.newTitle"
           @keyup.enter="saveTitle()"
           @keyup.esc="cancelEdit"
           placeholder="{{item.title}}" />

    <ok-cancel :item="item" :isEdit="isEdit"
               @ok-action="saveTitle()"
               @cancel-action="cancelEdit()" />
  </div>
</template>

<style scoped>
@import "@/assets/custom.css";
</style>