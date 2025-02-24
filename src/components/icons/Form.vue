<template>
  <a-form
    style="width: 100%"
    ref="formRef"
    name="account_form"
    :model="formState"
    @finish="onFinish"
  >
    <div style="display: flex; gap: 10px; align-items: center">
      <h3>Учетные записи</h3>
      <a-button type="dashed" @click="addAccount">
        <PlusOutlined />
        Добавить
      </a-button>
    </div>
    <a-space
      v-for="(account, index) in formState.accounts"
      :key="account.id"
      style="display: flex; justify-content: space-between"
      align="baseline"
    >
      <a-form-item :name="['accounts', index, 'labels']">
        <a-input v-model:value="account.labels" placeholder="Метки (через ;)" />
      </a-form-item>

      <a-form-item :name="['accounts', index, 'type']">
        <a-select v-model:value="account.type">
          <a-select-option value="local">Локальная</a-select-option>
          <a-select-option value="ldap">LDAP</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item :name="['accounts', index, 'login']">
        <a-input v-model:value="account.login" placeholder="Логин" />
      </a-form-item>

      <a-form-item :name="['accounts', index, 'password']">
        <a-input-password
          v-model:value="account.password"
          placeholder="Пароль"
        />
      </a-form-item>

      <DeleteOutlined
        @click="removeAccount(index)"
        style="color: red; cursor: pointer"
      />
    </a-space>
  </a-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue';
import type { FormInstance } from 'ant-design-vue';

interface Account {
  id: number;
  labels: string;
  type: 'local' | 'ldap';
  login: string;
  password: string;
}

const formRef = ref<FormInstance>();

const formState = reactive<{ accounts: Account[] }>({
  accounts: [
    { id: Date.now(), labels: '', type: 'local', login: '', password: '' },
  ],
});

const addAccount = () => {
  formState.accounts.push({
    id: Date.now(),
    labels: '',
    type: 'local',
    login: '',
    password: '',
  });
};

const removeAccount = (index: number) => {
  formState.accounts.splice(index, 1);
};

const onFinish = (values: any) => {
  console.log('Received values:', values);
};
</script>

<style scoped>
.account-header {
  display: flex;
  justify-content: space-between;
}
</style>