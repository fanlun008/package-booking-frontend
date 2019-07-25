<template>
  <div class="home">
    <!-- <a-row>
      <a-col :span="4">菜鸟驿站</a-col>
      <a-col :span="2" :offset="4">
        <a-button>ALL</a-button>
      </a-col>
      <a-col :span="2">
        <a-button>已预约</a-button>
      </a-col>
      <a-col :span="2" >
        <a-button>已取件</a-button>
      </a-col>
      <a-col :span="2">
        <a-button>未预约</a-button>
      </a-col>
      <a-col :span="2" :offset="4">
        <a-button>添加</a-button>
      </a-col>
    </a-row>

    <a-row>

    </a-row>-->

    <a-layout id="components-layout-demo-top" class="layout">
      <a-layout-header>
        <a-menu
          theme="dark"
          mode="horizontal"
          :defaultSelectedKeys="['2']"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item key="1">已预约</a-menu-item>
          <a-menu-item key="2">已取件</a-menu-item>
          <a-menu-item key="3">未预约</a-menu-item>
          <a-menu-item key="4">
            <div>
              <a-button type="primary" @click="showModal">Open Modal</a-button>
              <a-modal title="Basic Modal" v-model="modelvisible" @ok="handleOk">
                <!-- ------------------------------------------------------------------ -->
                <a-form :form="form" @submit="handleSubmit">
                  <a-form-item label="运单号" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                    <a-input
                      v-decorator="[
                        'billno',
                        {rules: [{ required: true, message: 'Please input your note!' }]}
                      ]"
                    />
                  </a-form-item>

                  <a-form-item label="收件人" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                    <a-input
                      v-decorator="[
                        'receiver',
                        {rules: [{ required: true, message: 'Please input your note!' }]}
                      ]"
                    />
                  </a-form-item>

                  <a-form-item label="电话" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                    <a-input
                      v-decorator="[
                        'phonenum',
                        {rules: [{ required: true, message: 'Please input your note!' }]}
                      ]"
                    />
                  </a-form-item>

                  <a-form-item label="重量" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                    <a-input
                      v-decorator="[
                        'weight',
                        {rules: [{ required: true, message: 'Please input your note!' }]}
                      ]"
                    />
                  </a-form-item>
                  
                  <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                    <a-button type="primary" html-type="submit">Submit</a-button>
                  </a-form-item>
                </a-form>
              </a-modal>
            </div>
          </a-menu-item>
        </a-menu>
      </a-layout-header>
      <a-layout-content style="padding: 0 50px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ background: '#fff', padding: '24px', minHeight: '600px' }">
          <table>
            <thead>
              <tr>
                <td style="width: 100px">运单号</td>
                <td style="width: 100px">收件人</td>
                <td style="width: 100px">电话</td>
                <td style="width: 100px">预约时间</td>
                <td style="width: 100px">状态</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(packaging, index) in packagings" :key="index">
                <td>{{packaging.billno}}</td>
                <td>{{packaging.receiver}}</td>
                <td>{{packaging.phonenum}}</td>
                <td>{{packaging.apptime}}</td>
                <td>{{packaging.status}}</td>
                <td>
                  <a-button @click="confirmpick(packaging.id)">确认收货</a-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">Ant Design ©2018 Created by Ant UED</a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      modelvisible: false,
      form: this.$form.createForm(this)
    };
  },

  methods: {
    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);

          this.$store.dispatch("addPack", values)

          this.modelvisible = false;
        }
      });
    },

    confirmpick(id) {
      this.$store.dispatch("confirmpick", id);
    },
    showModal() {
      this.modelvisible = true;
    },
    handleOk(e) {
      console.log(e);
      this.modelvisible = false;
    }
  },
  computed: {
    ...mapState(["packagings"])
  },

  mounted() {
    this.$store.dispatch("loadAllPack");
  }
};
</script>
<style>
.home {
  width: 80%;
  margin: 0 auto;
  border: 1px solid black;
}
</style>