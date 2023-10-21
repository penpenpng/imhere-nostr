<script lang="ts">
  import Portal from "svelte-portal";

  export let show = false;

  function modalContext(node: Node) {
    document.querySelector("#app")?.setAttribute("aria-hidden", "true");

    const listner = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        show = false;
      }
    };
    document.addEventListener("keydown", listner);

    return {
      destroy() {
        document.querySelector("#app")?.removeAttribute("aria-hidden");
        document.removeEventListener("keydown", listner);
      },
    };
  }
</script>

{#if show}
  <Portal target="#modal">
    <div use:modalContext class="modal is-active">
      <div class="modal-background" />
      <div class="modal-content">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              <slot name="header" />
            </p>
          </header>
          <div class="card-content">
            <slot name="content" />
          </div>
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        on:click={() => {
          show = false;
        }}
      />
    </div>
  </Portal>
{/if}
