import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  Legend
} from "recharts";



const OnlineUserChart = (props) => {

  return (
    <>
      <div className="BarChart p-3">
        <ResponsiveContainer width="100%" aspect={2}>
          <BarChart
            data={props.onlineContent}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <XAxis dataKey="date"   />
            <YAxis />
            <Tooltip />
            {/* <Legend /> */}
            <Bar type="monotone" dataKey="firstName" barSize={20} fill="#FF7851" />
            <Bar type="monotone" dataKey="email" barSize={20} fill="#FF7851" />
            
            {/* <Bar type="monotone" dataKey="name"  fill="#FF7851" /> */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default OnlineUserChart;