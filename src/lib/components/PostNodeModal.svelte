<script lang="ts">
  import Modal from "./Modal.svelte";

  export let show = false;

  let value = "";

  function post() {
    // TODO: send
    show = false;
  }
</script>

<Modal bind:show>
  <div slot="content">
    <textarea
      bind:value
      class="textarea"
      placeholder="What's happening there?"
    />
    <button class="button is-info is-pulled-right" on:click={post}>Post</button>
    <div class="is-clearfix" />
  </div>
</Modal>
