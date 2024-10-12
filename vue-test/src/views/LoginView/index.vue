<template>
  <section class="login-view">
    <p @click="changeRouter">login-view</p>
    <p @click="changeToken">修改token：{{ common.token }}</p>
    <p>修改token：{{ common.headerToken }}</p>
    <p @click="asd = Math.random()">测试不引入vue, 点击修改响应式数据：{{ asd }}</p>
    <el-button type="primary" @click="clearInput">哈哈</el-button>
    <el-input v-model="input" placeholder="Please input" />
  </section>
</template>

<script setup lang="ts" name="LoginView">
// import axios from "axios";
import { commonStore } from "@/store/modules";

import service from '@/utils/axios'

// const router = useRouter();

const common = commonStore();
const asd = ref(0);
const input = ref('asd');
const clearInput = (): void => {
  input.value = ''
}

const changeRouter = () => {
  service
    .post("/admin/login", { username: "admin", password: "admin" })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  // router.push('/home')
};
const changeToken = () => {
  common.changeToken(`${Math.random()}`);
};
</script>
