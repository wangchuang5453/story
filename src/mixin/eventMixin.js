import { eventReport } from '@/api/eventsReports.js'
export default {
  name: 'eventMixin',
  data() {
    return {
      beginTime: 0,
      endTime: 0
    }
  },
  created() {
    this.beginTime = Date.now()
  },
  mounted() {

  },
  destroyed() {

  },
  methods: {
    reportsEvent(eventId, customSegmentation) {
      this.endTime = Date.now()
      eventReport([{
        category: 'custom_event',
        eventId: eventId,
        recordedAt: this.beginTime,
        duration: this.endTime - this.beginTime,
        customSegmentation: customSegmentation
      }]).then(() => {
        console.log('----------上报成功----------')
      })
    }
  }
}
