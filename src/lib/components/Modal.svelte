<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import Portal from "svelte-portal";

  const dispatch = createEventDispatcher<{ close: void }>();

  onMount(() => {
    document.querySelector("#app")?.setAttribute("aria-hidden", "true");

    const listner = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        dispatch("close");
      }
    };
    document.addEventListener("keydown", listner);

    return () => {
      document.querySelector("#app")?.removeAttribute("aria-hidden");
      document.removeEventListener("keydown", listner);
    };
  });
</script>

<Portal target="#modal">
  <div class="modal is-active">
    <div class="modal-background" />
    <div class="modal-content">
      <div class="card">
        {#if $$slots.header}
          <header class="card-header">
            <p class="card-header-title">
              <slot name="header" />
            </p>
          </header>
        {/if}
        <div class="card-content">
          <slot name="content" />
        </div>
      </div>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      on:click={() => {
        dispatch("close");
      }}
    />
  </div>
</Portal>
