/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import ReactApexChart from 'react-apexcharts';
import { Typography } from 'antd';
import eChart from './configs/eChart';

function EChart() {
  const { Title } = Typography;

  return (
    <>
      <div id="chart">
        <Title level={5}>Revenue by month</Title>
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={eChart.series}
          type="bar"
          height={400}
        />
      </div>
    </>
  );
}

export default EChart;
