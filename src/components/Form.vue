<template>
  <a-form
    style="width: 100%"
    ref="formRef"
    name="account_form"
    :model="formState"
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
        <a-input
        v-model:value="labelString[index]"
        @blur="syncLabels(index)"
          placeholder="Метки (через ;)"
        />
      </a-form-item>

      <a-form-item :name="['accounts', index, 'type']">
        <a-select
          @change="(val) => updateAccount(index, 'type', val)"
          v-model:value="account.type"
        >
          <a-select-option value="local">Локальная</a-select-option>
          <a-select-option value="ldap">LDAP</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item :name="['accounts', index, 'login']">
        <a-input
          @blur="(event) => updateAccount(index, 'login', event.target.value)"
          v-model:value="account.login"
          placeholder="Логин"
        />
      </a-form-item>

      <a-form-item :name="['accounts', index, 'password']">
        <a-input-password
          @blur="(event) => updateAccount(index, 'password', event.target.value)"
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
import { ref } from 'vue';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue';
import type { FormInstance } from 'ant-design-vue';
import { useAccountStore } from '../stores/account';

const formRef = ref<FormInstance>();
const accountStore = useAccountStore();
const addAccount = accountStore.addAccount;
const removeAccount = accountStore.removeAccount;
const updateAccount = accountStore.updateAccount;
const labelString = accountStore.labelString;

const formState = {
  accounts: accountStore.accounts
}

const syncLabels = (index: number) => {
  updateAccount(index, 'labels', labelString[index].split(';').map(text => ({ text: text.trim() })));
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