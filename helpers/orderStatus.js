export const getStatusMeta = ({ key }) => {
  const meta = getAllMetaStatus.find(i => i.key === key)
  if(meta) return meta;
  return { text: 'Не визначено', color: 'red', value: key }
}

export const getAllMetaStatus = [
  { key: 'done', text: 'Виконано', color: 'green' },
  { key: 'created', text: 'Створено', color: 'blue' },
  { key: 'sent', text: 'Відправлено', color: 'orange' },
  { key: 'cancelled', text: 'Скасовано', color: 'red' },
  { key: 'paid', text: 'Сплачено', color: 'teal' },
].map(i => ({ ...i, value: i.key }));
