<template>
  <div class="about">
    <h1>预约取件</h1>

    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="运单号" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="[
          'billno',
          {rules: [{ required: true, message: 'Please input your note!' }]}
        ]"
        />
      </a-form-item>

      <a-form-item label="取件时间" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <!-- <a-input
          v-decorator="[
          'apptime',
          {rules: [{ required: true, message: 'Please input your note!' }]}
        ]"
        />-->
        <a-date-picker
          :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="Select Time"
          @ok="onOk"
          v-decorator="[
          'apptime',
          {rules: [{ required: true, message: 'Please input your note!' }]}
          ]"
          :disabledDate="disabledDate"
          :disabledTime="disabledDateTime"
        />
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>


<script>

import moment from 'moment';
export default {
  data() {
    return {
      form: this.$form.createForm(this),
    }
  },

  methods: {
    moment,
    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().endOf('day');
    },

    range(start, end) {
      const result = [];
      for (let i = start; i < end; i++) {
        result.push(i);
      }
      return result;
    },

    disabledDateTime() {
      return {
        disabledHours: () => {
          let arr = this.range(0, 8);
          for(let i = 20; i < 24; i++) {
            arr.push(i)
          }
          return arr;
        },
        disabledMinutes: () => this.range(30, 60),
        disabledSeconds: () => [55, 56],
      };
    },


    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.$store.dispatch("appointmentPick", values)
        }
      });
    },

    onOk(value) {
      console.log('onOk: ', value);
    }
  },

}

</script>



