import React from 'react'
import { Card } from 'antd'
import CountUp from 'react-countup'
import './statCard.sass'
import iconMap from '../../../utils/iconMap'
import logo from "../../../assets/svg/logo.svg";


interface propType{
  icon: 'vendors_user_count' 
          | "simple_user_count" 
          | 'total_user_count' 
          | 'email_user_count' 
          | 'facebook_user_count' 
          | 'google_user_count' 
          | 'apple_user_count' 
          | 'steam_user_count',
  count : number,
  title: string
}

export const StatisticCard:React.FC<propType> = ({icon , count, title})=> {
  
  return(
    <Card
      className="numberCard"
      bordered={false}
      bodyStyle={{ padding: 10 }}
    > 
      <div className="cardContent">
        <img src={iconMap[icon]} alt="user-icon" />
        <div>
        <p className={"cardContent__title"}>
            {(title[0].toUpperCase() + title.slice(1)).replace(/_/g, " ")}
        </p>
        <p className={"number"}>
          <CountUp
            start={0}
            end={count}
            duration={2.75}
            useEasing
            separator=","
          />
        </p>
        </div>
      </div>
    </Card>
    )
}


