import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { DataGrid } from '@material-ui/data-grid';

import { useStyles } from '../hooks';
import TabPanel from '../hooks/tab'
import axios from '../api';
import { ScoreCardProvider, useScoreCard } from '../hooks/useScoreCard';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1em;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`;

const ContentPaper = styled(Paper)`
  height: 300px;
  padding: 2em;
  overflow: auto;
`;

const Body = () => {
  const classes = useStyles();

  const { messages, addCardMessage, addRegularMessage, addErrorMessage, deleteMessage } =
    useScoreCard();

  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState(0);

  const [queryType, setQueryType] = useState('name');
  const [queryString, setQueryString] = useState('');

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  const [table, setTable] = useState([]);
  function createData(id, name, subject, score) {
    return { id, name, subject, score };
  }
  const addTable = (...ms) => {
    setTable(() => ([
      ...ms.map((m) => createData(m['_id'], m['name'], m['subject'], m['score'])),
    ]));
  };

  // useEffect((messages) => {
  //   console.log(messages)
  //   if (messages == [
  //     {message: 'Database deleted', color: '#2b2e4a'}
  //   ]) { setTable(() => ([])) }
  // }, [messages])

  const tableCols = [
    {field: '_id', headerName: 'ID', width: 125 },
    {field: 'name', headerName: 'Name', width: 125 },
    {field: 'subject', headerName: 'Subject', width: 125 },
    {field: 'score', headerName: 'Score', width: 125 }
  ]

  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const handleAdd = async () => {
    const {
      data: { message, card },
    } = await axios.post('/card', {
      name,
      subject,
      score,
    });

    if (!card) addErrorMessage(message);
    else addCardMessage(message);
    
    const {
      data: { messages, errorMessage },
    } = await axios.get('/cards', {
      params: {
        type: 'name',
        queryString: name,
      },
    });

    if (!messages) addErrorMessage(errorMessage);
    else addTable(...messages);

  };

  const handleQuery = async () => {
    const {
      data: { messages, errorMessage },
    } = await axios.get('/cards', {
      params: {
        type: queryType,
        queryString,
      },
    });

    if (!messages) addErrorMessage(errorMessage);
    else addTable(...messages);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <Wrapper>
      {/* <Tab /> */}
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
            <Tab label="ADD" {...a11yProps(0)} />
            <Tab label="QUERY" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          {/* <Row> */}
            {/* Could use a form & a library for handling form data here such as Formik, but I don't really see the point... */}
            <TextField
              className={classes.input}
              placeholder="Name"
              value={name}
              onChange={handleChange(setName)}
            />
            <TextField
              className={classes.input}
              placeholder="Subject"
              style={{ width: 240 }}
              value={subject}
              onChange={handleChange(setSubject)}
            />
            <TextField
              className={classes.input}
              placeholder="Score"
              value={score}
              onChange={handleChange(setScore)}
              type="number"
            />
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              disabled={!name || !subject}
              onClick={handleAdd}
            >
              Add
            </Button>
          {/* </Row> */}
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          {/* <Row> */}
            <StyledFormControl>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  value={queryType}
                  onChange={handleChange(setQueryType)}
                >
                  <FormControlLabel
                    value="name"
                    control={<Radio color="primary" />}
                    label="Name"
                  />
                  <FormControlLabel
                    value="subject"
                    control={<Radio color="primary" />}
                    label="Subject"
                  />
                </RadioGroup>
              </FormControl>
            </StyledFormControl>
            <TextField
              placeholder="Query string..."
              value={queryString}
              onChange={handleChange(setQueryString)}
              style={{ flex: 1 }}
            />
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              disabled={!queryString}
              onClick={handleQuery}
            >
              Query
            </Button>
          {/* </Row> */}
        </TabPanel>
      </Box>
      <ContentPaper variant="outlined">
        {messages.map((m, i) => (
          <Typography variant="body2" key={m + i} style={{ color: m.color }}>
            {m.message}
          </Typography>
        ))}
      </ContentPaper>
      <div style={{ height: 200, width: '100%' }}>
        <DataGrid
        rows={table}
        columns={tableCols}
        />
      </div>
      
    </Wrapper>
  );
};

export default Body;
