import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
interface Account {
  id: number;
  labels: { text: string }[];
  type: 'local' | 'ldap';
  login: string;
  password: string;
}

export const useAccountStore = defineStore('account', () => {
  const accounts = ref<Account[]>([])

  const addAccount = () => {
    accounts.value.push({
      id: Date.now(),
      labels: [{ text: '' }],
      type: 'local',
      login: '',
      password: ''
    })
    console.log('ADDED ACCOUNT: ', accounts.value);
  }

  const removeAccount = (index: number) => {
    console.log('DELETE ACCOUNT ID: ', index)
    accounts.value.splice(index, 1)
  }

  const updateAccount = (index: number, field: keyof Account, value: any) => {
    if (accounts.value[index]) {
      (accounts.value[index] as any)[field] = value;
    }
  };

  const labelString = computed(() =>
    accounts.value.map(account => account.labels.map(label => label.text).join('; '))
  );

  return { accounts, addAccount, removeAccount, updateAccount, labelString }

})
