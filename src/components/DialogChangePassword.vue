<template>
  <q-dialog v-model="modelValue">
    <q-card>
      <q-card-section>
        <div class="text-h6">تغییر گذرواژه</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        شما میتوانید گذرواژه خودرا در این فرم تغییر بدین.
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input
            label="گذرواژه فعلی"
            type="password"
            outlined
          ></q-input>
          <q-input
            label="گذرواژه جدید"
            type="password"
            outlined
          ></q-input>
          <q-input
            label="تکرار گذرواژه جدید"
            type="password"
            outlined
          ></q-input>
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="ثبت" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
const modelValue = defineModel({
  default: false
})
</script>
