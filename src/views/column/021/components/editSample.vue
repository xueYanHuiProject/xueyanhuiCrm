<template>
    <section class="admin-main">
        <h1 class="admin-title">编辑样品模板</h1>
        <section class="admin-main-inner">
            <SampleItem></SampleItem>
        </section>
    </section>
</template>
<script>
import SampleItem from './SampleItem'
export default {
  name: 'editSample',
  components: {
    SampleItem
  }
}
</script>
