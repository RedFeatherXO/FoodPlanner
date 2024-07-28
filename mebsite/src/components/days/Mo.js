// src/components/days/Mo.js
import React from 'react';
import {Steps } from 'antd'

const Mo = () => {
  return (
    <Steps
    direction="vertical"
    current={1}
    items={[
      {
        title: 'Finished',
        description: 'dwad',
      },
      {
        title: 'In Progress',
        description: 'dwad',
      },
      {
        title: 'Waiting',
        description: 'dwad',
      },
    ]}
  />
  );
};

export default Mo;
