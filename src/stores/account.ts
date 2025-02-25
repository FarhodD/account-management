import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
interface Account {
  id: number;
  labels: { text: string }[];
  type: 'local' | 'ldap';
  login: string;
  password: string;
}

export const useAccountStore = defineStore('account', () => {
  const loadAccounts = (): Account[] => {
    const accountsData = localStorage.getItem('accounts')
    return accountsData ? JSON.parse(accountsData) : []
  }
  
  const accounts = ref<Account[]>(loadAccounts())

  const saveAccounts = () => {
    localStorage.setItem('accounts', JSON.stringify(accounts.value))
  }

  const addAccount = () => {
    accounts.value.push({
      id: Date.now(),
      labels: [{ text: '' }],
      type: 'local',
      login: '',
      password: ''
    })
    saveAccounts();
    console.log('ADDED ACCOUNT: ', accounts.value);
  }

  const removeAccount = (index: number) => {
    console.log('DELETE ACCOUNT ID: ', index)
    accounts.value.splice(index, 1)
    saveAccounts();
  }

  const updateAccount = (index: number, field: keyof Account, value: any) => {
    if (accounts.value[index]) {
      (accounts.value[index] as any)[field] = value;
      saveAccounts();
    }
  };

  const labelString = computed(() =>
    accounts.value.map(account => account.labels.map(label => label.text).join('; '))
  );

  watch(accounts, saveAccounts, { deep: true });

  return { accounts, addAccount, removeAccount, updateAccount, labelString }

})
