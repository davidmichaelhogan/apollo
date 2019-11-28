// ------------------------------------------------------//
// Main Dashboard Component | Dashboard
// Apollo V2
// David Michael Hogan | November 14, 2019 | Updated:
// ------------------------------------------------------//

import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  LatestSales,
  UsersByDevice,
  CampaignsOverview,
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  // const { loading, error, data } = useQuery(ALL_ADS);

  // if (loading) console.log('loading...');
  // if (error) console.log('ERROR', error);
  // if (data) console.log(data);

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <Budget />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalUsers />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TasksProgress />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalProfit />
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestSales />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <UsersByDevice />
        </Grid>
        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
        >
          <CampaignsOverview />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;

// ------------------------------------------------------//
// GRAPH QUERIES
// ------------------------------------------------------//
// const ALL_ADS = gql`
//   {
//     ad {
//       id
//       adType
//       advertiser {
//         name
//       }
//     }
//   }
// `;
// ------------------------------------------------------//
