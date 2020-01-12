<template>
    <section class="adminIndex">
        <FullCalendar :events="fcEvents" locale="en" class="date"></FullCalendar>
    </section>

</template>
<style lang="scss" scoped>
    .date{
        padding-top: 80px;
    }
    .today{
        background: rgba(140,20,151,.5);
        .day-number{
            font-size: 30px;
            color: #333;
            font-weight: 800;
        }
    }
</style>
<script>
    import FullCalendar from 'vue-fullcalendar';
    let demoEvents = [
        {
            title : 'Sunny Out of Office',
            start : '2018-04-13',
            end : '2017-07-27'
        }
    ];
    export default {
        data(){
          return{
              msg:"index",
              fcEvents : demoEvents
          }
        },
        components:{
            FullCalendar
        }
    }
</script>
