import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
interface Account {
  id: number;
  labels: string;
  type: 'local' | 'ldap';
  login: string;
  password: string;
}

export const useAccountStore = defineStore('account', () => {
  const accounts = ref<Account[]>([])

  const addAccount = () => {
    accounts.value.push({
      id: Date.now(),
      labels: '',
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

  return { accounts, addAccount, removeAccount }

})
