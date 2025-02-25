<template>
  <a-form
    style="width: 100%"
    ref="formRef"
    name="account_form"
    :model="formState"
  >
    <div
      style="display: flex; gap: 10px; align-items: center; margin-bottom: 20px"
    >
      <h3 style="font-size: 18px; font-weight: bold">Учетные записи</h3>
      <a-button type="primary" @click="addAccount">
        <PlusOutlined />
        Добавить
      </a-button>
    </div>

    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size: 20px;
        font-weight: 500;
        gap: 10px;
      "
      v-show="!formState.accounts.length"
    >
      Пока список пуст <InboxOutlined style="font-size: 70px;" />
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
          maxLength="50"
        />
      </a-form-item>

      <a-form-item
        :name="['accounts', index, 'type']"
        :rules="[{ required: true, message: 'Тип обязателен' }]"
        :validate-trigger="['blur']"
      >
        <a-select
          @change="(val) => handleTypeChange(index, val)"
          v-model:value="account.type"
        >
          <a-select-option value="local">Локальная</a-select-option>
          <a-select-option value="ldap">LDAP</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item
        :name="['accounts', index, 'login']"
        :rules="[
          { required: true, message: 'Логин обязателен' },
          { max: 100, message: 'Максимальная длина 100 символов' },
        ]"
        :validate-trigger="['blur']"
      >
        <a-input
          @blur="(event) => updateAccount(index, 'login', event.target.value)"
          v-model:value="account.login"
          placeholder="Логин"
        />
      </a-form-item>

      <a-form-item
        v-if="account.type === 'local'"
        :name="['accounts', index, 'password']"
        :rules="[
          { required: true, message: 'Пароль обязателен' },
          { max: 100, message: 'Максимальная длина 100 символов' },
        ]"
        :validate-trigger="['blur']"
      >
        <a-input-password
          @blur="
            (event) => updateAccount(index, 'password', event.target.value)
          "
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
import { DeleteOutlined, InboxOutlined, PlusOutlined } from '@ant-design/icons-vue';
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

console.log('LABEL STRING', labelString);

const syncLabels = (index: number) => {
  updateAccount(index, 'labels',
    labelString[index]
      .split(';')
      .map(text => ({ text: text.trim() }))
  );
}

const handleTypeChange = (index: number, type: any) => {
  updateAccount(index, 'type', type)
  if (type === 'ldap') {
    updateAccount(index, 'password', null)
  }
}

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