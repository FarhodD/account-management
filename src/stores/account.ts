import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@/composables/useLocalStorage';
interface Account {
  id: number;
  labels: { text: string }[];
  type: 'local' | 'ldap';
  login: string;
  password: string | null;
}

export const useAccountStore = defineStore('account', () => {
  const accounts = useLocalStorage<Account[]>('accounts', [])

  const addAccount = () => {
    accounts.value.push({
      id: Date.now(),
      labels: [{ text: '' }],
      type: 'local',
      login: '',
      password: ''
    })
  }

  const removeAccount = (index: number) => {
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
