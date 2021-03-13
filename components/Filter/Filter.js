import React, { Fragment } from 'react'
import { Menu, Checkbox } from 'semantic-ui-react'
import find from 'lodash/find'
import { useRouter } from 'next/router'

const Filter = (props) => {
  const { category, categories } = props
  const router = useRouter()

  const setSearch = async (key) => {
    let search = new URLSearchParams(location.search)
    const isChecked = search.get(key) === '1'
    if(isChecked) {
      search.delete(key);
    } else {
      search.append(key, '1');
    }
    router.push({
      pathname: window.location.pathname,
      query: '?' + search.toString()
    })
  }

  const { filters } = find(categories, o => o.key === category) || {}

  return (
    <Fragment>
      { filters && filters.length > 0 && <Menu vertical>
        <Menu.Item>
          <Menu.Header>Фільтр</Menu.Header>
            {filters.map(o => 
              <Checkbox 
                key={o.key} 
                className='filter' 
                label={o.title} 
                onClick={setSearch.bind(this, o.key)} 
              />
            )}
          </Menu.Item>
        </Menu>
      }
    </Fragment>
  )
}

export default Filter

/* {[{
  key: '0',
  title: 'GSM'
},{
  key: '1',
  title: 'Управление с мобильного приложения'
},{
  key: '2',
  title: 'Управление с помощью штатных брелоков'
},{
  key: '3',
  title: 'Дополнительные брелоки'
},{
  key: '4',
  title: 'СAN модуль в комплекте'
},{
  key: '5',
  title: 'Поддержка СAN модуля'
},{
  key: '6',
  title: 'Дистанционный запуск отопителя'
},{
  key: '7',
  title: 'Дистанционный запуск двигателя'
},{
  key: '8',
  title: 'Определение местоположения по GPS'
},{
  key: '9',
  title: 'Определение местоположения по LBS'
},{
  key: '10',
  title: 'Датчик удара'
},{
  key: '11',
  title: 'Датчик наклона'
},{
  key: '12',
  title: 'Датчик объема'
},{
  key: '13',
  title: 'Программирование по BlueTooth'
},{
  key: '14',
  title: 'Режим «Трекинг»'
}] */