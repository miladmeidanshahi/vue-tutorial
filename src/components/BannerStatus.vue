<template>
  <slot>
    <div class="rounded-borders bg-secondary q-pa-lg">
      <slot name="upper-message" message="outer message"></slot>

      <div class="rounded-borders bg-red q-pa-lg">
        <slot name="inner-message" message="inner message"></slot>
      </div>
    </div>
  </slot>
</template>
