import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { StatusBullet } from 'components';
import { convertUSD } from '../../../../helpers/utils';

const CampaignsOverview = ({ className, ...rest }) => {

  const classes = useStyles();

  const [campaigns, setCampaigns] = useState([]);
  const { data } = useQuery(ALL_CAMPAIGNS);

  useEffect(() => {
    if (data) {
      const campaigns = data.campaigns;
      campaigns.forEach(campaign => {
        campaign.impressions = campaign.events.filter(event => event.type === 'IMPRESSION').length;
        campaign.clicks = campaign.events.filter(event => event.type === 'CLICK').length;
      });
      setCampaigns(data.campaigns);
    }
  }, [data]);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <Button
            color="primary"
            size="small"
            variant="outlined"
          >
            New campaign
          </Button>
        }
        title="All Campaigns"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Impressions</TableCell>
                  <TableCell>Clicks</TableCell>
                  <TableCell>Balance</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {campaigns.map(campaign => {
                  const { impressions, clicks } = campaign;
                  return (
                    <TableRow
                      hover
                      key={campaign.id}
                    >
                      <TableCell>{campaign.name}</TableCell>
                      <TableCell>
                        {moment(campaign.startDate).format('MM/DD/YYYY')}
                      </TableCell>
                      <TableCell>
                        {moment(campaign.endDate).format('MM/DD/YYYY')}
                      </TableCell>
                      <TableCell>{clicks}</TableCell>
                      <TableCell>{impressions}</TableCell>
                      <TableCell>{convertUSD(campaign.balance)}</TableCell>
                      <TableCell>
                        <div className={classes.statusContainer}>
                          <StatusBullet
                            className={classes.status}
                            color={statusColors[campaign.isActive]}
                            size="sm"
                          />
                          {campaign.isActive}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

CampaignsOverview.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array
};

export default CampaignsOverview;

const ALL_CAMPAIGNS = gql`
  {
    campaigns(input: {}) {
      id
      isActive
      name
      startDate
      endDate
      balance
      ads {
        id
      }
      events {
        id
        type
      }
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const statusColors = {
  true: 'success',
  false: 'danger'
};
