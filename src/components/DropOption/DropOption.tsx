import React from 'react'
import { BarsOutlined, DownOutlined } from '@ant-design/icons'
import { Dropdown, Button, Menu } from 'antd'


interface propType{
    onMenuClick?: Function,
    menuOptions: Array<object>,
}
export const DropOption:React.FC<propType> = ({
  onMenuClick,
  menuOptions = [],
}) => {
  const menu = menuOptions.map((item:any) => (
    <Menu.Item key={item.key}>{item.name}</Menu.Item>
  ))
  return (
    <Dropdown
      overlay={<Menu onClick={()=>onMenuClick}>{menu}</Menu>}
    >
      <Button style={{ border: 'none'}} size='large'>
        <BarsOutlined style={{ marginRight: 2 }} />
        <DownOutlined />
      </Button>
    </Dropdown>
  )
}

