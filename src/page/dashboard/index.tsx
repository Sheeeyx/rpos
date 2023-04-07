
import React from 'react'
import {
  UsergroupAddOutlined
} from "@ant-design/icons";
import CountUp from 'react-countup'
import { Page } from '../../components/PageContent/Page'
import './index.sass'
import { Card, Empty } from 'antd';
import { useUsersCount } from '../../services/queries/use-users-count'
import { Col, Row } from 'antd'
import { StatisticCard } from './components/statCard'



export const Dashboard = ()=> {
    
    return (
      <Page  className={"dashboard"}>
        Welcome
       </Page>
    
      
    )
  }
