import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import * as React from 'react';
// import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

export default function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

// export default function BasicTabs() {
//   const [tabValue, setTabValue] = React.useState(0);

//   const handleTabChange = (event, newTabValue) => {
//     setTabValue(newTabValue);
//   };

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//         <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
//           <Tab label="Item One" {...a11yProps(0)} />
//           <Tab label="Item Two" {...a11yProps(1)} />
//           <Tab label="Item Three" {...a11yProps(2)} />
//         </Tabs>
//       </Box>
//       <TabPanel value={tabValue} index={0}>
//         Item One
//       </TabPanel>
//       <TabPanel value={tabValue} index={1}>
//         Item Two
//       </TabPanel>
//       <TabPanel value={tabValue} index={2}>
//         Item Three
//       </TabPanel>
//     </Box>
//   );
// }
